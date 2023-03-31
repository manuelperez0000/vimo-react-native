import { DataContext } from "../../src/context/DataContext"
import { useContext } from "react"
import { useState, useEffect } from "react"
import { doc, getDoc, setDoc, getFirestore, onSnapshot, query, getDocs } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
import NavBar from "../../src/components/navBar"
import app from "../../src/services/firebaseConfig"
const db = getFirestore(app)

const Transactions = () => {
    //const { transactions } = useContext(DataContext)
    const [transactions, setTransactions] = useState(false)


    const q = query(collection(db, "transactions"), where("amount", ">=", "0"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const _transactions = []
        querySnapshot.forEach((doc) => {
            _transactions.push(doc.data())
        })
        setTransactions(_transactions)
        /*  console.log("Current cities in CA: ", transactions.join(", ")); */
    })

    /* const unsub = onSnapshot(doc(db, "transactions",""), (doc) => {
        console.log("Current data: ", doc.data());
    }) */
    /* const getTransactions = () => { */

    /* const _transactions = "" //firebase
    setTransactions(_transactions) */
    /* }
    useEffect(() => {
        console.log()
        getTransactions()
    }, []) */

    return (<>
        <NavBar />

        <div className='container principalContainer p-3 gray'>
            {transactions && transactions.map((item, index) => {
                return (<div key={index} className="border p-2">
                    <div>from:{item.from}</div>
                    <div>to:{item.to}</div>
                    <div>amount:{item.amount}</div>
                    {
                     
                    }
                    {/*
                    <div>Date:{item.date}</div> */}
                </div>)
            })}
        </div>
    </>)
}
export default Transactions