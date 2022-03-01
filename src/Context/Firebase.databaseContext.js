import React, { createContext, useContext, useMemo } from 'react';
import { FirebaseApp } from '../Firebase/FirebaseApp';
import { getFirestore, doc, getDoc, setDoc, collection, where, query, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import consts from '../utils/consts';
import { generateShortCode } from 'utils/lobby.utils';

const FirebaseDatabaseContext = createContext(undefined);

export function FirebaseDatabaseProvider({ children }) {
    const navigate = useNavigate();
    const { initializeGame } = useGame();
    const firebaseApp = FirebaseApp;
    const db = getFirestore(firebaseApp);
    const gamesRef = collection(db, 'Games');

    const createGame = async (currentUser) => {
        const newGameRef = doc(gamesRef);
        const lang = window.localStorage.getItem('rcml-lang');
        let [whiteCards, blackCards] = initializeGame(lang);
        const playerCards = whiteCards.slice(0, consts.maxPlayerCards);
        whiteCards = whiteCards.slice(consts.maxPlayerCards);
        const currentBlackCard = blackCards.pop();
        let shortCode = generateShortCode();
        const shortCodeList = await getShortCodes().then((shortCodes) => { console.log(shortCodes); return shortCodes; });
        while (shortCodeList.includes(shortCode)) {
            shortCode = generateShortCode();
        }
        const newGameData = {
            players: [{
                id: currentUser.uid,
                isHdp: false,
                cards: playerCards,
                points: 0,
            }],
            // whiteCards: whiteCards,
            // blackCards: blackCards,
            cardsUsed: [currentBlackCard.id, ...playerCards.map(card => card.id)],
            currentRound: 1, // Para poner el currentHDP se hace //? players[currentRound % players.length].isHdp = true
            currentBlackCard: currentBlackCard,
            owner: currentUser.uid,
            isStarted: false,
            sentCards: [],
            lang,
            shortCode: shortCode
        };
        await setDoc(newGameRef, newGameData)
            .then(() => {
                console.log('GAME CREATED', newGameRef.id);
                navigate(`game/${newGameRef.id}`);
            });
    };

    const addPlayerToGame = async (gameId, currentUser, g) => {
        const gameRef = doc(gamesRef, gameId);
        const [whiteCards, _] = initializeGame(g.lang);
        const playerCards = newPlayerCards(whiteCards, g.cardsUsed);
        await updateDoc(gameRef, {
            players: arrayUnion({
                id: currentUser.uid,
                isHdp: false,
                cards: playerCards,
                points: 0,
            })
        });
    };

    const getGameById = async (gameId) => {
        const gamesRef = doc(db, `Games/${gameId}`);
        const gameSnap = await getDoc(gamesRef);
        return gameSnap.data();
    };

    const getUserById = async (userId) => {
        console.log('NOT IMPLEMENTED YET');
    };

    const getShortCodes = async () => {
        const gamesSnap = await getDocs(gamesRef);
        const shortCodesList = gamesSnap.docs.map(game => game.data().shortCode);
        return shortCodesList;
    };

    const getGameByShortCode = async (shortCode) => {
        console.log(shortCode.toUpperCase());
        const docs = [];
        const q = query(gamesRef, where('shortCode', '==', shortCode.toUpperCase()));
        const querySnapshot = await getDocs(q);
        console.log('query ejecutada', querySnapshot);
        querySnapshot.forEach((doc) => {
            docs.push(doc);
        });
        if (docs.length === 0) {
            return null;
        }
        return docs[0].id;
    };

    const newPlayerCards = (whiteCards, cardsUsed) => {
        const newCards = [];
        while (newCards.length < consts.maxPlayerCards && whiteCards.length > 0) {
            const candidateCard = whiteCards.pop();
            if (!cardsUsed.includes(candidateCard.id)) {
                newCards.push(candidateCard);
            }
        }
        return newCards;
    };

    const setUser = async (user) => {
        console.log('dbdbdbdbdbdbbd', user.uid);
        await setDoc(doc(db, `Users/${user.uid}`), { username: user.displayName });
    };

    const value = useMemo(() => {
        return ({
            getGameById,
            setUserDB: setUser,
            createGame,
            getGameByShortCode,
            addPlayerToGame
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
