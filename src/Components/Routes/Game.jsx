import Box from '@mui/material/Box';
import BottomCards from 'Components/Game/BottomCards';
import { CustomDragLayer } from 'Components/Game/CustomDragLayer';
import Top from 'Components/Game/Top';
import TopCards from 'Components/Game/TopCards';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import CircularProgress from '@mui/material/CircularProgress';
import MyAlert from 'Components/Common/MyAlert';

function Game() {
    const { gameId } = useParams();
    const { getGameById, addPlayerToGame } = useFirebaseDatabaseContext();

    const [loading, setLoading] = useState(true);
    const [gameNotFound, setGameNotFound] = useState(false);
    const { auth } = useFirebaseAuthContext();

    const [blackCardTop, setBlackCardTop] = useState({});
    const [playerCards, setPlayerCards] = useState([]);

    useEffect(() => {
        console.log('USEEEEE');
        getGameById(gameId)
            .then(g => {
                console.log('G', g);
                if (!g) {
                    setGameNotFound(true);
                    setLoading(false);
                    return;
                }
                const playersInGame = g.players.map(p => p.id);
                if (!playersInGame.includes(auth.currentUser.uid)) {
                    addPlayerToGame(gameId, auth.currentUser, g).then(() => {
                        setBlackCardTop(g.currentBlackCard);
                        const player = g.players.filter(p => p.id === auth.currentUser.uid);
                        setPlayerCards(player[0].cards);
                        setLoading(false);
                    });
                } else {
                    console.log('playerId', auth.currentUser.uid);
                    setBlackCardTop(g.currentBlackCard);
                    const player = g.players.filter(p => p.id === auth.currentUser.uid);
                    setPlayerCards(player[0].cards);
                    setLoading(false);
                }
            });
    }, []);

    return (
        <>
            {!gameNotFound ?
                (!loading ?
                    <Box
                        sx={{
                            margin: '2% auto',
                        }}
                    >
                        <Top></Top>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrpa: 'wrap',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <TopCards blackCardTopFire={blackCardTop} />
                            <BottomCards playerCardsFire={playerCards} blackCardTopFire={blackCardTop} />
                            <CustomDragLayer />
                        </Box>
                    </Box> :
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CircularProgress color='primary' />
                    </Box>
                ) :
                <MyAlert severity='error' text='gamenotfound' />
            }
        </>
    );
}

export default Game;
