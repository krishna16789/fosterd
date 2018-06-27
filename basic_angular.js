var app = angular.module('myApp', []);

let ticTacToeController = function ($scope) {
    let turn = ["O", "X"];
    let currentTurn = turn[0];
    let currentPlayer = 0;
    $scope.isGameDone = false;
    const DEFAULT_VALUE = "_";
    $scope.board = [];


    $scope.initializeBoard = function () {
        $scope.board = [];
        for (let i = 0; i < 3; i++) {
            $scope.board.push([DEFAULT_VALUE, DEFAULT_VALUE, DEFAULT_VALUE]);
        }
        currentTurn = turn[0];
        currentPlayer = 0;
        $scope.isGameDone = false;
    }

    $scope.initializeBoard();

    $scope.resetGame = function () {
        $scope.initializeBoard();
    }

    $scope.handleClick = function (row, cell) {
        if ($scope.isGameDone) {
            alert("Please restart new game");
            return;
        }
        $scope.board[row][cell] = currentTurn;
        if (isGameOver(row, cell, currentTurn)) {
            $scope.isGameDone = true;
            alert("Player " + (currentTurn) + " has won the game");
            return;
        }
        else {
            currentPlayer = (currentPlayer + 1) % 2;
            currentTurn = turn[currentPlayer];
        }
    }

    function isGameOver(row, col, turn) {
        //row check
        for (let i = 0; i < $scope.board.length; i++) {
            if ($scope.board[i][col] !== turn) break;
            if (i == $scope.board.length - 1) return true;
        }
        // col check
        for (let i = 0; i < $scope.board.length; i++) {
            if ($scope.board[row][i] !== turn) break;
            if (i == $scope.board.length - 1) return true;
        }
        // diagnol check
        if (row === col) {
            for (let i = 0; i < $scope.board.length; i++) {
                if ($scope.board[i][i] !== turn) break;
                if (i == $scope.board.length - 1) return true;
            }
        }
        // anti diagnol
        if (row + col == $scope.board.length - 1) {
            for (let i = 0; i < $scope.board.length; i++) {
                if ($scope.board[i][$scope.board.length - 1 - i] !== turn) break;
                if (i == $scope.board.length - 1) return true;
            }
        }
        let empty = false;
        for (let i = 0; i < $scope.board.length; i++) {
            for (let j = 0; j < $scope.board.length; j++) {
                if ($scope.board[i][j] == DEFAULT_VALUE) {
                    empty = true;
                    break;
                }
            }
        }
        if (!empty) {
            alert("Game is Drawn");
            $scope.isGameDone = true;
            return;
        }
    }
}

app.controller('ticTacToeController', ticTacToeController);
