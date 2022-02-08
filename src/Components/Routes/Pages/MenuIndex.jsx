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

function MenuIndex() {
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
                flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
            >
                <Grid item>
                    <Link to="/game/hdp" style={{ textDecoration: 'none' }}>
                        <MenuButton text='crear' sx={{
                            width: 275,
                            maxWidth: null,
                        }}></MenuButton>
                    </Link>
                </Grid>
                <Grid item>
                    <SearchGame text='buscar'></SearchGame>
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
                                "&:hover": {
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
                                "&:hover": {
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
