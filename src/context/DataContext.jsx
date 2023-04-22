import { createContext, useEffect } from 'react'
import useAuth from '../../src/hooks/useAuth'
import useNotify from '../hooks/useNotify'
import useAddBalance from '../hooks/useAddBalance'
export const DataContext = createContext()
export const DataProvider = ({ children }) => {

    const clipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy);
        notify("Copiado en el portapapeles", "success")
    }
    const whatsappShare = () => {
        const message = encodeURIComponent(`Esta es mi wallet vimo: 
${user.wallet}`);
        const url = `https://wa.me/?text=${message}`;
        window.open(url, '_blank');
    }

    const { notify, notifyStatus, notifyMessage, disableNotify } = useNotify()

    const {
        user,
        login,
        register,
        logOut,
        google,
        resetPassword,
        loading, setLoading,
        balance, setBalance,
        transactions,
        isAuthenticated, setIsAuthenticated
    } = useAuth({ notify })
    
    const { connect, userWallet, usdtBalance, resumeWallet, chainId, transferUsdt,
        transactionAddress, transactionError, setTransactionError, enabledTransferTokenModal,
        setEnabledTransferTokenModal } = useAddBalance({ notify, user })

    const context = {
        user,
        login,
        register,
        logOut,
        google,
        resetPassword,
        loading, setLoading,
        balance, setBalance,
        notify, clipboard,whatsappShare,
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