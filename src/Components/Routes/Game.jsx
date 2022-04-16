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
import BottomSentCards from 'Components/Game/BottomSentCards';
import { useGame } from 'Context/GameContext';

function Game() {
    const { gameId } = useParams();
    const { db } = useFirebaseDatabaseContext();
    const { currentGame, setCurrentGame, bottomSentCards, setBottomSentCards } = useGame();

    const [loading, setLoading] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [gameNotFound, setGameNotFound] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [playerNotInGame, setPlayerNotInGame] = useState(false);
    const { auth } = useFirebaseAuthContext();

    const [blackCardTop, setBlackCardTop] = useState({});
    const [playerCards, setPlayerCards] = useState([]);

    useEffect(() => {
        console.log('bottom', bottomSentCards);
    }, [bottomSentCards]);

    useEffect(() => {
        setLoading(true);
        onSnapshot(doc(db, `Games/${gameId}`), (snapshot) => {
            setLoading(true);
            const g = snapshot.data();
            setCurrentGame(g);
            const sentCardsId = g.sentCards.map(c => c.user);
            setHasSubmitted(sentCardsId.includes(auth.currentUser.uid));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        if (!currentGame) {
            if (loading) return;

            setGameNotFound(true);
            setLoading(false);
            return;
        }
        const playersId = currentGame.players.map(p => p.id);
        if (!playersId.includes(auth.currentUser.uid)) {
            setPlayerNotInGame(true);
            return;
        }
        const sentCardsId = currentGame.sentCards.map(c => c.user);
        setHasSubmitted(sentCardsId.includes(auth.currentUser.uid));
        setBlackCardTop(currentGame.currentBlackCard);
        const player = currentGame.players.filter(p => p.id === auth.currentUser.uid)[0];
        setCurrentPlayer(player);
        setPlayerCards(player.cards);
        setBottomSentCards(currentGame.sentCards);
        setLoading(false);
    }, [currentGame]);

    return (
        <>
            {!gameNotFound ?
                !playerNotInGame ?
                    (!loading ?
                        (!(currentPlayer.isHdp) ?
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
                                        currentGame.sentCards.length !== currentGame.players.length - 1 ?
                                            <>
                                                <Typography sx={{ mt: 3 }}>
                                                    <Text tid='waitingforcards' />
                                                    {`: ${currentGame.sentCards.length} / ${currentGame.players.length - 1}`}
                                                </Typography>
                                            </> :
                                            <Typography sx={{ mt: 3 }}>
                                                <Text tid='waitingforhdp' />
                                            </Typography>
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
                                    {currentGame.sentCards.length !== currentGame.players.length - 1 ?
                                        <Box sx={{ mt: 3 }}>
                                            <Typography>
                                                <Text tid='waitingforcards' />
                                                {`: ${currentGame.sentCards.length} / ${currentGame.players.length - 1}`}
                                            </Typography>
                                        </Box> :
                                        <>
                                            <BottomSentCards cards={bottomSentCards.length > 0 ? bottomSentCards : null} />
                                            <CustomDragLayer />
                                        </>
                                    }
                                </Box>
                            </Box>
                        ) :
                        <SpinningWheel />
                    ) :
                    <MyAlert severity='error' text='playernotingame' /> :
                <MyAlert severity='error' text='gamenotfound' />
            }
        </>
    );
}

export default Game;
