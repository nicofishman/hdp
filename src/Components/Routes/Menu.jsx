import React from 'react';
import Grid from '@mui/material/Grid';
import MenuLogo from 'Components/Menu/MenuLogo';
import MenuIndex from 'Components/Routes/Pages/MenuIndex';
import MenuSettings from 'Components/Routes/Pages/MenuSettings';
import MenuAccount from './Pages/MenuAccount';
import { AccountProvider } from 'Context/AccountContext';
import Box from '@mui/material/Box'

function Menu({ page }) {
    return (
        <Box mt={-3} sx={{ height: '100vh', width: '100%' }}>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                columns: 1,
                justifyContent: 'center',
                width: { lg: '50%', xs: '100%' },
                height: '100%',
                transform: { lg: 'translateX(50%)', xs: 'translateX(0)' },
            }}>
                <MenuLogo />
                {page === 'index' ? <MenuIndex /> : page === 'account' ? <AccountProvider><MenuAccount /></AccountProvider> : page === 'settings' ? <MenuSettings /> : null}
            </Grid >
        </Box>
    );
}

export default Menu;
