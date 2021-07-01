// Query Selectors + Global Variables
var sqr0 = document.getElementById('0');
var sqr1 = document.getElementById('1');
var sqr2 = document.getElementById('2');
var sqr3 = document.getElementById('3');
var sqr4 = document.getElementById('4');
var sqr5 = document.getElementById('5');
var sqr6 = document.getElementById('6');
var sqr7 = document.getElementById('7');
var sqr8 = document.getElementById('8');
var gameboard = document.querySelector('.gameboard');
var gameHeader = document.getElementById('game-header');
var p1Score = document.getElementById('scorecard1');
var p2Score = document.getElementById('scorecard2');

var currentGame = new Game;


window.addEventListener('load', displayWhosTurn)

gameboard.addEventListener('click', function(e) {
  currentGame.placeIconOnOpenSquare(e.target.id);
  showPlayerIcon(e);
  displayWhosTurn();
  displayDraw();
  displayWinner();
})


function showPlayerIcon(e) {
  if (!currentGame.turn) {
    e.target.innerText = `${currentGame.player1.icon}`;
  }
  if (currentGame.turn) {
    e.target.innerText = `${currentGame.player2.icon}`;
  }
}

function displayWhosTurn() {
  if (currentGame.turn && currentGame.player1.move.length + currentGame.player2.move.length < 9) {
    gameHeader.innerText = `${currentGame.player1.icon}'s turn!`
  }
  if (!currentGame.turn && currentGame.player1.move.length + currentGame.player2.move.length < 9) {
    gameHeader.innerText = `${currentGame.player2.icon}'s turn!`
  }
  displayWins();
}

function displayWinner() {
  if (currentGame.isWinner) {
    gameHeader.innerText = `${currentGame.winner[0].icon} Wins!`;
    disableBoard();
    setTimeout(makeNewGame, 3000);

  }
}

function displayDraw() {
  if (currentGame.player1.move.length + currentGame.player2.move.length === 9 && currentGame.isWinner === false) {
    gameHeader.innerText = "Draw!";
    disableBoard();
    setTimeout(makeNewGame, 3000);
  }
}

function makeNewGame() {
    currentGame.resetGame();
    disableBoard();
    clearBoard();
    displayWhosTurn();
}

function clearBoard() {
  sqr0.innerText = "";
  sqr1.innerText = "";
  sqr2.innerText = "";
  sqr3.innerText = "";
  sqr4.innerText = "";
  sqr5.innerText = "";
  sqr6.innerText = "";
  sqr7.innerText = "";
  sqr8.innerText = "";
 }

 function disableBoard() {
   gameboard.classList.toggle('disable');
 }

 function displayWins() {
   currentGame.player1.retrieveWinsFromStorage();
   currentGame.player2.retrieveWinsFromStorage();
   p1Score.innerText = currentGame.player1.wins;
   p2Score.innerText = currentGame.player2.wins;
 }

 function getWinsfromStorageOnLoad() {
   if (localStorage.length < 2) {
     currentGame.player1.saveWinsToStorage();
     currentGame.player2.saveWinsToStorage();
   }
   currentGame.player1.retrieveWinsFromStorage();
   currentGame.player2.retrieveWinsFromStorage();
   displayWins();
 }
