import React, { useContext, useMemo, useState, createContext } from 'react';
import { dictionaryList } from 'Languages/Languages';

const LanguageContext = createContext(undefined);

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
        throw new Error('useLanguageContext must be used within a LanguageProvider');
    }
    return context;
}
