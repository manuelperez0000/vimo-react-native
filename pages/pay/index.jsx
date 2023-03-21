import { collection, query,doc, where,  updateDoc, increment, getFirestore, getDocs,getDoc } from "firebase/firestore"
import { DataContext } from "../../src/context/DataContext"
import { app } from "../../src/services/firebaseConfig"
import Balance from "../../src/components/Balance"
import NavBar from '../../src/components/navBar'
import { useContext } from "react"

const db = getFirestore(app)
const userRef = collection(db, "users")

const Pay = () => {

    const { user } = useContext(DataContext)

    const executePay = async (e) => {
        e.preventDefault()
        let wallet = e.target.wallet.value
        let amount = e.target.amount.value

        const q = query(userRef, where("wallet", "==", wallet))
        const querySnapshot = await getDocs(q)
        console.log("res",querySnapshot)
        querySnapshot.forEach(async (res) => {

            //obtener balance de usario que transfiere
            /* const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)
            let balance = await docSnap.data().balance

            if (amount > balance) {
                alert("Fondos insuficientes")
            } else {

                addBalance(-amount, user.uid)
                addBalance(amount, res.data().uid)
            } */
        })

    }

    const addBalance = async (balance, uid) => {
        const userRef = doc(db, "users", uid)
        await updateDoc(userRef, { balance: increment(balance) })
    }

    return (<>
        <NavBar />
        <div className="container-fluid principalContainer">
            <div className="row">
                <div className="col-md-4 offset-md-4 col-sm-12 pt-3">
                    <Balance />
                    <p className="pt-3 tittleLightBlue">Ingrese el monto y la wallet a donde desea pagar</p>
                    <form onSubmit={(e) => executePay(e)}>
                        <input name="amount" type="number" step="0.01" placeholder="Monto" className="pi mt-3 mb-3" />
                        <input name="wallet" className="pi mt-3" type="text" placeholder="Wallet" />
                        <div className="mt-4 payBtnContent">
                            <button className="btnPay">
                                <i className="bi bi-send"></i> Pagar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>)
}
export default Pay