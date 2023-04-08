import Image from 'next/image'
const ConfirmationModal = ({ confimationModal, transferData, transfer, closeTransaction, successTransaction }) => confimationModal &&
    <div className="bg-modal">
        <div className="modalBody">
            <div className="text-center gray w-100">
                <div className=''>
                    <Image src='/img/logo.png' alt="logo" className='logo' width={80} height={80} />
                </div>
                <div className='mt-3'>{successTransaction ? <>Enviado con exito <i className='bi bi-check-circle-fill text-success' /></> : <>Esta enviando</>} </div>
                <div className="amountTransfer text-dark">
                    <div>${transferData.amount}</div>
                </div>
                <div className="between mt-4">
                    <div className="title-modal">Direccion</div>
                    <div>{transferData.walletTo}</div>
                </div>
                <div className="between mt-1">
                    <div className="title-modal">Correo</div>
                    <div>{transferData.email}</div>
                </div>
                {successTransaction && <>
                    <div className="between mt-1">
                        <div className="title-modal">Operacion</div>
                        <div>{successTransaction.id}</div>
                    </div>
                    <div className="between mt-1">
                        <div className="title-modal">Fecha</div>
                        <div>{successTransaction.date.toLocaleString()}</div>
                    </div>
                </>}
                {successTransaction ?
                    <div className="mt-4">
                        <button onClick={() => closeTransaction()} className="btn btn-danger mx-2"> Cerrar </button>
                    </div>
                    :
                    <div className="mt-4">
                        <button className="btn btn-primary mx-2" onClick={() => transfer()}> Confirmar </button>
                        <button onClick={() => closeTransaction()} className="btn btn-danger mx-2"> Cancelar </button>
                    </div>
                }
            </div>
        </div>
    </div>

export default ConfirmationModal