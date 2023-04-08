import app from "../../../src/services/firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc, getFirestore, onSnapshot, query, getDocs } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
const db = getFirestore(app)
const auth = getAuth(app)

const handler = async (req, res) => {
    console.log("Request login: ", req.method)
    if (req.method == "POST") {
        const email = req.body.email
        const password = req.body.password
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }

        /*  .then(res => {
             console.log(res)
             res.status(200).json(res)
         })
         .catch(error => {
             console.log(error)
             res.status(500).json(error)
         }) */
    }
    else {
        res.status(500).json({ error: "Invalid Request" })
    }
    /* signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const user = {
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                email: res.user.email,
                uid: res.user.uid
            }
            return user
        }).then(async (user) => {
            const docRef = doc(db, "users", user.uid)
            const userData = await getDoc(docRef)
            if (userData.exists()) {
                user.balance = userData.data().balance
                user.wallet = userData.data().wallet
                return user
            } else {
                console.log("usuario no registrado")
                return false
            }
        }).then((user) => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(200).json({code:1, message: "Usuario no registrado" })
            }
        }) */
    /* } else {
        res.status(500).json({ error: "Invalid Request" })
    } */
}

export default handler