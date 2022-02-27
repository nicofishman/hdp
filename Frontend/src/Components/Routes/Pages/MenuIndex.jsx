import React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from 'Components/Menu/MenuButton';
import Grid from '@mui/material/Grid';
import SearchGame from 'Components/Menu/SearchGame';
import MenuButtonIcon from 'Components/Menu/MenuButtonIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { useThemeContext } from 'Context/ThemeContext';
import Box from '@mui/material/Box';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';

function MenuIndex() {
    const { auth } = useFirebaseAuthContext();
    const { createGame } = useFirebaseDatabaseContext();
    const { theme } = useThemeContext();
    return (
        <Box sx={{ bgcolor: theme.background }}>
            <Grid
                container item
                columnSpacing={{ xs: 1, md: 2, lg: 0 }}
                rowSpacing={3}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={3}
                mb={3}
                flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
            >
                <Grid item>
                    <MenuButton
                        text='create'
                        sx={{
                            width: 275,
                            maxWidth: null,
                            '&:hover': {
                                cursor: 'pointer',
                            }
                        }}
                        onClick={() => createGame(auth.currentUser)}
                    ></MenuButton>
                </Grid>
                <Grid item>
                    <SearchGame text='search'></SearchGame>
                </Grid>
            </Grid>
            <Grid
                container item
                columnSpacing={{ xs: 1, md: 2 }}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={3}
            >
                <Grid item>
                    <Link to="/settings">
                        <MenuButtonIcon>
                            <SettingsIcon sx={{
                                fontSize: 90,
                                color: theme.palette.primary.main,
                                transitionProperty: 'all',
                                transitionDuration: '0.7s',
                                '&:hover': {
                                    transform: 'rotate(90deg)',
                                    color: theme.palette.primary.dark,
                                }
                            }}></SettingsIcon>
                        </MenuButtonIcon>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/account">
                        <MenuButtonIcon>
                            <PersonIcon sx={{
                                fontSize: 90,
                                color: theme.palette.primary.main,
                                transitionProperty: 'all',
                                transitionDuration: '0.7s',
                                '&:hover': {
                                    color: theme.palette.primary.dark,
                                }
                            }}></PersonIcon>
                        </MenuButtonIcon>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MenuIndex;
