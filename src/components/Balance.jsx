import { DataContext } from "../context/DataContext"
import { useContext, useEffect } from "react"

const Balance = () => {
    const { balance,user } = useContext(DataContext)
    useEffect(()=>{
        console.log(user)
    })
    return (
        <div className="balanceContainer">
            <div className="w-100 text-center">
                <div className="gray small">
                Saldo vimo
                </div>
                <div className="principalBalance">
                    ${  balance.toFixed(2) }
                </div>
            </div>
        </div>
    )
}
export default Balance