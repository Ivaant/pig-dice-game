/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const player1TotalScoreElem = document.getElementById('score-0');
const player1CurrentScoreElem = document.getElementById('current-0');
const player2TotalScoreElem = document.getElementById('score-1');
const player2CurrentScoreElem = document.getElementById('current-1');
const diceElem = document.querySelector('.dice');

let activePlayer, dice, roundScore, globalScores;

function setInitialState() {
    document.getElementById('name-0').textContent = "PLAYER 1";
    document.getElementById('name-1').textContent = "PLAYER 2";
    document.querySelector(".player-0-panel").classList.remove("winner", "active");
    document.querySelector(".player-1-panel").classList.remove("winner", "active");
    document.querySelector(".player-0-panel").classList.add("active");
    player1CurrentScoreElem.textContent = 0;
    player1TotalScoreElem.textContent = 0;
    player2CurrentScoreElem.textContent = 0;
    player2TotalScoreElem.textContent = 0;
    diceElem.style.display = 'none';

    activePlayer = 0;
    roundScore = 0;
    globalScores = [0, 0];

    document.querySelector('.btn-roll').addEventListener('click', rollBtnHandler);
    document.querySelector(".btn-hold").addEventListener('click', holdBtnHandler);
    document.querySelector(".btn-new").addEventListener('click', setInitialState);
}

function rollBtnHandler() {
    const playerCurrentScoreElem = document.getElementById('current-' + activePlayer);

    let dice = Math.floor(Math.random() * 6 + 1);

    //diceElem.setAttribute('src', 'dice-' + dice + '.png');
    diceElem.src = 'dice-' + dice + '.png';
    diceElem.style.display = 'block';

    if (dice !== 1) {
        roundScore += dice;
        playerCurrentScoreElem.textContent = roundScore;
    } else {
        nextPlayer();
    }
}

function holdBtnHandler() {
    //Add CURRENT score to player's GLOBAL score
    globalScores[activePlayer] += roundScore;
    //Update UI
    const playerTotalScoreElem = document.getElementById('score-' + activePlayer);
    playerTotalScoreElem.textContent = globalScores[activePlayer];
    //Check if player won the game
    if (globalScores[activePlayer] >= 100) gameOver();
    else nextPlayer();
}

function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    diceElem.style.display = 'none';
    roundScore = 0;
}

function gameOver() {
    const winnerNameDOM = document.getElementById('name-' + activePlayer);
    const winnerPanelDOM = document.querySelector(".player-" + activePlayer + "-panel");
    winnerNameDOM.textContent = "Winner!";
    winnerPanelDOM.classList.add("winner");
    winnerPanelDOM.classList.remove("active");
    diceElem.style.display = 'none';
    document.querySelector(".btn-roll").removeEventListener('click', rollBtnHandler);
    document.querySelector(".btn-hold").removeEventListener('click', holdBtnHandler);
}

setInitialState();