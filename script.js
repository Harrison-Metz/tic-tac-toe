function createGameboard() {
    const row = 3;
    const column = 3;
    let board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++){
            board[i].push(cell());
        }
    }
    
    const logBoard = function(){
        console.log(board);
    }

    const placeMark = function(player, row, column){
        if (board[row][column] === 0){
            board[row][column].addMark(player);
        } else {
            console.log('That space is already taken...');
            return;
        }
    }

    return {logBoard, placeMark,}
}

function cell() {
    let value = 0;

    const addMark = function(player){
        return value = player;
    }

    const getCellValue = function(){
        return value;
    }
}

function gameController(playerOneName, playerOneMark, playerTwoName, playerTwoMark) {
    const gameboard = createGameboard();
    
    const players = [
        {
            name : playerOneName,
            mark : playerOneMark
        },
        {
            name : playerTwoName, 
            mark : playerTwoMark
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = function(){
        if (activePlayer === players[0]){
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const getActivePlayer = function(){
        return activePlayer;
    }

    gameboard.logBoard();

    
}

const controller = gameController();