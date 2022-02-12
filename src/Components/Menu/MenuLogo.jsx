import Grid from '@mui/material/Grid';
import React from 'react';
import { ReactComponent as LogoLight } from 'Common/LogoLight.svg';
import { ReactComponent as LogoDark } from 'Common/LogoDark.svg';
import { useThemeContext } from 'Context/ThemeContext';

function MenuLogo() {
    const { theme } = useThemeContext();
    return (
        <Grid
            container item
            columnSpacing={{ xs: 1, md: 2 }}
            rowSpacing={3}
            justifyContent={'center'}
            alignItems={'center'}
            // mt={{ lg: 0, md: 5, sm: 2 }}
            display={'flex'}
            flexDirection={'column'}
        >
            <Grid item sx={{ width: '100%', maxWidth: '35em', userSelect: 'none' }}>
                {theme.palette.mode === 'light' ? <LogoLight /> : <LogoDark />}
            </Grid>
        </Grid >
    );
}

export default MenuLogo;
