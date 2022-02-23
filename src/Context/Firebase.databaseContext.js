import React, { createContext, useContext, useMemo } from 'react';
import { FirebaseApp } from '../Firebase/FirebaseApp';
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import consts from '../utils/consts';

const FirebaseDatabaseContext = createContext(undefined);

export function FirebaseDatabaseProvider({ children }) {
    const navigate = useNavigate();
    const { initializeGame } = useGame();
    const firebaseApp = FirebaseApp;
    const db = getFirestore(firebaseApp);

    const createGame = async (currentUser) => {
        const newGameRef = doc(collection(db, 'Games'));
        const lang = window.localStorage.getItem('rcml-lang');
        let [whiteCards, blackCards] = initializeGame(lang);
        const playerCards = whiteCards.slice(0, consts.maxPlayerCards);
        whiteCards = whiteCards.slice(consts.maxPlayerCards);
        const currentBlackCard = blackCards.pop();
        const newGameData = {
            players: [{
                id: currentUser.uid,
                isHdp: false,
                cards: playerCards
            }],
            whiteCards: whiteCards,
            blackCards: blackCards,
            currentHdp: 0,
            currentBlackCard: currentBlackCard,
            lang
        };
        await setDoc(newGameRef, newGameData)
            .then(() => {
                console.log('GAME CREATED', newGameRef.id);
                navigate(`game/${newGameRef.id}`);
            });
    };

    const getGameById = async (gameId) => {
        const gamesRef = doc(db, 'Games', gameId);
        const gameSnap = await getDoc(gamesRef);
        return gameSnap.data();
    };

    const getUserById = async (userId) => {

    };

    const setUser = async (user) => {
        setDoc(doc(db, 'Users'), user.uid, { username: user.displayName });
    };

    const value = useMemo(() => {
        return ({
            getGameById,
            setUserDB: setUser,
            createGame
        });
    }, []);
    return <FirebaseDatabaseContext.Provider value={value}>{children}</FirebaseDatabaseContext.Provider>;
}

export function useFirebaseDatabaseContext() {
    const context = useContext(FirebaseDatabaseContext);
    if (!context) {
        throw new Error('useFirebaseDatabaseContext must be used within a FirebaseDatabaseProvider');
    }
    return context;
}
