import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MenuLogo from 'Components/Menu/MenuLogo';
import MenuIndex from 'Components/Routes/Pages/MenuIndex';
import MenuSettings from 'Components/Routes/Pages/MenuSettings';
import MenuAccount from './Pages/MenuAccount';
import { AccountProvider } from 'Context/AccountContext';
import Box from '@mui/material/Box';
import MyAlert from 'Components/Common/MyAlert';
import { useAlertsContext } from 'Context/AlertsContext';

function Menu({ page }) {
    const { changeUsernameAlert, setChangeUsernameAlert, wrongPasswordAlert, setWrongPasswordAlert, notLoggedInAlert, setNotLoggedInAlert, gameNotFoundAlert, setGameNotFoundAlert, gameIsStartedAlert, setGameIsStartedAlert } = useAlertsContext();

    useEffect(() => {
        console.log('game alert changed', gameNotFoundAlert);
    }, [gameNotFoundAlert]);

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
            <MyAlert text='updateusername' slideIn={changeUsernameAlert} setSlideIn={setChangeUsernameAlert} severity='success' />
            <MyAlert text='wrongpassword' slideIn={wrongPasswordAlert} setSlideIn={setWrongPasswordAlert} severity='error' />
            <MyAlert text='gamenotfound' slideIn={gameNotFoundAlert} setSlideIn={setGameNotFoundAlert} severity='error' />
            <MyAlert text='gamestarted' slideIn={gameIsStartedAlert} setSlideIn={setGameIsStartedAlert} severity='error' />
            <MyAlert text='notloggedin' slideIn={notLoggedInAlert} setSlideIn={setNotLoggedInAlert} severity='warning' />
        </Box>
    );
}

export default Menu;
