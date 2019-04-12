declare let children: HTMLCollection, newDiv: HTMLDivElement, drawn: boolean, gameSpace: HTMLDivElement, gameCache: HTMLDivElement, clickHandler: void;
/**
 * @interface cacheType
 * @description - An Object that Stores all of the card Properties such as "Suit e.g.'Diamonds'"
 * and all of the card images!
 *
 */
interface cacheType {
    hearts: string[];
    spades: string[];
    diamonds: string[];
    clubs: string[];
    suit: string[];
    face: string[];
}
declare const _cardCache: cacheType;
declare let suitImg: string[][];
/**
 * @class
 * @name Card
 * @description - Creates Card Objects with "Suits" , "Values" , "Images"
 * @property suit - A string Containing the "SUIT" information of the card
 * @property value - A Numerical value for the Card Object
 * @property img - Contains the image used to display the card on the game screen
 */
declare class Card {
    suit: string;
    value: number;
    img: string;
    faceValue: string | number;
    constructor(suit: string, value: number, img: string, faceValue: string | number);
    /**
     * @method cardInfo - Returns " 'Card' of 'Suit' " where card is faceValue.
     */
    cardInfo(): string;
}
declare class Deck {
    deck: Card[];
    drawn: Card[];
    cardsRemaining: number;
    constructor();
    createDeck(num?: number): void;
    shuffleDeck(): Card[];
    /**
     * @method dealCards
     * @param num - Number of Cards to Deal
     * @param playerName -Player to Deal cards to.
     */
    dealCards(num: number, playerName: Players): void;
}
declare class Players {
    playerPile: Card[];
    playerSpare: Card[];
    playerCard: Card[];
    constructor();
    grabCard(): void;
}
declare let gameDeck: Deck;
declare function shuffler(deck: Deck, shufCount: number): void;
declare function styleCard(index: number): void;
declare function makeDiv(num?: number): void;
declare function show(): void;
