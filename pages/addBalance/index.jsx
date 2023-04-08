
import NavBar from "../../src/components/navBar"
import { useEffect, useState, useContext } from "react"
import vimoContractAddress from "../../src/services/vimoContractAddress"
import { DataContext } from "../../src/context/DataContext"
import TransferTokenModal from "../../src/components/TransferTokenModal"
const AddBalance = () => {

    const { connect, userWallet, resumeWallet, usdtBalance, chainId, transferUsdt,transactionAddress, transactionError } = useContext(DataContext)
    const change = { price: { bs: 24.45, usdt: 1.00 }, min: { bs: 1, usdt: 1 }, comision: 0.5 }
    const [selectOptions, setSelectOptions] = useState(false)
    const [totalVimoUsd, setTotalVimoUsd] = useState(0)
    const [amountCharge, setAmountCharge] = useState(1)

    useEffect(() => {
        if (!userWallet && selectOptions == 3) connect()
    }, [userWallet, connect, selectOptions])

    useEffect(() => {
        calculate(amountCharge)
    })

    const handleOptionsSetect = (e) => {
        const target = e.target.value
        if (target === "false") setSelectOptions(false)
        else setSelectOptions(Number(target))
    }

    const calculate = (value) => {
        setAmountCharge(value)
        if (selectOptions === 1) setTotalVimoUsd(((value / change.price.bs) - (value / change.price.bs * change.comision / 100)).toFixed(2))
        if (selectOptions === 2) setTotalVimoUsd(((value * change.price.usdt) - (value / change.price.usdt * change.comision / 100)).toFixed(2))
        if (selectOptions === 3) setTotalVimoUsd(((value * change.price.usdt) - (value / change.price.usdt * change.comision / 100)).toFixed(2))
    }

    return (<>
        <NavBar />
        <TransferTokenModal />
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2 pt-3">
                    <div className="d-flex align-items-center">
                        {
                            chainId === "0x61" ? <div className="testnetEnvironment"> Testnet Binance {chainId} </div> :
                            chainId === "0x38" ? <div className="testnetEnvironment"> Mainnet Binance {chainId} </div> :
                            <div className="testneEnvironment"> {chainId} </div>
                        }
                    </div>
                </div>
                <div className="col-12 col-lg-8 offset-lg-2 pt-3">
                    <div className="addBalanceContainer py-5">
                        <h3 className="gray mb-4 light">¿Como desea depositar?</h3>
                        <select onChange={(e) => handleOptionsSetect(e)} className="form-select addSelect gray">
                            <option value="0" > Elija una opcion </option>
                            <option value="1">
                                Bolivares
                            </option>
                            <option value="2">
                                Binance
                            </option>
                            <option value="3">
                                Metamask (USDT)
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
                                <div className="mt-4">
                                    <div className="between">
                                        <div className="gray">
                                            Comision
                                        </div>
                                        <div>
                                            {change.comision}%
                                        </div>
                                    </div>
                                    <div className="between">
                                        <div className="gray">
                                            Total a recibir en Dolares
                                        </div>
                                        <div className="total-add">
                                            $ {totalVimoUsd}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-success w-100 my-4"> Cargar Saldo Vimo </button>
                            </div>}
                            {selectOptions === 2 && <div className="gray px-4">
                                <div className="pt-3">
                                    Precio <span className="text-success"> USDT {(change.price.usdt).toFixed(2)} </span>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend centerDollarUSDT">
                                        <span className="dollar" id="basic-addon1"> USDT </span>
                                    </div>
                                    <input value={amountCharge} onChange={(e) => calculate(e.target.value)} type="number" step="0.01" className="form-control input-addBalance outline-none" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" required />
                                </div>
                                {change.min.usdt > amountCharge &&
                                    <div className="text-danger text-sm pt-1 mb-4">
                                        La cantidad minima es de {change.min.usdt} usdt
                                    </div>
                                }
                                <div className="mt-4">
                                    <div className="between">
                                        <div className="gray">
                                            Comision
                                        </div>
                                        <div>
                                            {change.comision}%
                                        </div>
                                    </div>
                                    <div className="between">
                                        <div className="gray">
                                            Total a recibir en Dolares
                                        </div>
                                        <div className="total-add">
                                            $ {totalVimoUsd}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-success w-100 my-4"> Cargar Saldo Vimo </button>
                            </div>}
                            {selectOptions === 3 && <div className="gray px-4">
                                <div className="">
                                    <div className="pt-3">
                                        Precio <span className="text-success"> USDT {(change.price.usdt).toFixed(2)} </span>
                                    </div>
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend centerDollarUSDT">
                                            <span className="dollar" id="basic-addon1"> USDT </span>
                                        </div>
                                        <input value={amountCharge} onChange={(e) => calculate(e.target.value)} type="number" step="0.01" className="form-control input-addBalance outline-none" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" required />
                                    </div>
                                    {change.min.usdt > amountCharge &&
                                        <div className="text-danger text-sm pt-1 mb-4">
                                            La cantidad minima es de {change.min.usdt} USDT
                                        </div>
                                    }
                                    <div className="mt-4">
                                        <div className="between">
                                            <div className="gray">
                                                Comision
                                            </div>
                                            <div>
                                                {change.comision}%
                                            </div>
                                        </div>
                                        <div className="between">
                                            <div className="gray">
                                                Total a recibir en Dolares
                                            </div>
                                            <div className="total-add">
                                                $ {totalVimoUsd}
                                            </div>
                                        </div>
                                    </div>
                                    {userWallet ?
                                        <button onClick={() => transferUsdt({ from: userWallet, address: vimoContractAddress, amount: amountCharge })} className="btn btn-success w-100 my-4"> Cargar Saldo Vimo </button>
                                        :
                                        <button onClick={() => connect()} className="btn btn-success w-100 my-4"> Conectar Wallet </button>
                                    }
                                </div>
                                {userWallet &&
                                    <div className="p-4 wallet-connected">
                                        <div className="between">
                                            <div>
                                                Wallet conectada con exito <i className="text-success bi bi-check-circle-fill" />
                                            </div>
                                            <div className="text-secondary">
                                                {resumeWallet(userWallet)}
                                            </div>
                                        </div>
                                        <div className="between">
                                            <div>Saldo en tu wallet (Metamask)</div>
                                            <div>
                                                USDT {usdtBalance ? usdtBalance : <div className="spinner-border spinner-border-sm" role="status" />}
                                            </div>
                                        </div>
                                    </div>
                                }

                                {/*  1.- crear un contrato para almacenar los usdt listo
                                2.crear funcion para enviar los usdt al contrato y anexar los dolares a esa cuenta */}

                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default AddBalance