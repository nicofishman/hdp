import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#C6187B',
        },
    },
    typography: {
        fontFamily: ["Oswald", 'sans-serif'].join(',')
    }
});