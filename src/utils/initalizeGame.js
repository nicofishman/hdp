import cartasEn from '../Cartas/cartas_en.json';
import cartasEs from '../Cartas/cartas_es.json';

function getCardsShuffled(array) {
    return array.sort((a, b) => 0.5 - Math.random());
}

//  Inicia el juego: genera los mazos negro y blanco
export function initializeGame(lang) {
    const cartas = lang === 'es' ? cartasEs : lang === 'en' ? cartasEn : undefined;
    const whiteCards = getCardsShuffled(cartas.whiteCards);
    const blackCards = getCardsShuffled(cartas.blackCards);
    return [whiteCards, blackCards];
}
