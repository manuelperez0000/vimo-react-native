import { useContext } from "react"
import { DataContext } from "../../src/context/DataContext"
import { useRouter } from "next/router"
import Balance from "../../src/components/Balance"
import { useEffect, useState } from 'react'
import NavBar from '../../src/components/navBar'
import Link from "next/link"
const Home = () => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { user } = useContext(DataContext)

    useEffect(() => {
        if (!user) {
            router.push('/')
        } else {
            setIsAuthenticated(true)
            //console.log(user)
        }
    }, [user])

    return (<>
        <NavBar />
        {isAuthenticated && <>
            <div className='container principalContainer p-3 gray'>
                <div className="pb-2">
                    Bienvenido otra ves {user.email}
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 mb-3'>
                        <Balance />
                        <div className="row">
                            <div className="col-6">
                                <Link href="/pay">
                                    <button className="addBalance bg-blue">
                                        <i className="bi bi-send" /> Pagar
                                    </button>
                                </Link>
                            </div>
                            {/* <div className="col-6">
                                <Link href="/addBalance">
                                    <button className="addBalance bg-mediumBlue">
                                        <i className="bi bi-currency-exchange" /> Depositar
                                    </button>
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link href="/payMethods">
                                    <button className="addBalance bg-blue">
                                        <i className="bi bi-wallet" /> Medios de pago
                                    </button>
                                </Link>
                            </div>
                        */}
                            <div className="col-6">
                                <Link href="/transactions">
                                    <button className="addBalance bg-blue">
                                        <i className="bi bi-list" /> Operaciones
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-6 d-none'>
                        <div className="movements">
                            <p className="gray">
                                Movimientos recientes
                            </p>
                            <select className="">
                                <option value=""> Ultimos 10 </option>
                                <option value=""> Ultimos 20 </option>
                                <option value=""> Ultimos 50 </option>
                            </select>
                        </div>
                        <div className="operationsList">
                            <div className="operation">
                                <div>
                                    <i className="bi bi-box-arrow-in-down-left px-1 cGreen"></i>
                                    <span className="cGreen">
                                        45GG78
                                    </span>
                                </div>
                                <div className="cGreen">
                                    + $78.54
                                </div>
                            </div>
                            <div className="operation">
                                <div>
                                    <i className="bi bi-box-arrow-up-right px-1 cRed"></i>
                                    <span className="cRed">KDG456</span>
                                </div>
                                <div className="cRed negativeAmount">
                                    - $12.05
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>)
}
export default Home