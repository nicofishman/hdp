import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SettingsSection from 'Components/Menu/SettingsSection';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { Text } from 'Languages/Text';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import MenuButtonIcon from 'Components/Menu/MenuButtonIcon';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccountInput from 'Components/Menu/AccountInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuButton from 'Components/Menu/MenuButton';
import { useAccountContext } from 'Context/AccountContext';

function MenuSignUp() {
    const { mySignInWithEmailAndPassword, signInWithGoogle, signInWithTwitter } = useFirebaseAuthContext();
    const [passwordShown, setPasswordShown] = useState(false);
    // const isLoggedIn = userId !== null;

    const { email, password } = useAccountContext();

    const handleLogin = () => {
        if (!email || !password) return;
        if (!(email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) && password.length >= 4)) {
            alert(`Invalid email or password ${email} ${password}`);
            return;
        }
        mySignInWithEmailAndPassword(email, password);
    };

    return (
        <Grid
            container item
            columnSpacing={{ xs: 1, md: 2, lg: 0 }}
            rowSpacing={3}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={3}
            flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
            direction={'column'}
        >
            <Grid container item direction={'row'} justifyContent={'center'}>
                <Link to='/' style={{ justifyContent: 'center', textDecoration: 'none', alignItems: 'center' }}>
                    <SettingsSection sx={{
                        height: 40,
                        width: 300,
                        '&:hover .settings': {
                            transform: 'translateX(-2px)',
                        }
                    }}>
                        <Typography sx={{ mt: 0.5 }}>
                            <ArrowBackIcon className='settings' sx={{ mr: 'auto', ml: 2, transition: 'transform 0.2s ease' }} />
                        </Typography>
                        <Typography sx={{ justifyContent: 'center', flex: 1, fontSize: 25, mr: 4 }}><Text tid="account" /></Typography>
                    </SettingsSection>
                </Link>
            </Grid>
            <Grid
                container item
                columnSpacing={{ xs: 1, md: 2 }}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexWrap={{ lg: 'nowrap', xs: 'wrap' }}

            >
                <MenuButtonIcon sx={{ ml: 1, mr: 1, width: 70, height: 70 }} onClick={signInWithGoogle}><GoogleIcon sx={{ fontSize: 65 }} /></MenuButtonIcon>
                <MenuButtonIcon sx={{ ml: 1, mr: 1, width: 70, height: 70 }} onClick={signInWithTwitter}><TwitterIcon sx={{ fontSize: 65 }} /></MenuButtonIcon>
            </Grid>
            <Grid
                container item
                columnSpacing={{ xs: 1, md: 2 }}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography fontSize={40}>— OR —</Typography>
            </Grid>
            <Grid container item justifyContent={'center'} mt={-2}>
                <AccountInput name="email" text="email" type="email" />
            </Grid>
            <Grid container item justifyContent={'center'} mt={-2}>
                <AccountInput name="password" text="password" type={passwordShown ? 'text' : 'password'}
                    endAdornment={
                        passwordShown ?
                            <Visibility onClick={() => setPasswordShown(!passwordShown)} sx={{ ml: 1, '&:hover': { cursor: 'pointer' } }} /> :
                            <VisibilityOff onClick={() => setPasswordShown(!passwordShown)} sx={{ ml: 1, '&:hover': { cursor: 'pointer' } }} />
                    } />
            </Grid>
            <Grid container item justifyContent={'center'}>
                <MenuButton text={'ingresar'} onClick={() => handleLogin()} sx={{ width: 300, height: 50, fontWeigth: 'light' }} />
            </Grid>
        </Grid >
    );
}

export default MenuSignUp;
