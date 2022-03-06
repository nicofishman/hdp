import React, { useContext, useMemo, useState, createContext } from 'react';

const AlertsContext = createContext(undefined);

export function AlertsProvider(props) {
    const [changeUsernameAlert, setchangeUsernameAlert] = useState(false);
    const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);
    const [notLoggedInAlert, setNotLoggedInAlert] = useState(false);
    const [gameNotFoundAlert, setGameNotFoundAlert] = useState(false);
    const [gameIsStartedAlert, setGameIsStartedAlert] = useState(false);
    const value = useMemo(() => {
        return ({
            changeUsernameAlert,
            wrongPasswordAlert,
            notLoggedInAlert,
            gameNotFoundAlert,
            gameIsStartedAlert,
            setchangeUsernameAlert,
            setWrongPasswordAlert,
            setNotLoggedInAlert,
            setGameNotFoundAlert,
            setGameIsStartedAlert,
        });
    }, [changeUsernameAlert, wrongPasswordAlert, notLoggedInAlert, gameNotFoundAlert, gameIsStartedAlert]);
    return <AlertsContext.Provider value={value} {...props} />;
}

export function useAlertsContext() {
    const context = useContext(AlertsContext);
    if (!context) {
        throw new Error('useAlertsContext must be used within a AlertsProvider');
    }
    return context;
}
