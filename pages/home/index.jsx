import { useContext } from "react"
import { DataContext } from "../../src/context/DataContext"
import { useRouter } from "next/router"
import Balance from "../../src/components/Balance"
import { useEffect } from 'react'
import NavBar from '../../src/components/navBar'
import Link from "next/link"
import Image from "next/image"
const Home = () => {
    const router = useRouter()

    const { user, isAuthenticated, setIsAuthenticated, clipboard, whatsappShare } = useContext(DataContext)

    useEffect(() => {
        if (!user) {
            router.push('/')
        } else {
            setIsAuthenticated(true)
            console.log("useeffect del home")
        }
    })

    return (<>
        {isAuthenticated && <div className="mt-2">
            <NavBar />
            <div className="body-account bg-light mt-1">
                <div className='container gray'>
                    <div className='row'>
                        <div className='col-12'>
                            {/* <div className="d-flex pb-4">
                                <div className="photo">
                                    M
                                </div>
                                <div className="px-3">
                                    <h3>Manuel Jose Pérez <i className="hover-pointer bi bi-pencil edit-profile-btn" /> </h3>
                                    <div>{user.email}</div>
                                    <div className="d-flex">
                                        <div className="arial">
                                            Wallet Vimo {user.wallet}
                                        </div>
                                        <div className="px-3">
                                            <i onClick={() => clipboard(user.wallet)} className="hover-pointer bi bi-bag" />
                                        </div>
                                        <div >
                                            <i onClick={() => whatsappShare()} className="hover-pointer bi bi-whatsapp" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <Balance />
                            <div className="max-600">
                                <div className="row bg-buttons-home gy-4">
                                    <div className="col-4 col-md-3">
                                        <Link href="/enviar" className="ppp">
                                            <div className="d-flex-colum">
                                                <div className="btn-link-home">
                                                    <i className="bi bi-send-fill" />
                                                </div>
                                                <p style={{ "textDecoration": "none" }}>
                                                    Enviar
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-4 col-md-3">
                                        <Link href="/addBalance" className="ppp">
                                            <div className="d-flex-colum">
                                                <div className="btn-link-home">
                                                    <i className="bi bi-currency-exchange" />
                                                </div>
                                                <p style={{ "textDecoration": "none" }}>
                                                    Depositar
                                                </p>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="col-4 col-md-3" >
                                        <Link href="/withdraw" className="ppp">
                                            <div className="d-flex-colum">
                                                <div className="btn-link-home">
                                                    <i className="bi bi-bank2" />
                                                </div>
                                                <p style={{ "textDecoration": "none" }}>
                                                    Retirar
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-4 col-md-3" >
                                        <Link href="/transactions" className="ppp">
                                            <div className="d-flex-colum">
                                                <div className="btn-link-home">
                                                    <i className="bi bi-briefcase-fill" />
                                                </div>
                                                <p style={{ "textDecoration": "none" }}>
                                                    Movimientos
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="body-account bg-light mt-1 p-3">
                <div className='col-sm-12'>
                    <div className="mt-3">
                        <div className="movements">
                            <h5 className="gray">
                                Movimientos recientes
                            </h5>
                            <i className="bi bi-arrow-repeat" />
                        </div>
                        <hr className="hr-operation" />
                        <div className="operationsList">
                            <div className="operation">
                                <div>
                                    <i className="bi bi-caret-left-fill" />
                                    <span className="mx-3 arial wallet-list-move">
                                        Envio a la wallet 45GG78
                                    </span>
                                </div>
                                <div className="">
                                    <div className="f-arial sb text-center">
                                        $ 78.54
                                    </div>
                                    <div className="time-movements text-center">
                                        08:35pm
                                    </div>
                                </div>
                            </div>
                            <div className="operation">
                                <div>
                                    <i className="bi bi-caret-right-fill" />
                                    <span className="mx-3 arial wallet-list-move">
                                        Recibe de la wallet sdf546
                                    </span>
                                </div>
                                <div className="">
                                    <div className="f-arial sb text-center">
                                        $ 18.44
                                    </div>
                                    <div className="time-movements text-center">
                                        03:54pm
                                    </div>
                                </div>
                            </div>
                            <div className="operation">
                                <div>
                                    <i className="bi bi-caret-right-fill" />
                                    <span className="mx-3 arial wallet-list-move">
                                        Deposito con metamask
                                    </span>
                                </div>
                                <div className="">
                                    <div className="f-arial sb text-center">
                                        $ 100.00
                                    </div>
                                    <div className="time-movements text-center">
                                        11:40pm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center p-2">
                        <Link href="/transactions">
                            Ver todos los movimientos <i className="bi bi-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>}
    </>)
}
export default Home