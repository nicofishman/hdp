import { createTheme } from '@mui/material/styles';

export default function makeTheme(mode) {
    return (createTheme({
        palette: {
            mode: mode,
            primary: {
                main: mode === 'light' ? '#C6187B' : '#fd58aa',
            },
            background: {
                default: mode === 'light' ? '#fff' : '#121212',
            }
        },
        typography: {
            fontFamily: ['Oswald', 'sans-serif'].join(','),
            body1: {
                color: mode === 'light' ? '#000' : '#fff',
            }
        }
    })
    );
}
