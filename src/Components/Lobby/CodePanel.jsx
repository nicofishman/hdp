import React from 'react';
import Box from '@mui/material/Box';
import { useThemeContext } from 'Context/ThemeContext';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Text } from 'Languages/Text';

function CodePanel({ code, showCode, setShowCode }) {
    const { theme } = useThemeContext();
    console.log('code', code.length);
    return (
        <Box
            sx={{
                alignItems: 'center',
                bgcolor: theme.palette.background.default,
                border: '1px solid #666',
                borderRadius: 3,
                bottom: 10,
                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                display: 'flex',
                flexDirection: 'column',
                height: 90,
                justifyContent: 'center',
                maxWidth: '51vw',
                mb: 0.5,
                mr: 0.5,
                padding: 1,
                position: 'absolute',
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                width: 300,
            }}>
            <Typography sx={{ fontSize: 25 }}><Text tid='code'></Text></Typography>
            <Box sx={{ display: 'flex' }}>
                {!showCode ?
                    <>
                        <Typography sx={{ fontSize: 20 }}>{'●'.repeat(code.length)}</Typography>
                        <Visibility onClick={() => setShowCode(!showCode)} sx={{ ml: 1, mt: 0.7, '&:hover': { cursor: 'pointer' } }} />
                    </> :
                    <>
                        <Typography sx={{ fontSize: 24 }}>{code}</Typography>
                        <VisibilityOff onClick={() => setShowCode(!showCode)} sx={{ ml: 1, mt: 0.9, '&:hover': { cursor: 'pointer' } }} />
                    </>
                }
            </Box>
        </Box >
    );
}

export default CodePanel;
