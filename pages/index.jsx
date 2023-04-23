import Link from "next/link"
import { DataContext } from "../src/context/DataContext"
import { useCallback, useContext, useEffect, useState } from "react"
import Image from "next/image"
import useEye from "../src/hooks/useEye"
import Loading from "../src/components/loading"
const Login = () => {

  const { login } = useContext(DataContext)
  const { inputPass, eye, handleEye } = useEye()

  const handleCheck = (e) => {
    const atemp = (e.target.checked)
    localStorage.setItem("atempLoginVimo", atemp)
  }

  useEffect(() => {
    automaticLogin()
  })

  const automatic = false
  const automaticLogin = () => {
    if (automatic) {
      const loginData = localStorage.getItem("vimoLoginData")
      if (loginData) {
        const jsonData = JSON.parse(loginData)
        login(jsonData[0], jsonData[1])
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    login(email, password)
  }

  return (
    <div className='container-fluid'>
      <Loading />
      <div className='row min-h-100vh'>
        <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 '>
          <div className="pt-5 px-4 text-center">
            <div className="signInText">
              Iniciar sesion-
            </div>
            <div className="logo-index">
              <Image src='/img/logo.png' priority alt="logo" className='logo' width={80} height={80} />
              VIMO
            </div>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="form-inputs">
                <div className="form-group">
                  <label className="gray small"> Correo </label>
                  <input name="email" id="email" type="email" className='mb-4 pi form-control' placeholder='Ingrese su correo electronico' required autoFocus />
                </div>
                <label className="gray small"> Contraseña </label>
                <div className="input-group mb-3">
                  <input name="password" id="password" type={inputPass} className='mb-4 form-control pi' placeholder='Ingrese su contraseña' required />
                  <div className="input-group-append">
                    <button onClick={handleEye} className="btn eye-btn pi" type="button">
                      <i className={`bi ${eye}`} />
                    </button>
                  </div>
                </div>
                <button className='btn btn-primary w-100 login-button'>Iniciar sesión</button>
              </div>
            </form>
            <div className="footerLinks mt-4">
              <p className="gray" >No tienes una cuenta? <Link href="/register">Registrate</Link></p>
              <Link href="/reset">Olvide mi contraseña</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login