import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function SpinningWheel() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
        }}>
            <CircularProgress color='primary' />
        </Box>
    );
}

export default SpinningWheel;
