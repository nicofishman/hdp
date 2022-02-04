import Box from '@mui/material/Box';
import React from 'react';

function MenuButtonIcon({ children, sx = {} }) {
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
            boxShadow: '0.2em 0.2em 0.5em #333',
            mr: 0.5,
            border: '1px solid #666',
            "&:hover": {
                cursor: 'pointer',
            },
        }}>
            {children}
        </Box>
    );
}

export default MenuButtonIcon;
