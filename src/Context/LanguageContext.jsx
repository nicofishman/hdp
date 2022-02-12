import React, { useContext, useMemo, useState } from 'react';
import { dictionaryList } from 'Languages/Languages';

const LanguageContext = React.createContext(undefined);

export function LanguageProvider(props) {
    const defaultLanguage = window.localStorage.getItem('rcml-lang');
    const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'es');

    const useLanguageChange = (language) => {
        setUserLanguage(language);
        window.localStorage.setItem('rcml-lang', language);
    };

    const value = useMemo(() => {
        return ({
            userLanguage,
            dictionary: dictionaryList[userLanguage],
            userLanguageChange: useLanguageChange,
        });
    }, [userLanguage, dictionaryList, useLanguageChange]);
    return <LanguageContext.Provider value={value} {...props} />;
}

export function useLanguageContext() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useDropContext must be used within a DropProvider');
    }
    return context;
}
