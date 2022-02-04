import React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from 'Components/Menu/MenuButton';
import Grid from '@mui/material/Grid';
import MenuInput from 'Components/Menu/MenuInput';
import MenuButtonIcon from 'Components/Menu/MenuButtonIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { theme } from 'Common/Theme';
import { uid } from 'react-uid';

function MenuIndex() {
    return (
        <>
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
                        <MenuButton text='crear'></MenuButton>
                    </Link>
                </Grid>
                <Grid item>
                    <MenuInput text='buscar'></MenuInput>
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
        </>
    );
}

export default MenuIndex;
