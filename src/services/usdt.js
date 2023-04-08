
//production 
//import usdtAbi from './usdtAbi.json'
/* const addressProd = process.env.NEXT_PUBLIC_PRD_USDT_CONTRACT
const abiProd = usdtAbi */

//development
import devUsdtAbi from './devUsdtAbi.json'
const addressDev = process.env.NEXT_PUBLIC_DEV_USDT_CONTRACT
const abiDev = devUsdtAbi

const usdt = { abi:abiDev, address:addressDev }
console.log(usdt)

export default usdt