import { useState, useEffect } from "react"
import { doc, onSnapshot, getFirestore } from "firebase/firestore"
import app from "../services/firebaseConfig"
const db = getFirestore(app)
const useStates = (user) => {
    const states = {
        loading, setLoading,
        balance, setBalance
    }

    return states
}
export default useStates