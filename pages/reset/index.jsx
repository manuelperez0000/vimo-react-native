import { useContext } from "react"
import { DataContext } from "../../src/context/DataContext"
import Link from "next/link"
import Image from "next/image"
import Loading from "../../src/components/loading"

const Reset = () => {
    const {resetPassword} = useContext(DataContext)  
    return (
        <div className='container-fluid wall'>
            <Loading />
            <div className='row mh-100'>
                <div className='col-12 col-sm-9 col-md-6 offset-lg-4 col-lg-4 d-flex align-items-center'>
                    <div className="p-5 shadow text-center bg-white border-radius-1 w-100">
                        <Image  src='/img/logo.png' priority alt="logo" className='logo' width={140} height={140} />
                        <h2 className='welcome-text gray mb-3'>Recuperar contraseña</h2>
                        <form onSubmit={(e) => resetPassword(e)}>
                            <div className="form-inputs">
                                <span className="gray small"> Correo </span>
                                <input name="email" id="email" type="email" className='mb-2 pi gray' placeholder='Ingresa tu correo' required />
                                <button className='btn btn-primary w-100 mb-4 mt-3 login-button'>Enviar</button>
                                <p className="gray small px-4 mb-4"> Recibirá un correo con un enlace de recuperación su contraseña </p>
                            </div>
                        </form>
                        <div className="footerLinks">
                            <p className="gray">No tienes una cuenta? <Link href="/register">Registrate</Link></p>
                            <p className="gray">Ya tienes una cuenta? <Link href="/">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reset