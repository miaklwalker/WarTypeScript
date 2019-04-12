let children: HTMLCollection,
    newDiv: HTMLDivElement,
    drawn = false,
    gameSpace = document.getElementById('cardSpace') as HTMLDivElement,
    gameCache = gameSpace as HTMLDivElement,
    clickHandler:void;

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
const _cardCache: cacheType = {
  hearts: ["🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾", "🂱"],
  spades: ["🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮", "🂡"],
  diamonds: ["🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎", "🃁"],
  clubs: ["🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞", "🃑"],
  suit: ["Hearts", "Spades", "Diamonds", "Clubs"],
  face: ["Jack", "Queen", "King", "Ace"],
}
let suitImg: string[][] = [_cardCache.hearts, _cardCache.spades, _cardCache.diamonds, _cardCache.clubs];
/**
 * @class
 * @name Card
 * @description - Creates Card Objects with "Suits" , "Values" , "Images"
 * @property suit - A string Containing the "SUIT" information of the card
 * @property value - A Numerical value for the Card Object
 * @property img - Contains the image used to display the card on the game screen
 */
class Card {
  suit: string;
  value: number;
  img: string;
  faceValue: string | number;
  constructor(suit: string, value: number, img: string, faceValue: string | number) {
    this.suit = suit;
    this.value = value;
    this.img = img;
    this.faceValue = faceValue;
  }
  /**
   * @method cardInfo - Returns " 'Card' of 'Suit' " where card is faceValue.
   */
  cardInfo() {
    return `${this.faceValue} of ${this.suit}`
  }

}

class Deck {
  deck: Card[];
  drawn: Card[];
  cardsRemaining: number;
  constructor() {
    this.deck = [] as Card[];
    this.drawn = [];
    this.cardsRemaining = 52;
  }
  createDeck(num: number = 1) {
    this.deck = [];
    let card: Card;
    for (let i = 0; i < num; i++) {
      for (let i = 0; i < _cardCache.suit.length; i++) {
        for (let j = 2; j < 15; j++) {
          if (j > 10) {
            card = new Card(_cardCache.suit[i], j, suitImg[i][j - 2], _cardCache.face[j - 11]);
            this.deck.push((card));
          } else {
            card = new Card(_cardCache.suit[i], j, suitImg[i][j - 2], j);
            this.deck.push((card));
          }
        }
      }
    }
  }
  shuffleDeck() {

    let m = this.deck.length,
      t: Card, i;

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
  dealCards(num: number, playerName: Players) {
    let dealtCards = [] as Card[];
    for (let j = 0; j < num; j++) {
      let dealtCard = this.deck.pop() as Card;
      dealtCards.push(dealtCard);
      this.cardsRemaining--
    }
    playerName.playerPile = dealtCards;
  }
}

class Players {
  playerPile: Card[];
  playerSpare: Card[];
  playerCard: Card[];
  constructor() {
    this.playerPile = [];
    this.playerSpare = [];
    this.playerCard = [];
  }
  grabCard() {
    let drawnCard = this.playerPile.pop() as Card;
    this.playerCard.push(drawnCard);
  }
}

let gameDeck: Deck = new Deck();
function shuffler(deck: Deck, shufCount: number) {
  for (let i = 0; i < shufCount; i++) {
    deck.shuffleDeck()
  }
}

function styleCard(index: number) {
  if (gameDeck.deck[index].suit === "Hearts" || gameDeck.deck[index].suit === "Diamonds") {
    newDiv.style.color = "darkRed";
  } else {
    newDiv.style.color = "black";
  }
}

function makeDiv(num: number = 52) {
  for (let i = 0; i < num; i++) {
    newDiv = document.createElement("div");
    styleCard(i);
    gameCache.appendChild(newDiv);
  }
}

function show() {
  if (!drawn) {
    for (let i = 0; i < gameDeck.deck.length; i++) {
      children = gameCache.children as HTMLCollection;
      children[i].innerHTML = `${gameDeck.deck[i].img}`;
    }
    let drawn = true;
  } 
  }



