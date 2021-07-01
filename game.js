class Game {
  constructor() {
    this.player1 = new Player("p1", "🎤");
    this.player2 = new Player("p2", "📼");
    this.turn = true;
    this.isWinner = false;
    this.board = [0,1,2,3,4,5,6,7,8];
    this.winCombos = [[0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [6,4,2]];
    this.winner = [];
  }

  checkGameCoditions(player) {
    for (var i = 0; i < this.winCombos.length; i++) {
      if (player.move.includes(this.winCombos[i][0]) &&
          player.move.includes(this.winCombos[i][1]) &&
          player.move.includes(this.winCombos[i][2])
        ) {
          this.declareWinner(player);
        }
    }
  };

  declareWinner(player) {
    player.wins++
    this.winner.push(player);
    player.saveWinsToStorage();
    this.isWinner = true;
  };

  placeIconOnOpenSquare(location) {
    if (this.board[location] !== this.player1.icon && this.board[location] !== this.player2.icon) {
      this.placePlayerIcon(location);
      this.changePlayerTurn();
    }
  };

  placePlayerIcon(location) {
    if (this.turn === true) {
      this.board.splice(location, 1, this.player1.icon);
      this.player1.move.push(parseInt(location));
      this.checkGameCoditions(this.player1);
    }
    if (this.turn === false) {
      this.board.splice(location, 1, this.player2.icon);
      this.player2.move.push(parseInt(location));
      this.checkGameCoditions(this.player2);
    }
  };

  changePlayerTurn() {
    if (this.turn === true) {
      this.turn = false;
    } else if (this.turn === false) {
      this.turn = true;
    }
  }

  resetGame() {
    currentGame = new Game;
  }
}
