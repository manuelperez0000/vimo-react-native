import { collection, query, doc, where, updateDoc, increment, getFirestore, getDocs, getDoc, addDoc } from "firebase/firestore"
import { DataContext } from "../../src/context/DataContext"
import app from "../../src/services/firebaseConfig"
import Balance from "../../src/components/Balance"
import NavBar from '../../src/components/navBar'
import { useContext, useEffect, useState } from "react"
import ConfirmationModal from "../../src/components/confirmationModal"
import { useRouter } from "next/router"
const Pay = () => {
    const router = useRouter()
    const db = getFirestore(app)
    const userRef = collection(db, "users")

    const { user, setLoading, setIsAuthenticated, notify } = useContext(DataContext)
    const [amount, setAmount] = useState("")
    const [direction, setDirection] = useState("")
    const [confimationModal, setConfirmationModal] = useState(false)
    const [transferData, setTransferData] = useState({})
    const [successTransaction, setSuccessTransaction] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push('/')
        } else {
            setIsAuthenticated(true)
        }
    })

    const executePay = async (e) => {
        e.preventDefault()
        const wallet = e.target.wallet.value
        const amount = e.target.amount.value
        if (amount <= 0) return setLoading(false), notify("Monto invalido", "warning")
        const _query = query(userRef, where("wallet", "==", wallet))
        const querySnapshot = await getDocs(_query)
        if (querySnapshot.docs.length === 0) return setLoading(false), notify("Direccion invalida", "warning")
        querySnapshot.forEach(async (userTo) => {
            //obtener balance de usario que transfiere
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)
            const balance = await docSnap.data().balance
            if (balance < amount) return setLoading(false), notify("Fondos insuficientes", "warning")
            //modal de confirmacion
            setTransferData({ from: user.uid, to: userTo.data().uid, walletForm: user.wallet, walletTo: userTo.data().wallet, amount, email: userTo.data().email })
            setConfirmationModal(true)
        })
    }

    const saveTransaction = async ({ from, to, amount }) => {
        //guardar transaccion en firebase
        const transaction = { from, to, amount, date: new Date() }
        const myCollection = collection(db, "transactions")
        const newDocRef = await addDoc(myCollection, transaction)
        setSuccessTransaction({ ...transaction, id: newDocRef.id })
    }

    const transfer = async () => {
        if (transferData) {
            const { from, to, amount } = transferData
            //cargar el loader
            setLoading(true)
            await substractBalance(amount, from)
            await addBalance(amount, to)
            await saveTransaction(transferData)
            setLoading(false)

        }
    }

    const substractBalance = async (balance, uid) => {
        const userRef = doc(db, "users", uid)
        if (balance > 0) await updateDoc(userRef, { balance: increment(-balance) })
        else notify("Monto incorrecto", "warning")
    }

    const addBalance = async (balance, uid) => {
        const userRef = doc(db, "users", uid)
        if (balance > 0) await updateDoc(userRef, { balance: increment(balance) })
        else notify("Monto incorrecto", "warning")
    }

    const closeTransaction = () => {
        setConfirmationModal(false)
        setTransferData({})
        setSuccessTransaction(false)
        setAmount("")
        setDirection("")
    }

    return (<>
        <NavBar />
        <ConfirmationModal successTransaction={successTransaction} confimationModal={confimationModal} transferData={transferData} transfer={transfer} closeTransaction={closeTransaction} />
        <div className="container-fluid principalContainer">
            <div className="row">
                {/* <div className="col-md-6 offset-md-4 col-sm-12 pt-3"> */}
                <div className="mt-3 offset-lg-3 col-lg-6 offset-md-2 col-md-8">
                    <Balance />
                    <div className="px-5">
                        <form onSubmit={(e) => executePay(e)}>
                            <div>Monto a enviar</div>
                            <input autoFocus onChange={(e) => setAmount(e.target.value)} value={amount} name="amount" type="number" step="0.01" placeholder="Monto" className="pi mb-3" min="0.01" required />
                            <div className="mt-3 gray">Wallet a donde envia</div>
                            <input onChange={(e) => setDirection(e.target.value)} value={direction} name="wallet" className="pi mt-3" type="text" placeholder="Direccion" pattern="[a-zA-Z0-9]+" title="Solo se permiten letras y números" required />
                            <div className="mt-4 payBtnContent">
                                {amount.length > 0 && direction.length > 0 ?
                                    <button className="btn btn-primary">
                                        <i className="bi bi-send"></i> Enviar
                                    </button> :
                                    <button className="btnPayDisabled" disabled>
                                        <i className="bi bi-send"></i> Enviar
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