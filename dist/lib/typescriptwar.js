"use strict";
let children, newDiv, drawn = false, gameSpace = document.getElementById('cardSpace'), gameCache = gameSpace, clickHandler;
const _cardCache = {
    hearts: ["🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾", "🂱"],
    spades: ["🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮", "🂡"],
    diamonds: ["🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎", "🃁"],
    clubs: ["🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞", "🃑"],
    suit: ["Hearts", "Spades", "Diamonds", "Clubs"],
    face: ["Jack", "Queen", "King", "Ace"],
};
let suitImg = [_cardCache.hearts, _cardCache.spades, _cardCache.diamonds, _cardCache.clubs];
/**
 * @class
 * @name Card
 * @description - Creates Card Objects with "Suits" , "Values" , "Images"
 * @property suit - A string Containing the "SUIT" information of the card
 * @property value - A Numerical value for the Card Object
 * @property img - Contains the image used to display the card on the game screen
 */
class Card {
    constructor(suit, value, img, faceValue) {
        this.suit = suit;
        this.value = value;
        this.img = img;
        this.faceValue = faceValue;
    }
    /**
     * @method cardInfo - Returns " 'Card' of 'Suit' " where card is faceValue.
     */
    cardInfo() {
        return `${this.faceValue} of ${this.suit}`;
    }
}
class Deck {
    constructor() {
        this.deck = [];
        this.drawn = [];
        this.cardsRemaining = 52;
    }
    createDeck(num = 1) {
        this.deck = [];
        let card;
        for (let i = 0; i < num; i++) {
            for (let i = 0; i < _cardCache.suit.length; i++) {
                for (let j = 2; j < 15; j++) {
                    if (j > 10) {
                        card = new Card(_cardCache.suit[i], j, suitImg[i][j - 2], _cardCache.face[j - 11]);
                        this.deck.push((card));
                    }
                    else {
                        card = new Card(_cardCache.suit[i], j, suitImg[i][j - 2], j);
                        this.deck.push((card));
                    }
                }
            }
        }
    }
    shuffleDeck() {
        let m = this.deck.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
        }
        return this.deck;
    }
    /**
     * @method dealCards
     * @param num - Number of Cards to Deal
     * @param playerName -Player to Deal cards to.
     */
    dealCards(num, playerName) {
        let dealtCards = [];
        for (let j = 0; j < num; j++) {
            let dealtCard = this.deck.pop();
            dealtCards.push(dealtCard);
            this.cardsRemaining--;
        }
        playerName.playerPile = dealtCards;
    }
}
class Players {
    constructor() {
        this.playerPile = [];
        this.playerSpare = [];
        this.playerCard = [];
    }
    grabCard() {
        let drawnCard = this.playerPile.pop();
        this.playerCard.push(drawnCard);
    }
}
let gameDeck = new Deck();
function shuffler(deck, shufCount) {
    for (let i = 0; i < shufCount; i++) {
        deck.shuffleDeck();
    }
}
function styleCard(index) {
    if (gameDeck.deck[index].suit === "Hearts" || gameDeck.deck[index].suit === "Diamonds") {
        newDiv.style.color = "darkRed";
    }
    else {
        newDiv.style.color = "black";
    }
}
function makeDiv(num = 52) {
    for (let i = 0; i < num; i++) {
        newDiv = document.createElement("div");
        styleCard(i);
        gameCache.appendChild(newDiv);
    }
}
function show() {
    if (!drawn) {
        for (let i = 0; i < gameDeck.deck.length; i++) {
            children = gameCache.children;
            children[i].innerHTML = `${gameDeck.deck[i].img}`;
        }
        let drawn = true;
    }
}
//# sourceMappingURL=typescriptwar.js.map