import React, { useContext, useMemo, useState } from 'react';
import { useFirebaseContext } from './FirebaseContext';

const AccountContext = React.createContext(undefined);

export function AccountProvider(props) {
    const { user } = useFirebaseContext();
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
