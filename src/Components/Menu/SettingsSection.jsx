import Box from '@mui/material/Box';
import React from 'react';
import { useThemeContext } from 'Context/ThemeContext';

function SettingsSection({ children, sx = {} }) {
    const { theme } = useThemeContext();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 90,
                width: 250,
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
                ...sx
            }}>
            {children}
        </Box>
    );
}

export default SettingsSection;
