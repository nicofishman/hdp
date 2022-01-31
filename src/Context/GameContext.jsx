import React, { useEffect, useState, useContext, useMemo } from 'react';
import cartas from '../Cartas/cartas.json';
import consts from '../utils/consts';


const GameContext = React.createContext();

function getCardsShuffled() {
    return cartas.cartas.sort((a, b) => 0.5 - Math.random());
}


function initializeGame() {
    const whiteCards = [];
    const blackCards = [];
    getCardsShuffled().map(card => {
        return card.color === 'White' ? whiteCards.push(card) : card.color === 'Black' ? blackCards.push(card) : null;
    });
    // console.log(whiteCards);
    return [whiteCards, blackCards];
}

export function GameProvider(props) {
    const newRound = () => {
        if (whiteTopCards.length !== blackCardTop.chances) {
            alert('Por favor ponga todas las cartas en la mesa');
            return
        }
        if (playerCards.length <= 3) {
            const newPlayerCards = [...playerCards, ...whiteCards.slice(0, consts.maxPlayerCards - playerCards.length)];
            setWhiteCards(whiteCards.slice(consts.maxPlayerCards));
            setPlayerCard(newPlayerCards);
            console.log('zzzz', whiteCards.length)
        }
        setBlackCards(blackCards.slice(1));
        setBlackCardTop(blackCards[1]);
        setWhiteTopCards([]);
        // console.log(whiteCards.slice(6, whiteCards.length - 1))
    }

    const undo = () => {
        if (whiteTopCards.length === 0) {
            return
        }
        setPlayerCard([...playerCards, whiteTopCards[whiteTopCards.length - 1]]);
        setWhiteTopCards(whiteTopCards.slice(0, whiteTopCards.length - 1));
    }

    const [whiteCardsInit, blackCardsInit] = initializeGame();
    const [whiteCards, setWhiteCards] = useState(whiteCardsInit);
    console.log(whiteCards);
    const [playerCards, setPlayerCard] = useState(() => {
        const whiteCardsCopy = [...whiteCards];
        setWhiteCards(whiteCardsCopy.slice(consts.maxPlayerCards));
        return whiteCards.slice(0, consts.maxPlayerCards);
    });
    const [blackCards, setBlackCards] = useState(blackCardsInit);
    const [blackCardTop, setBlackCardTop] = useState(() => {
        const blackCardsCopy = [...blackCards];
        setBlackCards(blackCardsCopy.slice(1));
        return blackCards[0];
    });
    const [whiteTopCards, setWhiteTopCards] = useState([]);
    const updateWhiteTopCards = (item) => {
        const topWhiteCards = playerCards.filter(card => card.id === item.id);
        setWhiteTopCards((whiteTopCards) => [...whiteTopCards, ...topWhiteCards]);
    }

    useEffect(() => {
        setPlayerCard(playerCards.filter(card => !whiteTopCards.includes(card)));
    }, [whiteTopCards]);

    const value = useMemo(() => {
        return ({
            updateWhiteTopCards,
            whiteTopCards,
            blackCardTop,
            playerCards,
            undo,
            newRound,
        })
    }, [whiteTopCards, blackCardTop, playerCards]);

    return <GameContext.Provider value={value} {...props} />
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

