import { useContext } from "react"
import { DataContext } from "../../src/context/DataContext"
import Link from "next/link"
import Image from "next/image"
import Loading from "../../src/components/loading"
import useEye from "../../src/hooks/useEye"
const Register = () => {

    const { register } = useContext(DataContext)
    const { inputPass, eye, handleEye } = useEye()
    
    return (
        <div className='container-fluid wall'>
            <Loading />
            <div className='row mh-100'>
                <div className='col-12 col-sm-9 col-md-6 offset-lg-4 col-lg-4 d-flex align-items-center'>
                    <div className="p-5 shadow text-center bg-white border-radius-1 w-100">
                        <Image src='/img/logo.png' priority alt="logo" className='logo' width={140} height={140} />
                        <h2 className='welcome-text gray'>Registrate</h2>
                        <form onSubmit={(e) => register(e)}>
                            <div className="form-inputs">
                                <span className="gray small"> Correo </span>
                                <input name="email" id="email" type="email" className='mb-4 pi' placeholder='Ingresa tu correo' required />
                                <span className="gray small"> Contraseña </span>

                                <div className="input-group mb-3">
                                    <input name="password" id="password" type={inputPass} className='mb-4 pi grayText form-control' placeholder='Contraseña' required />
                                    <div className="input-group-append">
                                        <button onClick={handleEye} className="btn eye-btn pi" type="button">
                                            <i className={`bi ${eye}`} />
                                        </button>
                                    </div>
                                </div>

                                <button className='btn btn-primary w-100 mb-4 mt-3 login-button'>Registrarme</button>
                            </div>
                        </form>
                        <div className="footerLinks">
                            <p className="gray">Ya tienes una cuenta? <Link href="/">Login</Link></p>
                            <Link href="/reset">Olvide mi contraseña</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register