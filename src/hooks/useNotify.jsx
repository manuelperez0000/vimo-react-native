import { useState } from "react";
const useNotify = () => {
    const [notifyStatus, setnotifyStatus] = useState("notify notify-disabled");
    const [notifyMessage, setNotifyMessage] = useState("")

    const notify = (message, type) => {
        setNotifyMessage(message)
        if (!type) setnotifyStatus("notify notify-info")
        if (type === "info") setnotifyStatus("notify notify-info")
        if (type === "warning") setnotifyStatus("notify notify-warning")
        if (type === "success") setnotifyStatus("notify notify-success")
        if (type === "danger") setnotifyStatus("notify notify-danger")
        setTimeout(() => {
            setnotifyStatus("notify notify-disabled")
            setNotifyMessage("")
        }, 4000)
        clearTimeout()
    }
    const disableNotify = ()=>{
        setNotifyMessage("")
        setnotifyStatus("notify notify-disabled")
    }

    const $ = {
        notify,
        notifyStatus,
        notifyMessage,
        disableNotify
    }

    return $
}
export default useNotify