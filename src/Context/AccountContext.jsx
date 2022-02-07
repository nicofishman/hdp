import React, { useContext, useEffect, useMemo, useState } from "react";



const AccountContext = React.createContext(undefined);

export function AccountProvider(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const value = useMemo(() => {
        return ({
            email,
            password,
            setEmail,
            setPassword,
        })
    }, [email, password]);
    return <AccountContext.Provider value={value} {...props} />
}

export function useAccountContext() {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccountContext must be used within a AccountProvider');
    }
    return context;
}
