import { createContext } from 'react'
import useAuth from '../../src/hooks/useAuth'
import useNotify from '../hooks/useNotify'
import useAddBalance from '../hooks/useAddBalance'
export const DataContext = createContext()
export const DataProvider = ({ children }) => {


    const { notify, notifyStatus, notifyMessage, disableNotify } = useNotify()

    const { connect, userWallet, usdtBalance, resumeWallet, chainId, transferUsdt,
        transactionAddress, transactionError, setTransactionError, enabledTransferTokenModal,
        setEnabledTransferTokenModal } = useAddBalance({ notify })

    const {
        user,
        login,
        register,
        logOut,
        google,
        resetPassword,
        loading, setLoading,
        modalActive, setModalActive,
        balance, setBalance,
        transactions,
        isAuthenticated, setIsAuthenticated
    } = useAuth({ notify })

    const context = {
        user,
        login,
        register,
        logOut,
        google,
        resetPassword,
        loading, setLoading,
        modalActive, setModalActive,
        balance, setBalance,
        notify,
        notifyStatus,
        notifyMessage,
        disableNotify,
        transactions,
        isAuthenticated, setIsAuthenticated,
        connect, userWallet, usdtBalance, resumeWallet, chainId, transferUsdt,
        transactionAddress, transactionError,
        enabledTransferTokenModal,
        setTransactionError, setEnabledTransferTokenModal
    }

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    )

}