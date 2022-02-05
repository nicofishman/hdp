import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import makeTheme from 'Common/Theme';
import { ThemeProvider as MuiThemeContext } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";


const ThemeContext = React.createContext(undefined);


export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    useLayoutEffect(() => {
        const colorMode = localStorage.getItem('colorMode');
        if (!colorMode) return;
        try {
            const isDark = JSON.parse(colorMode);
            setDark(isDark);
        } catch (_) {
            //no-oop
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('colorMode', JSON.stringify(dark));
    }, [dark]);

    const theme = useMemo(() => {
        return makeTheme(dark ? 'dark' : 'light');
    }, [dark]);

    const value = useMemo(() => {
        return ({
            dark,
            setDark,
            theme,
        })
    }, [dark, theme]);

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeContext theme={theme}><CssBaseline />{children}</MuiThemeContext>
        </ThemeContext.Provider >)
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useChangeThemeContext must be used within a ChangeThemeProvider');
    }
    return context;
}