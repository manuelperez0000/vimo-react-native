import { createContext } from 'react'
import useAuth from '../../src/hooks/useAuth'
export const DataContext = createContext()
export const DataProvider = ({ children }) => {

    const {
        user,
        login,
        register,
        logOut,
        google,
        loading, setLoading,
        modalActive, setModalActive,
        balance, setBalance,
        resetPassword
    } = useAuth()

    const context = {
        user,
        login,
        register,
        logOut,
        google,
        loading, setLoading,
        modalActive, setModalActive,
        balance, setBalance,
        resetPassword,
    }

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    )

}