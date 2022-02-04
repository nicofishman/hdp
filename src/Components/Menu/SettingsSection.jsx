import Box from '@mui/material/Box';
import React from 'react';

function SettingsSection({ children, sx = {} }) {
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
                bgcolor: "white",
                color: "black",
                boxShadow: '0.2em 0.2em 0.5em #333',
                userSelect: 'none',
                ...sx
            }}>
            {children}
        </Box>
    );
}

export default SettingsSection;
