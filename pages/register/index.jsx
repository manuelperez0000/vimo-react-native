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
        <div className='container-fluid'>
            <Loading />
            <div className='row min-h-100vh'>
                <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 '>
                    <div className="pt-5 px-4 text-center">
                        <div className="signInText">
                            Registro
                        </div>
                        <div className="logo-index">
                            <Image src='/img/logo.png' priority alt="logo" className='logo' width={80} height={80} />
                            VIMO
                        </div>
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
                                <button className='btn btn-primary w-100 login-button'>Registrarme</button>
                            </div>
                        </form>
                        <div className="footerLinks mt-4">
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