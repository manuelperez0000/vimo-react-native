import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import { app } from "../services/firebaseConfig";
import { doc, updateDoc, increment, setDoc, collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import Loading from './loading'
const db = getFirestore(app)

const ModalActive = () => {
    const { modalActive, setModalActive, user, setLoading } = useContext(DataContext)
    const addBalance = async (e) => {
        e.preventDefault()
        setLoading(true)
        setModalActive(false)
        const balance = e.target.addBalance.value
        try {
            const userRef = doc(db,"users", user.uid)
            const res = await updateDoc(userRef, { balance: increment(balance) })
            
            setLoading(false)
        } catch (e) {
            setModalActive(false)
            setLoading(false)
            alert(e)
            console.error("Error adding document: ", e);
        }
        //modificar base de datos
        // Add a new document in collection "cities"
        /* await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });
        alert(e.target.addBalance.value) */
        //setModalActive(false)
    }
    return (<>
    <Loading />
        {modalActive && <>
            <div className="backgroundModal">
                <div className="modalIn">
                    <div className="titleModal">
                        <div> Agregar saldo </div>
                        <div onClick={() => setModalActive(false)} className="closeModal"> X </div>
                    </div>

                    <form onSubmit={(e) => addBalance(e)}>
                        <input name="addBalance" className="form-control my-3" type="number" step="0.01" placeholder="cantidad" />
                        <button className="btn btn-primary"> Agregar saldo</button>
                    </form>
                </div>
            </div>
        </>}
    </>
    )
}
export default ModalActive