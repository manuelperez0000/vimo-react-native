import { sendPasswordResetEmail } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword as signIn, signOut, createUserWithEmailAndPassword as signUp } from "firebase/auth"
import { doc, getDoc, setDoc, getFirestore, onSnapshot, query, getDocs } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
import { useState, useEffect } from "react"
import app from "../services/firebaseConfig"
import Error from "../services/error"
import { useRouter } from "next/router"
import generateWallet from "../services/generateWallet";
const provider = new GoogleAuthProvider();

const useLogin = () => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [balance, setBalance] = useState(0)
    const [user, setUser] = useState()
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        if (user) {
            refreshBalance()
        } else {
            console.log("no user Loged")
        }
    }, [user])

    const refreshBalance = () => {
        onSnapshot(doc(db, "users", user.uid), (res) => {
            console.log("Current data: ", res.data())
            let balance_ = res.data().balance.toFixed(2)
            setBalance(balance_)
        })
    }

    const login = (e) => {
        e.preventDefault()
        setLoading(true)

        const email = e.target.email.value
        const password = e.target.password.value
        
        signIn(auth, email, password)
            .then((res) => {
                const user = res.user
                const newUser = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid
                }
                return newUser
            }).then(async (user) => {
                const docRef = doc(db, "users", user.uid)
                const userData = await getDoc(docRef)
                if (userData.exists()) {
                    user.balance = userData.data().balance
                    user.wallet = userData.data().wallet
                    return user
                }else{
                    alert("usuario no registrado")
                    return false
                }

            }).then((user)=>{
                if(user){
                    const transactions = getTransactions(user.uid)
                    setUser(user)
                    console.log(transactions)
                    setTransactions([])
                }else{
                    alert("Ocurrio un error inesperado")
                }
            }).finally(()=>{
                setLoading(false)
                router.push('/home')
            })
        /*  .then((userCredential) => {
             const user = userCredential.user;
             const userObj = {
             }
             return userObj
             setUserBalance(userObj)
             const _transactions = getTransactions(userObj.uid)
             console.log("Obtener transacciones ", _transactions)
             setTransactions(_transactions)
         })
         .then((res) => {
             console.log(res)
         })
         .catch((error) => {
             setLoading(false)
             alert("La contraseña proporcionada es incorrecta o el correo no se encuentra registrado")
             //console.log(error)
             //Error(error)
         }).finally(() => {
             setLoading(false)
         }) */
    }

    /* const setUserBalance = async (userObj) => {
        //console.log(userObj)
        const docRef = doc(db, "users", userObj.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            userObj.balance = docSnap.data().balance
            userObj.wallet = docSnap.data().wallet
        } else {
            alert("No se encontro el usuario");
            userObj.balance = 0
            logOut()
            router.push('/')
        }
        setUser(userObj)
        setLoading(false)
        router.push('/home')
    } */

    const google = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;
                console.log(user)
                setUser(user)
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                Error(error)
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })

    }
    const logOut = async () => {
        setLoading(true)
        await signOut(auth)
        setLoading(false)
        router.push('/')
    }

    const register = (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        const password = e.target.password.value
        signUp(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                registerUserFirestore(user)
            })
            .catch((error) => {
                Error(error)
                setLoading(false)
            })
    }

    const resetPassword = (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Se a enviado un correo para la recuperacion de tu contraseña")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            }).finally(() => {
                setLoading(false)
            })
    }

    const registerUserFirestore = async (user) => {
        let wallet = await generateWallet()
        const userObj = {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            balance: 0,
            uid: user.uid,
            wallet
        }
        await setDoc(doc(db, "users", user.uid), userObj)
        setUser(userObj)
        router.push('/home')
    }

    const getTransactions = async (uid) => {
        const q = query(collection(db, "transactions"))
        const transactions = await getDocs(q)
       /*  transactions.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
        }) */

        /* const userRef = collection(db, "transactions")
        const _query = query(userRef, where("from", "==", uid))
        const transactions = await getDocs(_query)
        console.log(transactions) */
        return transactions
    }

    return {
        login, logOut,
        register, user,
        google, loading,
        setLoading, modalActive,
        setModalActive, balance,
        setBalance, resetPassword,
        transactions
    }
}
export default useLogin