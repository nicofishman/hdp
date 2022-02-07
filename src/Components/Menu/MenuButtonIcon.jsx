import Box from '@mui/material/Box';
import React from 'react';
import { useThemeContext } from 'Context/ThemeContext';

function MenuButtonIcon({ children, sx = {} }) {
    const { theme } = useThemeContext();
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 90,
            height: 90,
            maxWidth: '50vw',
            maxHeight: '50vw',
            borderRadius: 5,
            boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
            mr: 0.5,
            border: '1px solid #666',
            "&:hover": {
                cursor: 'pointer',
            },
            ...sx
        }}>
            {children}
        </Box>
    );
}

export default MenuButtonIcon;
