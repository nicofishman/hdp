import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import Box from '@mui/material/Box';
import SpinningWheel from 'Components/Common/SpinningWheel';
import { onSnapshot, doc } from 'firebase/firestore';
import Players from 'Components/Lobby/Players';
import MyAlert from 'Components/Common/MyAlert';
import momorisa from 'Common/momorisa.gif';
import CodePanel from 'Components/Lobby/CodePanel';
import StartButton from 'Components/Lobby/StartButton';

function Lobby() {
    const { db } = useFirebaseDatabaseContext();
    const navigate = useNavigate();
    const { auth } = useFirebaseAuthContext();
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState({});
    const [playerNotInGame, setPlayerNotInGame] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const currentUser = auth.currentUser;

    useEffect(() => {

        if (!auth.currentUser) return;
        onSnapshot(doc(db, `Games/${gameId}`), (snapshot) => {
            setGame(snapshot.data());
            const playersIdArray = snapshot.data().players.map(p => p.id);
            if (!playersIdArray.includes(currentUser.uid)) {
                setPlayerNotInGame(true);
            } else {
                setGameStarted(snapshot.data().isStarted);
                if (snapshot.data().isStarted) {
                    navigate(`/game/${gameId}`);
                }
            }
            setLoading(false);
        });
    }, [currentUser]);

    return (
        <>
            {!playerNotInGame ?
                !gameStarted ?
                    !loading ?
                        (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    alignContent: 'space-around',
                                    height: '100vh',
                                }}
                            >
                                <Players game={game} gameId={gameId} currentUser={currentUser} sx={{ height: `${game.players.length * 2.375}rem` }} />
                                {auth.currentUser.uid === game.owner && <StartButton gameId={gameId} />}
                                <CodePanel code={game.shortCode} showCode={showCode} setShowCode={setShowCode} />
                            </Box>
                        ) :
                        <SpinningWheel /> :
                    <MyAlert text='gamealreadystarted' severity='warning' /> :
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
