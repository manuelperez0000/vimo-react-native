import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword as signIn, signOut, createUserWithEmailAndPassword as signUp } from "firebase/auth"
import { useState,useEffect } from "react"
import app from "../services/firebaseConfig"
import Error from "../services/error"
import { useRouter } from "next/router"
import { doc, getDoc, setDoc, getFirestore,onSnapshot } from "firebase/firestore";
import generateWallet from "../services/generateWallet";
const db = getFirestore(app)
const provider = new GoogleAuthProvider();
const auth = getAuth(app)

const useLogin = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [balance, setBalance] = useState(0)
    const [user, setUser] = useState()

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
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                const userObj = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    uid: user.uid
                }
                setUserBalance(userObj)
            })
            .catch((error) => {
                setLoading(false)
                Error(error)
            })
    }

    const setUserBalance = async (userObj) => {
        console.log(userObj)
        const docRef = doc(db, "users", userObj.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data())
            userObj.balance = docSnap.data().balance
            userObj.wallet = docSnap.data().wallet
        } else {
            alert("No such document!");
            userObj.balance = 0
            //logOut()
        }
        setUser(userObj)
        setLoading(false)
        router.push('/home')
    }

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
                /* const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error) */
            })

    }
    const logOut = () => {
        /* onAuthStateChanged(auth, (user_) => {
            if (user_) {
                const uid = user_.uid;
                console.log(uid)
            } else {
                console.log("no existe usuario")
                router.push('/')
            }
        }) */
        setLoading(false)
        signOut(auth)
        router.push('/')
        /* .then(() => {
            console.log("Usted se a deslogueado")
            setUser(false)
            setLoading(false)
            router.push('/') 
        }).catch((error) => Error(error))*/
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

    const resetPassword = (e)=>{
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        alert(email)
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

    

    return {
        login, logOut,
        register, user,
        google, loading,
        setLoading, modalActive,
        setModalActive, balance,
        setBalance,resetPassword
    }
}
export default useLogin