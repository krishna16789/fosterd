$(document).ready(function () {
    let turn = ["O", "X"];
    let currentTurn = turn[0];
    let currentPlayer = 0;
    let isGameDone = false;
    const DEFAULT_VALUE = "_";
    let board = [];

    function initializeBoard() {
        board = [];
        for (let i = 0; i < 3; i++) {
            board.push([DEFAULT_VALUE, DEFAULT_VALUE, DEFAULT_VALUE]);
        }
        currentTurn = turn[0];
        currentPlayer = 0;
        isGameDone = false;
    }

    initializeBoard();

    function resetGame() {
        $('.cell').html(DEFAULT_VALUE);
        isGameDone = false;
        initializeBoard();
    }

    $("#start").click(resetGame);
    $(".cell").click(function (e) {
        let row = Number($(e.target).attr("row"));
        let col = Number($(e.target).attr("col"));
        if (isGameDone) {
            alert("Please restart new game");
            return;
        }
        board[row - 1][col - 1] = currentTurn;
        $(e.target).html(currentTurn);
        if (isGameOver(row - 1, col - 1, currentTurn)) {
            isGameDone = true;
            alert("Player " + (currentTurn) + " has won the game");
            return;
        }
        else {
            currentPlayer = (currentPlayer + 1) % 2;
            currentTurn = turn[currentPlayer];
        }
    });

    function isGameOver(row, col, turn) {
        //row check
        for (let i = 0; i < board.length; i++) {
            if (board[i][col] !== turn) break;
            if (i == board.length - 1) return true;
        }
        // col check
        for (let i = 0; i < board.length; i++) {
            if (board[row][i] !== turn) break;
            if (i == board.length - 1) return true;
        }
        // diagnol check
        if (row === col) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][i] !== turn) break;
                if (i == board.length - 1) return true;
            }
        }
        // anti diagnol
        if (row + col == board.length - 1) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][board.length - 1 - i] !== turn) break;
                if (i == board.length - 1) return true;
            }
        }
        let empty = false;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] == DEFAULT_VALUE) {
                    empty = true;
                    break;
                }
            }
        }
        if (!empty) {
            alert("Game is Drawn");
            isGameDone = true;
            return;
        }
    }

});
