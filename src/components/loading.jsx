import { useContext } from "react"
import { DataContext } from "../context/DataContext"
const Loading = () => {
    const {loading} = useContext(DataContext)
    return (<>
        {loading &&
            <div className="loadingContainer">
                <div className="loadingContent">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </div>
        }
    </>
    )
}
export default Loading