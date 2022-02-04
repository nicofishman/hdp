import React from 'react';
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

function MenuSettings() {
    const { userLanguage, userLanguageChange } = useLanguageContext();
    const handleLanguageChange = e => userLanguageChange(e.target.value);

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
                direction={'column'}
            >
                <Grid container item direction={'row'} justifyContent={'center'}>
                    <Link to='/' style={{ justifyContent: 'center', textDecoration: 'none' }}>
                        <SettingsSection sx={{
                            height: 40,
                            "&:hover .settings": {
                                transform: 'translateX(-2px)',
                            }
                        }}>
                            <ArrowBackIcon className='settings' sx={{ mr: 'auto', ml: 2, transition: 'transform 0.2s ease' }} />
                            <Typography sx={{ justifyContent: 'center', flex: 1, fontSize: 25, mr: 4 }}><Text tid="ajustes" /></Typography>
                        </SettingsSection>
                    </Link>
                </Grid>
                <Grid container item justifyContent={'center'} alignItems={'center'}>
                    <SettingsSection>
                        <Grid item><LightModeIcon fontSize='large' /></Grid>
                        <Grid item><Switch color='primary' /></Grid>
                        <Grid item><DarkModeIcon fontSize='large' /></Grid>
                    </SettingsSection>
                </Grid>
                <Grid container item justifyContent={'center'}>
                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Select
                            startAdornment={<LanguageIcon sx={{ color: grey[800], }} />}
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
                                maxWidth: '58%',
                                border: '1px solid #666',
                                borderRadius: 3,
                                padding: 1,
                                mr: 0.5,
                                mb: 0.5,
                                textAlign: 'center',
                                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                                bgcolor: "white",
                                color: "black",
                                boxShadow: '0.2em 0.2em 0.5em #333',
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
        </>
    );
}


export default MenuSettings;
