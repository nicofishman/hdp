import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useFirebaseContext } from 'Context/FirebaseContext';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';
import SettingsSection from './SettingsSection';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { Text } from 'Languages/Text';
import PersonIcon from '@mui/icons-material/Person';

function MenuAccountOn() {
    const { user, logOut } = useFirebaseContext();
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
                        "&:hover .settings": {
                            transform: 'translateX(-2px)',
                        }
                    }}>
                        <Typography sx={{ mt: 0.5 }}>
                            <ArrowBackIcon className='settings' sx={{ mr: 'auto', ml: 2, transition: 'transform 0.2s ease' }} />
                        </Typography>
                        <Typography sx={{ justifyContent: 'center', flex: 1, fontSize: 25, mr: 4 }}><Text tid="cuenta" /></Typography>
                    </SettingsSection>
                </Link>
            </Grid>
            <Grid container item direction={'row'} justifyContent={'center'}>
                <SettingsSection sx={{ height: 60 }}>
                    <PersonIcon sx={{ fontSize: 60, ml: 1 }}></PersonIcon>
                    <Typography sx={{ flex: 1, mr: 7, textOverflow: 'ellipsis' }}>{!(user.displayName) ? user.email.split('@')[0] : user.displayName}</Typography>
                </SettingsSection>
            </Grid>
            <Grid container item direction={'row'} justifyContent={'center'}>
                <MenuButton text="salir" onClick={() => logOut()}></MenuButton>
            </Grid>
        </Grid >
    );
}

export default MenuAccountOn;
