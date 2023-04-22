import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
const NavBar = () => {
    const { user, logOut } = useContext(DataContext)
    return (
        <div className="navBar">
            <div className="nav-max bg-light p-3">
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
                    65465JF <i className="bi bi-bag hover-pointer"/>
                </div>
            </div>
        </div>)
}
export default NavBar