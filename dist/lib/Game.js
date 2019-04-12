"use strict";
//-------Dom Cache----------------
let playerBadge_div = document.getElementById('playerBadge');
let computerBadge_div = document.getElementById('computerBadge');
let playerCardName_div = document.getElementById('cardName');
let computerCardName_div = document.getElementById('compcardname');
let playerCard_div = document.getElementById('playersCard');
let computerCard_div = document.getElementById('ComputerCard');
let outcome_div = document.getElementById('outcome');
let PlayerCardsRemaining_div = document.getElementById('pcardsR');
let computerCardsRemaining_div = document.getElementById('CompR');
let instructions_div = document.getElementById('instructions');
let war_div = document.getElementById('War');
let playerBadge = playerBadge_div;
let computerBadge = computerBadge_div;
let playerCardName = playerCardName_div;
let computerCardName = computerCardName_div;
let playerCard = playerCard_div;
let computerCard = computerCard_div;
let outcome = outcome_div;
let PlayerCardsRemaining = PlayerCardsRemaining_div;
let computerCardsRemaining = computerCardsRemaining_div;
let instructions = instructions_div;
let warDom = war_div;
// <--------------------- DOM Caching Complete! ------------------------>
// <-------------Global Variables-------------------------->
let warDeck;
let player;
let computer;
let WarPile = [];
let gameOver = false;
//<-------------------------------------------------------->
function setup(playerName, opponentName = "Computer") {
    warDeck = new Deck();
    player = new Players();
    computer = new Players();
    warDeck.createDeck();
    shuffler(warDeck, 12);
    warDeck.dealCards(26, player);
    warDeck.dealCards(26, computer);
    PlayerCardsRemaining.innerHTML = `${player.playerPile.length}`;
    computerCardsRemaining.innerHTML = `${computer.playerPile.length}`;
    playerBadge.innerHTML = `${playerName}`;
    computerBadge.innerHTML = `${opponentName}`;
}
function update() {
    PlayerCardsRemaining.innerHTML = `${player.playerPile.length}`;
    computerCardsRemaining.innerHTML = `${computer.playerPile.length}`;
    warDom.innerText = "";
    endGame();
}
function playRound() {
    player.grabCard();
    computer.grabCard();
    playerCard.innerHTML = `${player.playerCard[0].img}`;
    computerCard.innerHTML = `${computer.playerCard[0].img}`;
    playerCardName.innerHTML = `${player.playerCard[0].cardInfo()}`;
    computerCardName.innerHTML = `${computer.playerCard[0].cardInfo()}`;
    checkOutcome(player.playerCard[0].value, computer.playerCard[0].value);
}
function checkOutcome(playerCardValue, computerCardValue) {
    if (playerCardValue > computerCardValue) {
        winRound();
    }
    else if (computerCardValue > playerCardValue) {
        loseRound();
    }
    else if (playerCardValue === computerCardValue) {
        warDom.innerText = "WAR!!!!";
        warRound();
    }
    ;
}
function winRound() {
    outcome.innerHTML = `Your ${player.playerCard[0].faceValue} Beats 
${computer.playerCard[0].faceValue} You Win!`;
    let playerCards = player.playerCard.splice(0, player.playerCard.length);
    let compCard = computer.playerCard.splice(0, computer.playerCard.length);
    let cards = [playerCards, compCard];
    let cardsWon = compCard.map((card) => card.cardInfo()).toString();
    instructions.innerHTML = ` You won ${cardsWon}`;
    cards.forEach((set) => {
        set.forEach((card) => {
            WarPile.unshift(card);
        });
    });
    WarPile.forEach(card => player.playerPile.unshift(card));
    update();
    WarPile = [];
}
function loseRound() {
    outcome.innerHTML = `Your ${player.playerCard[0].faceValue} loses to 
                               ${computer.playerCard[0].faceValue} You Lose!`;
    let playerCards = player.playerCard.splice(0, player.playerCard.length);
    let compCard = computer.playerCard.splice(0, computer.playerCard.length);
    let cards = [playerCards, compCard];
    let cardsLost = playerCards.map((card) => card.cardInfo()).toString();
    instructions.innerHTML = ` You Lost ${cardsLost}`;
    cards.forEach((set) => {
        set.forEach((card) => {
            WarPile.unshift(card);
        });
    });
    WarPile.forEach(card => computer.playerPile.unshift(card));
    update();
    WarPile = [];
}
function warRound() {
    let playerCards = player.playerCard.splice(0, player.playerCard.length);
    let compCard = computer.playerCard.splice(0, computer.playerCard.length);
    let cards = [playerCards, compCard];
    cards.forEach((set) => {
        set.forEach((card) => {
            WarPile.unshift(card);
        });
    });
    for (let i = 0; i < 3; i++) {
        if (player.playerPile.length === 0 || computer.playerPile.length === 0) {
            endGame();
            break;
        }
        else {
            let warPop = player.playerPile.pop();
            let compPop = computer.playerPile.pop();
            WarPile.push(warPop);
            WarPile.push(warPop);
        }
    }
}
function endGame() {
    if (computer.playerPile.length <= 0) {
        outcome.innerHTML = 'Congrats You Win!';
        outcome.style.color = "lightBlue";
        gameOver = true;
    }
    else if (player.playerPile.length <= 0) {
        outcome.innerHTML = 'Not so lucky this time!';
        outcome.style.color = "red";
        gameOver = true;
    }
}
let Rounds = 0;
function test() {
    do {
        playRound();
        console.log(Rounds++);
    } while (!gameOver && Rounds < 1000);
}
setup("Michael", "Computer");
//# sourceMappingURL=Game.js.map