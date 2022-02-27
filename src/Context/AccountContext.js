import React, { useContext, useMemo, useState, createContext } from 'react';
import { useFirebaseAuthContext } from './Firebase.authContext';

const AccountContext = createContext(undefined);

export function AccountProvider(props) {
    const { user } = useFirebaseAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changeName, setChangeName] = useState(user.displayName);

    const value = useMemo(() => {
        return ({
            email,
            password,
            setEmail,
            setPassword,
            changeName,
            setChangeName,
        });
    }, [email, password, changeName]);
    return <AccountContext.Provider value={value} {...props} />;
}

export function useAccountContext() {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccountContext must be used within a AccountProvider');
    }
    return context;
}
