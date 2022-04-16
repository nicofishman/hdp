import Box from '@mui/material/Box';
import React from 'react';
import { useThemeContext } from 'Context/ThemeContext';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as CrownIcon } from 'Common/crown_icon.svg';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';

function Players({ sx, children, game, gameId, currentUser }) {
    const { theme } = useThemeContext();
    const { removePlayer } = useFirebaseDatabaseContext();

    return (
        <Box
            sx={{
                alignItems: 'center',
                bgcolor: theme.palette.background.default,
                border: '1px solid #666',
                borderRadius: 3,
                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                display: 'flex',
                height: 90,
                justifyContent: 'center',
                maxWidth: '51vw',
                mb: 0.5,
                mr: 0.5,
                mt: 20,
                px: 1,
                py: 2,
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                width: 300,
                ...sx
            }}>
            <Stack width='100%' sx={{ borderRadius: 3 }}>
                {game.players.map((p, idx) => {
                    return (
                        <Box key={p.id}>
                            {idx !== 0 && <Divider />}
                            <Box sx={{
                                bgcolor: p.id === currentUser.uid && theme.palette.success.dark,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                px: 0.5,
                                my: 0.5,
                                borderRadius: 1.5,
                            }}>
                                <Typography>
                                    {p.displayName}
                                </Typography>
                                <Box>
                                    {p.id === game.owner &&
                                        <Box
                                            component={CrownIcon}
                                            sx={{
                                                transform: 'translateY(0.25em)',
                                                fill: '#BF913B',
                                                stroke: '#523d17',
                                                strokeWidth: '0.05em',
                                            }}
                                        >
                                        </Box>
                                    }
                                    {currentUser.uid === game.owner && p.id !== game.owner &&
                                        <CloseIcon
                                            fontSize="inherit"
                                            onClick={() => removePlayer(gameId, game.players[idx])}
                                            sx={{
                                                transform: 'translateX(-0.2em)',
                                                transition: 'transform 0.1s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.2) translateX(-0.15em)',
                                                    cursor: 'pointer',
                                                }
                                            }} />
                                    }
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}

export default Players;
