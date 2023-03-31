import { DataContext } from "../context/DataContext"
import { useContext } from "react"
import Link from "next/link"
const NavBar = () => {
    const { user, logOut } = useContext(DataContext)
    return (
        <div className="navBar">
            <div className="navName">
                <div className="logoNav"></div>
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
        </div>)
}
export default NavBar