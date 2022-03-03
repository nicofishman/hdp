import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Text } from 'Languages/Text';
import { useThemeContext } from 'Context/ThemeContext';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';

function StartButton({ gameId }) {
    const { theme } = useThemeContext();
    const { startGame } = useFirebaseDatabaseContext();
    return (
        <Box
            onClick={() => startGame(gameId)}
            sx={{
                alignItems: 'center',
                bgcolor: theme.palette.background.default,
                border: '1px solid #666',
                borderRadius: 3,
                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                display: 'flex',
                height: 45,
                justifyContent: 'center',
                maxWidth: '51vw',
                mb: 0.5,
                mr: 0.5,
                padding: 1,
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                width: 300,
                '&:hover': {
                    cursor: 'pointer',
                },
            }}>
            <Typography><Text tid='startgame' /></Typography>
        </Box>
    );
}

export default StartButton;
