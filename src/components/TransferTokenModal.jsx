import { DataContext } from "../context/DataContext"
import { useContext } from "react"
const TransferTokenModal = () => {
    const { transactionAddress, transactionError, setEnabledTransferTokenModal, enabledTransferTokenModal } = useContext(DataContext)
    return (<>{enabledTransferTokenModal &&
        <div className="bg_modal">
            <div className="modal_body">
                <div className="successTransactionBody">
                    <div className="successIcon">
                        <i className="bi bi-check-circle-fill text-success" />
                    </div>
                    <div className="text-center">
                        Transaccion exitosa
                    </div>
                    <div>
                        Direccion de transaccion:
                    </div>
                    <div className="gray" >
                        {transactionAddress && transactionAddress}
                        <i className="mx-2 bi bi-bag" />
                    </div>
                    <div className="my-3">
                        {transactionAddress &&
                            <a href={"https://testnet.bscscan.com/tx/" + transactionAddress} target="_blank" rel="noopener noreferrer">Ver en el explorador de bloques</a>
                        }
                    </div>

                    <div className="w-100 text-center pt-3">
                        <button onClick={() => setEnabledTransferTokenModal(false)} className="btn btn-danger"> Cerrar </button>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </div>
    }
    </>
    )
}
export default TransferTokenModal