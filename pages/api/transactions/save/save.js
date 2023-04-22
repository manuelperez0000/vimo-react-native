import app from "../../../../src/services/firebaseConfig"
import { doc, getDoc, setDoc, getFirestore, onSnapshot, query, getDocs,updateDoc,increment } from "firebase/firestore";
import { collection, where,addDoc } from "firebase/firestore";
const db = getFirestore(app)

const handler = async (req, res) => {
    console.log("Request save transaction: ", req.method)

    const addBalance = (balance, uid) => {
        const comision = 0.5
        const newBalance = balance - (balance * comision / 100)
        const userRef = doc(db, "users", uid)
        updateDoc(userRef, { balance: increment(newBalance) })
    }

    if (req.method == "POST") {

        //guardae la transaccion
        const myCollection = collection(db, "addBalance")
        const newDocRef = await addDoc(myCollection, req.body)
        //agregar los tokens
        const userRef = collection(db, "users")
        const wallet = req.body.user.wallet
        const _query = query(userRef, where("wallet", "==", wallet))
        const querySnapshot = await getDocs(_query)
        //console.log(req.body)
        querySnapshot.forEach(async (xx) => {
            //obtener balance de usario que transfiere
            addBalance(req.body.amount,req.body.uid)
            //modal de confirmacion
        })
        console.log(newDocRef)
        //si es correcto agrego tokens sino respondo con error

        res.status(200).json(newDocRef)
    }
    else {
        res.status(500).json({ error: "Invalid Request" })
    }
    
}

export default handler