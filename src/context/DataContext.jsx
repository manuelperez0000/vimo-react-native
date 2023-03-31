import { createContext } from 'react'
import useAuth from '../../src/hooks/useAuth'
import useNotify from '../hooks/useNotify'
export const DataContext = createContext()
export const DataProvider = ({ children }) => {

    const {notify,notifyStatus,notifyMessage,disableNotify} = useNotify()

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
        transactions
    } = useAuth()

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
        transactions
    }

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    )

}