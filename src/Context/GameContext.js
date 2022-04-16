import React, { useEffect, useState, useContext, createContext, useCallback, useMemo } from 'react';
import consts from '../utils/consts';
import { useLanguageContext } from './LanguageContext';
import { useFirebaseDatabaseContext } from 'Context/Firebase.databaseContext';
import { initializeGame } from 'utils/initalizeGame';

const GameContext = createContext(undefined);

//  Mezclar cartas

export function GameProvider(props) {
    // Estado de la alerta por no poner todas las cartas
    const [wrongAmoutCards, setWrongAmoutCards] = useState(false);
    const { submitCards } = useFirebaseDatabaseContext();
    const [currentGame, setCurrentGame] = useState(undefined);

    const { userLanguage } = useLanguageContext();
    const [whiteCardsInit, blackCardsInit] = initializeGame(userLanguage); // Se inicializan las cartas
    const [whiteCards, setWhiteCards] = useState(whiteCardsInit);
    const [playerCards, setPlayerCards] = useState(() => { // Se inicializan las cartas del jugador
        const whiteCardsCopy = [...whiteCards];
        setWhiteCards(whiteCardsCopy.slice(consts.maxPlayerCards));
        return whiteCards.slice(0, consts.maxPlayerCards);
    });
    const [blackCards, setBlackCards] = useState(blackCardsInit);
    const [blackCardTop, setBlackCardTop] = useState(() => { // Se inicializa la carta negra
        const blackCardsCopy = [...blackCards];
        setBlackCards(blackCardsCopy.slice(1));
        return blackCards[0];
    });
    const [whiteTopCards, setWhiteTopCards] = useState([]); // Se inicializan las cartas blancas de arriba
    const [bottomSentCards, setBottomSentCards] = useState([]);

    const updateWhiteTopCards = useCallback((item) => { // Funcion para agregarle una carta blanca a las cartas de arriba
        const topWhiteCards = playerCards.filter(card => card.id === item.id);
        const chosenCard = item;
        const newTopCards = currentGame.sentCards.length > 0 ? [chosenCard] : [...whiteTopCards, ...topWhiteCards];
        setWhiteTopCards((whiteTopCards) => newTopCards);
    }, [currentGame, whiteTopCards]);

    const submit = (currentUser, gameId) => {
        // Si la cantidad de cartas no es la indicada, tira una alerta
        if (whiteTopCards.length !== blackCardTop.pick) {
            if (wrongAmoutCards) {
                return;
            } else {
                setWrongAmoutCards(true);
                setTimeout(() => { //  Se borra la alerta después de 5 segundos
                    setWrongAmoutCards(false);
                }, 5000);
            }
            return;
        }
        submitCards(gameId, currentUser, whiteTopCards);

        /*
        * NUEVA RONDA
        ? Si el jugador tiene 3 cartas o menos abajo, se le rellenan con las cartas del mazo
        if (playerCards.length <= 3) {
            ? Genera el nuevo array de cartas
            const newPlayerCards = [...playerCards, ...whiteCards.slice(0, consts.maxPlayerCards - playerCards.length)];
            ? Se quita las cartas del mazo
            setWhiteCards(whiteCards.slice(consts.maxPlayerCards));
            ? Se actualiza el estado de las cartas del jugador
            setPlayerCards(newPlayerCards);
        }
        ? Se actualiza el mazo negro dejando afuera la carta que fue usada
        setBlackCards(blackCards.slice(1));
        ? Se pone una carta negra nueva
        setBlackCardTop(blackCards[1]);
        ? Se borran las cartas blancas de arriba
        setWhiteTopCards([]);
        */
    };

    const undo = () => {
        // Si no hay cartas blancas que deshacer, no hace nada
        if (whiteTopCards.length === 0) {
            return;
        }
        setPlayerCards([...playerCards, whiteTopCards[whiteTopCards.length - 1]]); // Se le agrega la carta deshecha al jugador
        setWhiteTopCards(whiteTopCards.slice(0, whiteTopCards.length - 1)); // Actualiza el estado de las cartas blancas de arriba
    };

    useEffect(() => { // Cada vez que se actualizan las cartas de arriba, sacarla de las cartas del jugador
        if (!currentGame) return;
        console.log(currentGame);
        const sentCardsArray = [];
        currentGame.sentCards.forEach(myCards => {
            myCards.cards.forEach(card => {
                sentCardsArray.push(card);
            });
        });
        const whiteTopCardsId = whiteTopCards.map(card => card.id);
        const newBottomCardsArray = sentCardsArray.filter(card => !whiteTopCardsId.includes(card.id));
        if (sentCardsArray.length === 0) {
            const newPlayerCards = playerCards.filter(card => !whiteTopCardsId.includes(card.id));
            setPlayerCards(newPlayerCards);
        } else {
            console.log(sentCardsArray.filter(card => !whiteTopCardsId.includes(card.id)));
            const newSentCards = currentGame.sentCards.filter(user => user.cards.some(card => newBottomCardsArray.some(cardArray => cardArray.id === card.id)));
            setBottomSentCards(newSentCards);
        }
    }, [whiteTopCards]);

    const value = useMemo(() => ({
        updateWhiteTopCards,
        whiteTopCards,
        setWhiteTopCards,
        blackCardTop,
        setBlackCardTop,
        playerCards,
        setPlayerCards,
        undo,
        submit,
        wrongAmoutCards,
        setWrongAmoutCards,
        currentGame,
        setCurrentGame,
        bottomSentCards,
        setBottomSentCards,
    }), [currentGame, whiteTopCards, blackCardTop, playerCards, bottomSentCards]);

    return <GameContext.Provider value={value} {...props} />;
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
