import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
const NavBar = () => {
    const { user, logOut,clipboard,whatsappShare } = useContext(DataContext)
    return (
        <div className="navBar">
            <div className="nav-max bg-white p-3">
                <div className="navContainer">
                    <div className="navName">
                        <Link href="/home">
                            <Image src='/img/logo.png' priority alt="logo" className='logo' width={40} height={40} />
                        </Link>
                        <div className="px-2">
                            <h5>
                                VIMO
                            </h5>
                        </div>
                        {/* {user && user.email} */}
                    </div>
                    <div className="d-flex align-items-center">
                        {user && user.email === "manuelperez.0000@gmail.com" &&
                            <Link href="/admin" className="admin-link" >
                                <div className="mx-3 admin-link">
                                    Admin
                                </div>
                            </Link>
                        }

                        {/* <Link href="/home" className="admin-link" >
                    <div className="mx-3 admin-link">
                    Home
                    </div>
                </Link> */}


                        <button onClick={() => logOut()} className="logoutButton">
                            <div>
                                Salir
                            </div>
                            <i className="bi bi-box-arrow-right" />
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <div>
                        <b>
                            Wallet vimo
                        </b>
                    </div>
                    <div className="arial">
                    {user.wallet} <i onClick={()=>clipboard(user.wallet)} className="bi bi-bag hover-pointer mx-2"/>
                    <i onClick={()=>whatsappShare()} className="bi bi-whatsapp hover-pointer mx-1" />
                    </div>
                </div>
            </div>
        </div>)
}
export default NavBar