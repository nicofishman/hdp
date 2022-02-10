import React, { useEffect, useState, useContext, useMemo, createContext } from 'react';
import cartas_en from '../Cartas/cartas_en.json';
import cartas_es from '../Cartas/cartas_es.json';
import consts from '../utils/consts';
import { useLanguageContext } from './LanguageContext';


const GameContext = createContext(undefined);

//Mezclar cartas
function getCardsShuffled(array) {
    return array.sort((a, b) => 0.5 - Math.random());
}

//Inicia el juego: genera los mazos negro y blanco
function initializeGame(lang) {
    console.log('lang', lang)
    const cartas = lang === 'es' ? cartas_es : lang === 'en' ? cartas_en : undefined
    const whiteCards = getCardsShuffled(cartas.whiteCards);
    const blackCards = getCardsShuffled(cartas.blackCards);
    // getCardsShuffled().map(card => {
    //     return card.color === 'White' ? whiteCards.push(card) : card.color === 'Black' ? blackCards.push(card) : null;
    // });
    // console.log(whiteCards);
    return [whiteCards, blackCards];
}

export function GameProvider(props) {
    //Estado de la alerta por no poner todas las cartas
    const [alertFade, setAlertFade] = useState(false);

    const submit = () => {
        //Si la cantidad de cartas no es la indicada, tira una alerta
        if (whiteTopCards.length !== blackCardTop.pick) {
            if (alertFade) {
                return
            } else {
                setAlertFade(true);
                setTimeout(() => { //Se borra la alerta después de 5 segundos
                    setAlertFade(false);
                }, 5000);
            }
            return
        }
        //Si el jugador tiene 3 cartas o menos abajo, se le rellenan con las cartas del mazo 
        if (playerCards.length <= 3) {
            const newPlayerCards = [...playerCards, ...whiteCards.slice(0, consts.maxPlayerCards - playerCards.length)]; //Genera el nuevo array de cartas
            setWhiteCards(whiteCards.slice(consts.maxPlayerCards)); //Se quita las cartas del mazo
            setPlayerCards(newPlayerCards); //Se actualiza el estado de las cartas del jugador
        }
        setBlackCards(blackCards.slice(1)); //Se actualiza el mazo negro dejando afuera la carta que fue usada
        setBlackCardTop(blackCards[1]); //Se pone una carta negra nueva
        setWhiteTopCards([]); //Se borran las cartas blancas de arriba
    }

    const undo = () => {
        //Si no hay cartas blancas que deshacer, no hace nada
        if (whiteTopCards.length === 0) {
            return
        }
        setPlayerCards([...playerCards, whiteTopCards[whiteTopCards.length - 1]]); //Se le agrega la carta deshecha al jugador
        setWhiteTopCards(whiteTopCards.slice(0, whiteTopCards.length - 1)); //Actualiza el estado de las cartas blancas de arriba
    }

    const { userLanguage } = useLanguageContext();
    const [whiteCardsInit, blackCardsInit] = initializeGame(userLanguage); //Se inicializan las cartas
    const [whiteCards, setWhiteCards] = useState(whiteCardsInit);
    const [playerCards, setPlayerCards] = useState(() => { //Se inicializan las cartas del jugador
        const whiteCardsCopy = [...whiteCards];
        setWhiteCards(whiteCardsCopy.slice(consts.maxPlayerCards));
        return whiteCards.slice(0, consts.maxPlayerCards);
    });
    const [blackCards, setBlackCards] = useState(blackCardsInit);
    const [blackCardTop, setBlackCardTop] = useState(() => { //Se inicializa la carta negra
        const blackCardsCopy = [...blackCards];
        setBlackCards(blackCardsCopy.slice(1));
        return blackCards[0];
    });
    const [whiteTopCards, setWhiteTopCards] = useState([]); //Se inicializan las cartas blancas de arriba

    const updateWhiteTopCards = (item) => { //Funcion para agregarle una carta blanca a las cartas de arriba
        const topWhiteCards = playerCards.filter(card => card.id === item.id);
        setWhiteTopCards((whiteTopCards) => [...whiteTopCards, ...topWhiteCards]);
    }

    useEffect(() => { //Cada vez que se actualizan las cartas de arriba, sacarla de las cartas del jugador
        setPlayerCards(playerCards.filter(card => !whiteTopCards.includes(card)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whiteTopCards]);

    const value = useMemo(() => {
        return ({
            updateWhiteTopCards,
            whiteTopCards,
            blackCardTop,
            playerCards,
            undo,
            submit,
            alertFade,
            setAlertFade
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whiteTopCards, blackCardTop, playerCards, alertFade]);

    return <GameContext.Provider value={value} {...props} />
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

