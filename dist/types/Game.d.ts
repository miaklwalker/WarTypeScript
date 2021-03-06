declare let playerBadge_div: HTMLDivElement;
declare let computerBadge_div: HTMLDivElement;
declare let playerCardName_div: HTMLDivElement;
declare let computerCardName_div: HTMLDivElement;
declare let playerCard_div: HTMLDivElement;
declare let computerCard_div: HTMLDivElement;
declare let outcome_div: HTMLDivElement;
declare let PlayerCardsRemaining_div: HTMLDivElement;
declare let computerCardsRemaining_div: HTMLDivElement;
declare let instructions_div: HTMLDivElement;
declare let war_div: HTMLDivElement;
declare let playerBadge: HTMLDivElement;
declare let computerBadge: HTMLDivElement;
declare let playerCardName: HTMLDivElement;
declare let computerCardName: HTMLDivElement;
declare let playerCard: HTMLDivElement;
declare let computerCard: HTMLDivElement;
declare let outcome: HTMLDivElement;
declare let PlayerCardsRemaining: HTMLDivElement;
declare let computerCardsRemaining: HTMLDivElement;
declare let instructions: HTMLDivElement;
declare let warDom: HTMLDivElement;
declare let warDeck: Deck;
declare let player: Players;
declare let computer: Players;
declare let WarPile: Card[];
declare let gameOver: boolean;
declare function setup(playerName: string, opponentName?: string): void;
declare function update(): void;
declare function playRound(): void;
declare function checkOutcome(playerCardValue: number, computerCardValue: number): void;
declare function winRound(): void;
declare function loseRound(): void;
declare function warRound(): void;
declare function endGame(): void;
declare let Rounds: number;
declare function test(): void;
