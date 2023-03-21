import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import ModalActive from "./modal"

const Balance = () => {
    const { balance, setModalActive, user } = useContext(DataContext)

    return (<>
        <ModalActive />
        <div className="balanceContainer shadow2 p-3">
            <div className="w-100">
                <div className="payBtnContainer">
                    <p className="saldo">Saldo Vimo</p>
                    <button onClick={() => Router.push("/pay")} className="btnPay">
                        <i className="bi bi-send"></i> Pagar
                    </button>
                </div>
                <p className="balance mb-5">${balance} </p>
                <p className="gray">Tu direccion</p>
                <p className="wallet">
                    <div className="gray">
                        {user && user.wallet}
                    </div>
                    <i className="bi bi-bag" />
                </p>
            </div>
            {/* <div>
                <div className="addBalanceBtn">
                    <div onClick={() => { setModalActive(true) }} className="plusBtn">+</div>
                </div>
            </div> */}
        </div>
    </>)
}
export default Balance