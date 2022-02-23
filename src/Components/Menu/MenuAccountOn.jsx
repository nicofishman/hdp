import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFirebaseContext } from 'Context/FirebaseContext';
import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';
import SettingsSection from './SettingsSection';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import MenuButtonIcon from './MenuButtonIcon';
import { useThemeContext } from 'Context/ThemeContext';
import ChangeName from './ChangeName';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Text } from 'Languages/Text';
import { useAccountContext } from 'Context/AccountContext';
import CircularProgress from '@mui/material/CircularProgress';

function MenuAccountOn() {
    const { user, logOut, changeDisplayName, loading } = useFirebaseContext();
    const { changeName } = useAccountContext();
    const { theme } = useThemeContext();
    const displayName = user.displayName;

    useEffect(() => {
        console.log('displ', user.displayName);
    }, [user.displayName]);

    return (
        <>
            {!loading ?
                <Grid
                    container item
                    columnSpacing={{ xs: 1, md: 2, lg: 0 }}
                    rowSpacing={3}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mt={3}
                    flexWrap={{ lg: 'nowrap', md: 'nowrap', xs: 'nowrap' }}
                    direction={'column'}
                >
                    <Grid container item direction={'row'} justifyContent={'center'}>
                        <Link to='/' style={{ justifyContent: 'center', textDecoration: 'none', alignItems: 'center' }}>
                            <MenuButtonIcon sx={{
                                color: theme.palette.mode === 'light' ? '#000' : '#fff',
                                width: 60,
                                height: 60,
                                borderRadius: 3,
                                '&:hover .settings': {
                                    transform: 'translateX(-2px)',
                                }
                            }}
                            >
                                <ArrowBackIcon className='settings' sx={{ mr: 'auto', ml: 2.75, transition: 'transform 0.2s ease' }} />
                            </MenuButtonIcon>
                        </Link>
                        <SettingsSection sx={{ height: 60, width: 220, ml: 2 }}>
                            {/* <PersonIcon sx={{ fontSize: 55, minWidth: 40 }}></PersonIcon> */}
                            <Typography sx={{ textOverflow: 'ellipsis' }}>{displayName}</Typography>
                        </SettingsSection>
                    </Grid>
                    <Grid container item direction={'row'} justifyContent={'center'} mr={25} mb={-3}>
                        <Typography><Text tid="changename"></Text></Typography>
                    </Grid>
                    <Grid container item direction={'row'} justifyContent={'center'}>
                        <ChangeName placeholder={displayName} sx={{ height: 60, width: 220, mr: 2 }}></ChangeName>
                        <MenuButtonIcon
                            onClick={() => { changeDisplayName(changeName); }}
                            sx={{
                                color: theme.palette.mode === 'light' ? '#000' : '#fff',
                                width: 60,
                                height: 60,
                                borderRadius: 3,
                                '&:hover .settings': {
                                    transform: 'translateX(2px)',
                                }
                            }}
                        >
                            <ArrowForwardIosIcon className='settings' sx={{ mr: 'auto', ml: 2.75, transition: 'transform 0.2s ease' }} />
                        </MenuButtonIcon>
                    </Grid>
                    <Grid container item direction={'row'} justifyContent={'center'}>
                        <MenuButton text="logout" onClick={() => logOut()}></MenuButton>
                    </Grid>
                </Grid > :
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CircularProgress color='primary' />
                </Box>
            }
        </>

    );
}

export default MenuAccountOn;
