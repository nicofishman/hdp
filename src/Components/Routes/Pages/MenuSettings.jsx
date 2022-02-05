import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SettingsSection from 'Components/Menu/SettingsSection';
import LanguageIcon from '@mui/icons-material/Language';
import grey from '@mui/material/colors/grey';
import { LanguageOptions } from 'Languages/Languages';
import { useLanguageContext } from 'Context/LanguageContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { Text } from 'Languages/Text';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useThemeContext } from 'Context/ThemeContext';
import Box from '@mui/material/Box';

function MenuSettings() {
    const { userLanguage, userLanguageChange } = useLanguageContext();
    const { dark, setDark, theme } = useThemeContext();
    const handleLanguageChange = e => userLanguageChange(e.target.value);
    let toggleSwitch = !!JSON.parse(localStorage.getItem('colorMode'));
    console.log('switch', toggleSwitch)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        toggleSwitch = JSON.parse(localStorage.getItem('colorMode'));
        console.log(theme.palette.mode)
    }, []);


    return (
        <Box sx={{ bgColor: theme.palette.background.default }}>
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
                    <Link to='/' style={{ justifyContent: 'center', textDecoration: 'none', }}>
                        <SettingsSection sx={{
                            height: 40,
                            "&:hover .settings": {
                                transform: 'translateX(-2px)',
                            }
                        }}>
                            <Typography>
                                <ArrowBackIcon className='settings' sx={{ mr: 'auto', ml: 2, transition: 'transform 0.2s ease' }} />
                            </Typography>
                            <Typography sx={{ justifyContent: 'center', flex: 1, fontSize: 25, mr: 4 }}><Text tid="ajustes" /></Typography>
                        </SettingsSection>
                    </Link>
                </Grid>
                <Grid container item justifyContent={'center'} alignItems={'center'}>
                    <SettingsSection>
                        <Grid item><LightModeIcon fontSize='large' /></Grid>
                        <Grid item><Switch color='primary' defaultChecked={toggleSwitch} onChange={() => setDark(!dark)} /></Grid>
                        <Grid item><DarkModeIcon fontSize='large' /></Grid>
                    </SettingsSection>
                </Grid>
                <Grid container item justifyContent={'center'}>
                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Select
                            startAdornment={<LanguageIcon sx={{ color: theme.palette.mode === 'light' ? grey[800] : grey[200], }} />}
                            placeholder='Idioma'
                            defaultValue={""}
                            onChange={handleLanguageChange}
                            value={userLanguage}
                            color='primary'
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 90,
                                width: 270,
                                maxWidth: '51vw',
                                border: '1px solid #666',
                                borderRadius: 3,
                                padding: 1,
                                mr: 0.5,
                                mb: 0.5,
                                textAlign: 'center',
                                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                                bgcolor: theme.palette.background.default,
                                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                                userSelect: 'none',
                            }}
                        >
                            {Object.entries(LanguageOptions).map(([id, name]) => (
                                <MenuItem key={id} value={id || ""}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}


export default MenuSettings;
