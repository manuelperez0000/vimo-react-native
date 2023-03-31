import { collection, query, doc, where, updateDoc, increment, getFirestore, getDocs, getDoc, setDoc } from "firebase/firestore"
import { DataContext } from "../../src/context/DataContext"
import { app } from "../../src/services/firebaseConfig"
import Balance from "../../src/components/Balance"
import NavBar from '../../src/components/navBar'
import { useContext } from "react"
import { useState } from "react"
import ConfirmationModal from "../../src/components/confirmationModal"


const Pay = () => {
    const db = getFirestore(app)
    const userRef = collection(db, "users")

    const { user, setLoading, notify } = useContext(DataContext)
    const [amount, setAmount] = useState("")
    const [direction, setDirection] = useState("")
    const [confimationModal, setConfirmationModal] = useState(false)
    const [transferData, setTransferData] = useState({})

    const executePay = async (e) => {
        e.preventDefault()
        const wallet = e.target.wallet.value
        const amount = e.target.amount.value
        if (amount <= 0) return setLoading(false), alert("Monto invalido")
        const _query = query(userRef, where("wallet", "==", wallet))
        const querySnapshot = await getDocs(_query)
        if (querySnapshot.docs.length === 0) return setLoading(false), alert("Direccion invalida")
        querySnapshot.forEach(async (userTo) => {
            //obtener balance de usario que transfiere
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)
            const balance = await docSnap.data().balance
            if (balance < amount) return setLoading(false), alert("Fondos insuficientes")
            //modal de confirmacion
            setTransferData({ from: user.uid, to: userTo.data().uid, wallet: userTo.data().wallet, amount, email: userTo.data().email })
            setConfirmationModal(true)
        })
    }

    const saveTransaction = async ({ from, to, amount }) => {
        //guardar transaccion en firebase
        const transaction = { from, to, amount, date: new Date() }
        await setDoc(doc(db, "transactions", user.uid), transaction)
    }

    const transfer = async () => {
        if (transferData) {
            const { from, to, amount } = transferData
            //cargar el loader
            setLoading(true)
            await substractBalance(amount, from)
            await addBalance(amount, to)
            await saveTransaction(transferData,(res)=>{
                console.log("RES:",res)
            })
            setConfirmationModal(false)
            setLoading(false)
            setAmount("")
            setDirection("")
        }
    }

    const substractBalance = async (balance, uid) => {
        const userRef = doc(db, "users", uid)
        if (balance > 0) await updateDoc(userRef, { balance: increment(-balance) })
        else alert("Monto incorrecto")
    }

    const addBalance = async (balance, uid) => {
        const userRef = doc(db, "users", uid)
        if (balance > 0) await updateDoc(userRef, { balance: increment(balance) })
        else alert("Monto incorrecto")
    }

    const cancelTransaction = () => {
        setConfirmationModal(false)
        setTransferData({})
    }



    return (<>
        <NavBar />
        <ConfirmationModal confimationModal={confimationModal} transferData={transferData} transfer={transfer} cancelTransaction={cancelTransaction} />
        <div className="container-fluid principalContainer">
            <div className="row">
                {/* <div className="col-md-6 offset-md-4 col-sm-12 pt-3"> */}
                <div className="mt-3 offset-lg-3 col-lg-6 offset-md-2 col-md-8">
                    <Balance />
                    <div className="px-5 mt-4">
                        <form onSubmit={(e) => executePay(e)}>
                            <input onChange={(e) => setAmount(e.target.value)} value={amount} name="amount" type="number" step="0.01" placeholder="Monto" className="pi mt-3 mb-3" min="0.01" required />
                            <input onChange={(e) => setDirection(e.target.value)} value={direction} name="wallet" className="pi mt-3" type="text" placeholder="Direccion" pattern="[a-zA-Z0-9]+" title="Solo se permiten letras y números" required />
                            <div className="mt-4 payBtnContent">
                                {amount.length > 0 && direction.length > 0 ?
                                    <button className="btnPay">
                                        <i className="bi bi-send"></i> Pagar
                                    </button> :
                                    <button className="btnPayDisabled" disabled>
                                        <i className="bi bi-send"></i> Pagar
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default Pay