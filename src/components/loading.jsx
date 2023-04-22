import { useContext } from "react"
import { DataContext } from "../context/DataContext"
const Loading = () => {
    const {loading} = useContext(DataContext)
    return (<>
        {loading &&
            <div className="bg_modal">
                <div className="loadingContent">
                    <span className="loader mb-4"></span>
                    <div>
                        Cargando
                    </div>
                </div>
            </div>
        }
    </>
    )
}
export default Loading