import { useState } from "react"
const useEye = () => {

    const [eye, setEye] = useState('bi-eye-slash')
    const [inputPass, setInputPass] = useState('password')
    const handleEye = () => {
        if (eye == 'bi-eye-slash') {
            setEye('bi-eye')
            setInputPass('text')
        }
        if (eye == 'bi-eye') {
            setEye('bi-eye-slash')
            setInputPass('password')
        }
    }

    return { inputPass, eye, handleEye }
}

export default useEye
