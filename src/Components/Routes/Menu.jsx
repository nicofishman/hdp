import React from 'react';
import Grid from '@mui/material/Grid';
import MenuLogo from 'Components/Menu/MenuLogo';
import MenuIndex from 'Components/Routes/Pages/MenuIndex';
import MenuSettings from 'Components/Routes/Pages/MenuSettings';
import MenuAccount from './Pages/MenuAccount';

function Menu({ page }) {
    return (
        <>
            <Grid container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: { lg: '50%', xs: '100%' },
                transform: { lg: 'translateX(50%)', xs: 'translateX(0)' },
            }}>
                <MenuLogo />
                {page === 'index' ? <MenuIndex /> : page === 'account' ? <MenuAccount /> : page === 'settings' ? <MenuSettings /> : null}
            </Grid >
        </>
    );
}

export default Menu;
