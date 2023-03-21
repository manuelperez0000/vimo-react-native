
import NavBar from "../../src/components/navBar"
import Link from "next/link"
import { useEffect, useState } from "react"
const AddBalance = () => {
    const change = { price: { bs: 24.45, usdt: 1.00 }, min: { bs: 100, usdt: 5 }, comision: 0.005 }
    const [selectOptions, setSelectOptions] = useState(false)
    
    const [totalVimoUsd, setTotalVimoUsd] = useState(0)
    const [amountCharge, setAmountCharge] = useState(1000)

    useEffect(() => { calculate() }, [])

    const handleOptionsSetect = (e) => {
        const target = e.target.value
        if (target === "false") setSelectOptions(false)
        else setSelectOptions(Number(target))
    }

    const calculate = (value) => {
        setAmountCharge(value)
        if (selectOptions === 1) setTotalVimoUsd(((value / change.price.bs) - (value / change.price.bs * change.comision)).toFixed(2))
        if (selectOptions === 2) setTotalVimoUsd(value * change.price.usdt)
        if (selectOptions === 3) setTotalVimoUsd(value * change.price.usdt)
    }

    return (<>
        <NavBar />
        <div className="container">
            <div className="row">
                <div className="col-12 py-4">
                    <Link href="/home" >
                        <button className="btn btn-primary">
                            <i className="bi bi-arrow-left" /> Regresar
                        </button>
                    </Link>
                </div>
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="addBalanceContainer py-5">
                        <h3 className="gray mb-4 light">¿Como desea cargar saldo?</h3>
                        <select onChange={(e) => handleOptionsSetect(e)} className="form-select addSelect gray">
                            <option value="false" selected > Elija una opcion </option>
                            <option value="1">
                                Bolivares
                            </option>
                            <option value="2">
                                Binance
                            </option>
                            <option value="3">
                                Metamask
                            </option>
                        </select>
                        <div>
                            {selectOptions === 1 && <div className="gray px-4">
                                <div className="pt-3">
                                    Precio <span className="text-success"> Bs {change.price.bs} </span>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend centerDollar">
                                        <span className="dollar" id="basic-addon1">BS</span>
                                    </div>
                                    <input value={amountCharge} onChange={(e) => calculate(e.target.value)} type="number" step="0.01" className="form-control input-addBalance outline-none" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" required />
                                </div>
                                {change.min.bs > amountCharge &&
                                    <div className="text-danger text-sm pt-1 mb-4">
                                        La cantidad minima es de {change.min.bs} BS
                                    </div>
                                }
                                <div className="between">
                                    <div className="gray">
                                        Cantidad en Dolares
                                    </div>
                                    <div className="total-add">
                                        $ {totalVimoUsd}
                                    </div>
                                </div>
                                <div className="between">
                                    <div className="gray">
                                        Comision
                                    </div>
                                    <div>
                                        {change.comision * 100}%
                                    </div>
                                </div>
                                <button className="btn btn-success w-100 my-4"> Cargar Saldo Vimo </button>
                            </div>}
                            {selectOptions === 2 && <div className="gray px-4">
                                <div className="pt-3">
                                    Precio <span className="text-success"> USDT {change.price.usdt} </span>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend centerDollarUSDT">
                                        <span className="dollar" id="basic-addon1"> USDT </span>
                                    </div>
                                    <input value={amountCharge} onChange={(e) => calculate(e.target.value)} type="number" step="0.01" className="form-control input-addBalance outline-none" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" required />
                                </div>
                                {change.min.bs > amountCharge &&
                                    <div className="text-danger text-sm pt-1 mb-4">
                                        La cantidad minima es de {change.min.bs} BS
                                    </div>
                                }
                                <div className="between">
                                    <div className="gray">
                                        Cantidad en Dolares
                                    </div>
                                    <div className="total-add">
                                        $ {totalVimoUsd}
                                    </div>
                                </div>
                                <div className="between">
                                    <div className="gray">
                                        Comision
                                    </div>
                                    <div>
                                        {change.comision * 100}%
                                    </div>
                                </div>
                                <button className="btn btn-success w-100 my-4"> Cargar Saldo Vimo </button>
                            </div>}
                            {selectOptions === 3 && <> Metamask </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default AddBalance