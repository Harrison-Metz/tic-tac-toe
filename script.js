function gameboard() {
    const row = 3;
    const column = 3;
    let board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++){
            board[i].push('cell');
        }
    }
    
    const logBoard = function(){
        console.log(board);
    }

    return {logBoard, }
}

function gameController() {
    const gameBoard = gameboard();

    gameBoard.logBoard();
}

const controller = gameController();