import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import Box from '@mui/material/Box';
import SpinningWheel from 'Components/Common/SpinningWheel';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import Typography from '@mui/material/Typography';
import { ReactComponent as CrownIcon } from 'Common/crown_icon.svg';
import Players from 'Components/Lobby/Players';
import Stack from '@mui/material/Stack';
import { useThemeContext } from 'Context/ThemeContext';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import MyAlert from 'Components/Common/MyAlert';
import momorisa from 'Common/momorisa.gif';

function Lobby() {
    const { getGameById, removePlayer, db } = useFirebaseDatabaseContext();
    const { auth } = useFirebaseAuthContext();
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState({});
    const [playerNotInGame, setPlayerNotInGame] = useState(false);

    const { theme } = useThemeContext();

    const currentUser = auth.currentUser;

    useEffect(() => {
        console.log('currentUser', currentUser);
        if (!auth.currentUser) return;
        const unsub = onSnapshot(doc(db, `Games/${gameId}`), (snapshot) => {
            setGame(snapshot.data());
            const playersIdArray = snapshot.data().players.map(p => p.id);
            if (!playersIdArray.includes(currentUser.uid)) {
                setPlayerNotInGame(true);
            }
        });

        getGameById(gameId).then((g) => {
            setGame(g);
            const playersIdArray = g.players.map(p => p.id);
            if (!playersIdArray.includes(currentUser.uid)) {
                setPlayerNotInGame(true);
            }
            setLoading(false);
        });
    }, [currentUser]);

    return (
        <>
            {!playerNotInGame ?
                !loading ?
                    (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100vh',
                            }}
                        >
                            <Players sx={{
                                height: `${game.players.length * 2.5}rem`,
                            }}>
                                <Stack width='100%' sx={{
                                    borderRadius: 3
                                }}>
                                    {
                                        game.players.map((p, idx) => {
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
                                                            {auth.currentUser.uid === game.owner && p.id !== game.owner &&
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
                                        })
                                    }
                                </Stack>
                            </Players>
                        </Box>
                    ) :
                    <SpinningWheel /> :
                <>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}>
                        <img src={momorisa} style={{ width: '60em' }} />
                    </Box>
                    <MyAlert text='playerbanned' severity='error' />
                </>
            }
        </>
    );
}

export default Lobby;
