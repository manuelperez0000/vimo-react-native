import { useContext, useState } from "react"
import Web3 from 'web3'
const provider = Web3.givenProvider
const web3 = new Web3(provider)
import axios from "axios"
import serverRoute from "../routes/serverRoute"
//prod 0x61 binance testnet
import usdtAbiMainnet from '../services/usdtAbi.json'
const usdtContractAddressMainnet = process.env.NEXT_PUBLIC_PRD_USDT_CONTRACT
//dev 0x83 binance mainnet
import usdtAbiTestnet from '../services/devUsdtAbi.json'
import { Router } from "next/router"
import { useRouter } from "next/router"
const usdtContractAddressTestnet = process.env.NEXT_PUBLIC_DEV_USDT_CONTRACT
//const usdtContract = new web3.eth.Contract(usdtAbiMainnet, usdtContractAddressMainnet)
const usdtContract = new web3.eth.Contract(usdtAbiTestnet, usdtContractAddressTestnet)
const baseUrl = serverRoute
const useAddBalance = ({ notify,user }) => {
    const router = useRouter()
    const [userWallet, setUserWallet] = useState(false)
    const [usdtBalance, setUsdtBalance] = useState(false)
    const [chainId, setChainId] = useState(false)
    const [transactionAddress, setTransactionAddress] = useState(false)
    const [transactionError, setTransactionError] = useState(false)
    const [enabledTransferTokenModal, setEnabledTransferTokenModal] = useState(false)

    const connect = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const chainId = provider.chainId
            //comprobar que este en la red correcta
            //si no esta en la correcta cambiar de red y si no la tiene aagregada agregar
            setChainId(chainId)
            const accounts = await web3.eth.requestAccounts()
            //const accounts = await window.ethereum.enable()
            setUserWallet(accounts[0])
            const _usdtbalance = await getUsdtBalance(accounts[0])
            setUsdtBalance(_usdtbalance)
        } else {
            notify("Debe instalar metamask para poder realizar recargas con Theter USDT", "warning")
        }
    }

    const getUsdtBalance = async (wallet) => {
        console.log("Obtener balance de la wallet: " + wallet)
        const usdtBalance = await usdtContract.methods.balanceOf(wallet).call()
        const ethBalance = web3.utils.fromWei(usdtBalance, "ether")
        console.log(ethBalance)
        return ethBalance
    }

    const resumeWallet = (wallet) => {
        return wallet.substr(0, 5) + "..." + wallet.substr(wallet.length - 5, 5)
    }

    const transferUsdt = async ({ from, address, amount }) => {
        notify("Transaccion enviada")
        const transactionResult = await transferTokens(usdtContractAddressTestnet, address, web3.utils.toWei(String(amount), "ether"), from)
        notify("Transaccion Exitosa", "success")

        if (transactionResult.error) {
            setTransactionError(transactionResult.msg)
        } else {

            console.log(user)

            setTransactionAddress(transactionResult.transactionAddress)
            const body = {
                transationMesage: "Recarga de saldo metamask usdt",
                type: "addBalance",
                hash: transactionResult.transactionAddress,
                amount,
                user,
                uid:user.uid,
                wallet: from,
                contractAddress: usdtContractAddressTestnet,
                date: new Date()
            }

            const savedResponse = await axios.post(baseUrl + "api/transactions/save/save", body)
            console.log(savedResponse)
            
            //guardar la transaccion y transferir los tokens a la wallet
        }
        setEnabledTransferTokenModal(true)

    }

    const transferTokens = async (tokenContractAddress, recipientAddress, numTokens, senderAddress) => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(usdtAbiTestnet, tokenContractAddress);
        /* const accounts = await web3.eth.getAccounts(); */
        /* const senderAddress = accounts[0]; */

        const tx = {
            from: senderAddress,
            to: tokenContractAddress,
            gas: String(100000),
            data: tokenContract.methods.transfer(recipientAddress, numTokens).encodeABI()
        };

        try {
            const receipt = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx]
            })
            console.log('Transaction succeeded:', receipt);
            return { error: false, transactionAddress: receipt }
        } catch (error) {
            console.error('Transaction failed:', error);
            return { error: true, msg: error }
        }
    }


    return {
        connect, userWallet, usdtBalance,
        resumeWallet, chainId, transferUsdt,
        transactionAddress, transactionError,
        enabledTransferTokenModal, setEnabledTransferTokenModal
    }
}
export default useAddBalance