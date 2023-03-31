import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import ModalActive from "./modal"

const Balance = () => {
    const { balance, user, notify } = useContext(DataContext)

    const clipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy);
        notify("Wallet copiada en el portapapeles")
    }

    return (<>
        <ModalActive />
        <div className="balanceContainer shadow2 p-3">
            <div className="w-100">
                <div className="between mb-3">
                    <p className="gray">Saldo</p>
                    <p className="balance">${balance} </p>
                </div>
                <div className="between">
                    <p className="gray">Tu direccion</p>
                    <div onClick={() => clipboard(user.wallet)} className="wallet">
                        <div className="gray">
                            {user && user.wallet}
                        </div>
                        <i className="bi bi-bag" />
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Balance