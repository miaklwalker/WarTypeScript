//-------Dom Cache----------------
let playerBadge_div = document.getElementById('playerBadge') as HTMLDivElement;
let computerBadge_div = document.getElementById('computerBadge') as HTMLDivElement;
let playerCardName_div = document.getElementById('cardName') as HTMLDivElement;
let computerCardName_div = document.getElementById('compcardname') as HTMLDivElement;
let playerCard_div = document.getElementById('playersCard') as HTMLDivElement;
let computerCard_div = document.getElementById('ComputerCard') as HTMLDivElement;
let outcome_div = document.getElementById('outcome') as HTMLDivElement;
let PlayerCardsRemaining_div = document.getElementById('pcardsR') as HTMLDivElement;
let computerCardsRemaining_div = document.getElementById('CompR') as HTMLDivElement;
let instructions_div = document.getElementById('instructions') as HTMLDivElement;
let war_div = document.getElementById('War') as HTMLDivElement;
let playerBadge: HTMLDivElement = playerBadge_div;
let computerBadge: HTMLDivElement = computerBadge_div;
let playerCardName: HTMLDivElement = playerCardName_div;
let computerCardName: HTMLDivElement = computerCardName_div;
let playerCard: HTMLDivElement = playerCard_div;
let computerCard: HTMLDivElement = computerCard_div;
let outcome: HTMLDivElement = outcome_div;
let PlayerCardsRemaining: HTMLDivElement = PlayerCardsRemaining_div;
let computerCardsRemaining: HTMLDivElement = computerCardsRemaining_div;
let instructions:HTMLDivElement = instructions_div;
let warDom = war_div;
// <--------------------- DOM Caching Complete! ------------------------>


// <-------------Global Variables-------------------------->
let warDeck: Deck
let player: Players
let computer: Players;
let WarPile: Card[] = [];
let gameOver = false;
//<-------------------------------------------------------->

function setup(playerName: string, opponentName: string = "Computer") {
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
    warDom.innerText ="";
    endGame();
}

function playRound() {
    player.grabCard()
    computer.grabCard()
    playerCard.innerHTML = `${player.playerCard[0].img}`
    computerCard.innerHTML = `${computer.playerCard[0].img}`
    playerCardName.innerHTML = `${player.playerCard[0].cardInfo()}`
    computerCardName.innerHTML = `${computer.playerCard[0].cardInfo()}`
    checkOutcome(player.playerCard[0].value, computer.playerCard[0].value);
}

function checkOutcome(playerCardValue: number, computerCardValue: number) {
    if (playerCardValue > computerCardValue) {
        winRound();
    } else if (computerCardValue > playerCardValue) {
        loseRound();
    } else if (playerCardValue === computerCardValue) {
        warDom.innerText = "WAR!!!!";
        warRound();
    };
}

function winRound() {
    outcome.innerHTML = `Your ${player.playerCard[0].faceValue} Beats 
${computer.playerCard[0].faceValue} You Win!`
    let playerCards = player.playerCard.splice(0, player.playerCard.length) as Card[];
    let compCard = computer.playerCard.splice(0, computer.playerCard.length) as Card[];
    let cards = [playerCards, compCard];
    let cardsWon = compCard.map((card: Card) => card.cardInfo()).toString();
    instructions.innerHTML = ` You won ${cardsWon}`;
    cards.forEach((set: Card[]) => {
        set.forEach((card: Card) => {
            WarPile.unshift(card)
        })
    });
    WarPile.forEach(card => player.playerPile.unshift(card));
    update();
    WarPile = []
}

function loseRound() {
    outcome.innerHTML = `Your ${player.playerCard[0].faceValue} loses to 
                               ${computer.playerCard[0].faceValue} You Lose!`
    let playerCards = player.playerCard.splice(0, player.playerCard.length) as Card[];
    let compCard = computer.playerCard.splice(0, computer.playerCard.length) as Card[];
    let cards = [playerCards, compCard];
    let cardsLost = playerCards.map((card:Card)=> card.cardInfo()).toString();
    instructions.innerHTML = ` You Lost ${cardsLost}`;
    cards.forEach((set: Card[]) => {
        set.forEach((card: Card) => {
            WarPile.unshift(card)
        })
    });
    WarPile.forEach(card => computer.playerPile.unshift(card));
    update();
    WarPile = []
}

function warRound() {
    let playerCards = player.playerCard.splice(0, player.playerCard.length) as Card[];
    let compCard = computer.playerCard.splice(0, computer.playerCard.length) as Card[];
    let cards = [playerCards, compCard];
    cards.forEach((set: Card[]) => {
        set.forEach((card: Card) => {
            WarPile.unshift(card)
        })
    });
    for (let i = 0; i < 3; i++) {
        if (player.playerPile.length === 0 || computer.playerPile.length === 0) {
            endGame();
            break;
        }else{
        let warPop: any = player.playerPile.pop();
        let compPop: any = computer.playerPile.pop();
        WarPile.push(warPop);
        WarPile.push(warPop);
        }
    }
}

function endGame() {
    if (computer.playerPile.length <= 0){
        outcome.innerHTML = 'Congrats You Win!'
        outcome.style.color = "lightBlue"
        gameOver =true;
    }
    else if (player.playerPile.length <= 0){
        outcome.innerHTML = 'Not so lucky this time!'
        outcome.style.color = "red"
        gameOver = true;
}
}

let Rounds = 0
function test(){
do {
    playRound()
    console.log(Rounds++);
} while (!gameOver && Rounds < 1000);
}
setup("Michael", "Computer");

