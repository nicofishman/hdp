import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BottomCards from 'Components/Game/BottomCards';
import { CustomDragLayer } from 'Components/Game/CustomDragLayer';
import Top from 'Components/Game/Top';
import TopCards from 'Components/Game/TopCards';
import { useParams } from 'react-router-dom';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import MyAlert from 'Components/Common/MyAlert';
import SpinningWheel from 'Components/Common/SpinningWheel';
import { Text } from 'Languages/Text';
import Typography from '@mui/material/Typography';
import { onSnapshot, doc } from 'firebase/firestore';

function Game() {
    const { gameId } = useParams();
    const { getGameById, addPlayerToGame, db } = useFirebaseDatabaseContext();

    const [loading, setLoading] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [gameNotFound, setGameNotFound] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({});
    const { auth } = useFirebaseAuthContext();

    const [blackCardTop, setBlackCardTop] = useState({});
    const [game, setGame] = useState({});
    const [playerCards, setPlayerCards] = useState([]);

    useEffect(() => {
        console.log('USEEEEE');
        getGameById(gameId)
            .then(g => {
                if (!g) {
                    setGameNotFound(true);
                    setLoading(false);
                    return;
                }
                setGame(g);
                const sentCardsId = g.sentCards.map(c => c.user);
                setHasSubmitted(sentCardsId.includes(auth.currentUser.uid));
                const playersId = g.players.map(p => p.id);
                if (!playersId.includes(auth.currentUser.uid)) {
                    addPlayerToGame(gameId, auth.currentUser, g).then(() => {
                        setBlackCardTop(g.currentBlackCard);
                        const player = g.players.filter(p => p.id === auth.currentUser.uid)[0];
                        setCurrentPlayer(player);
                        setLoading(false);
                    });
                } else {
                    setBlackCardTop(g.currentBlackCard);
                    const player = g.players.filter(p => p.id === auth.currentUser.uid)[0];
                    setCurrentPlayer(player);
                    setPlayerCards(player.cards);
                    setLoading(false);
                }
            });
        onSnapshot(doc(db, `Games/${gameId}`), (snapshot) => {
            setLoading(true);
            const g = snapshot.data();
            setGame(g);
            const sentCardsId = g.sentCards.map(c => c.user);
            setHasSubmitted(sentCardsId.includes(auth.currentUser.uid));
            setLoading(false);
        });
    }, []);

    console.log('hasSubmitted', hasSubmitted);
    console.log('id', auth.currentUser.uid, game.sentCards);
    return (
        <>
            {!gameNotFound ?
                (!loading ?
                    !(currentPlayer.isHdp) ?
                        <Box
                            sx={{
                                margin: '2% auto',
                            }}
                        >
                            <Top currentUser={auth.currentUser} gameId={gameId}></Top>
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

                                {!hasSubmitted ?
                                    <>
                                        <BottomCards playerCardsFire={playerCards} blackCardTopFire={blackCardTop} />
                                        <CustomDragLayer />
                                    </> :
                                    <Typography>SUBMITTED</Typography>
                                }
                            </Box>
                        </Box> :
                        <Box
                            sx={{
                                margin: '2% auto',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexWrpa: 'wrap',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <TopCards blackCardTopFire={blackCardTop} isHdp={true} />
                                <Box sx={{ mt: 3 }}>
                                    <Typography>
                                        <Text tid='waitingforcards' />
                                        {`: ${game.sentCards.length} / ${game.players.length - 1}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box> :
                    <SpinningWheel />
                ) :
                <MyAlert severity='error' text='gamenotfound' />
            }
        </>
    );
}

export default Game;
