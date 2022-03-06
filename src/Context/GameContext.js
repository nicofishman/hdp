import React, { useEffect, useState, useContext, useMemo, createContext } from 'react';
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

    const updateWhiteTopCards = (item) => { // Funcion para agregarle una carta blanca a las cartas de arriba
        const topWhiteCards = playerCards.filter(card => card.id === item.id);
        setWhiteTopCards((whiteTopCards) => [...whiteTopCards, ...topWhiteCards]);
    };

    useEffect(() => { // Cada vez que se actualizan las cartas de arriba, sacarla de las cartas del jugador
        setPlayerCards(playerCards.filter(card => !whiteTopCards.includes(card)));
    }, [whiteTopCards]);

    const value = useMemo(() => {
        return ({
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
        });
    }, [whiteTopCards, blackCardTop, playerCards, wrongAmoutCards]);

    return <GameContext.Provider value={value} {...props} />;
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
