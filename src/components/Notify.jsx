import { DataContext } from "../context/DataContext"
import { useContext } from "react";
const Notify = () => {
    const { notifyStatus, notifyMessage, disableNotify } = useContext(DataContext);
    return (
        <div className={notifyStatus}>
            <div className="">
                <i className="bi bi-info-circle-fill px-1" />
                {notifyMessage}
            </div>
            <i onClick={() => disableNotify()} className="bi bi-x-lg x-notify" />
        </div>
    )
}
export default Notify