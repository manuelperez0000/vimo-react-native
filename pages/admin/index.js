import NavBar from "../../src/components/navBar"
const AdminPanel = () => {

    const saveUsdt = (e) => {
        e.preventDefault()
        console.log("USDT")
    }

    const saveBs = (e) => {
        e.preventDefault()
        console.log("BS")
        
    }

    return (<>
        <NavBar />
        <div className="p-5">
            <h4> Admin Panel </h4>
            <ul> 
                <li> transacciones </li>
                <li> usuarios </li>
                <li> Operaciones </li>  
            </ul>

            <div className="mb-4 p-3 bg-danger">
                Tipo de cambio Bolivar
                Compra:
                <form onSubmit={(e) => saveBs(e)} >
                    <input type="text" className="form-control" placeholder="Compra" required />
                    Venta:
                    <input type="text" className="form-control" placeholder="Venta" required />
                    <button> Enviar </button>
                </form>
            </div>

            <div className="p-3 bg-danger">
                Tipo de cambio usdt
                <form onSubmit={(e) => saveUsdt(e)}>
                    <input type="text" className="form-control" placeholder="Compra" required />
                    Venta:
                    <input type="text" className="form-control" placeholder="Venta" required />
                    <button> Enviar </button>
                </form>
            </div>


        </div>
    </>)
}
export default AdminPanel