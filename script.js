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
        let boardValues = '';
        for(let i = 0; i < row; i++){
            boardValues = '';
            for(let j = 0; j < column; j++){
                boardValues += board[i][j].getCellValue() + ' ';
            }
            console.log(boardValues);
        }
    }

    const getBoard = function(){
        return board;
    }

    const placeMark = function(player, row, column){
        if (board[row][column].getCellValue() === 0){
            board[row][column].addMark(player);
        } else {
            console.log('That space is already taken...');
            return;
        }
    }

    return {logBoard, placeMark, getBoard,};
}

function cell() {
    let value = 0;

    const addMark = function(player){
        return value = player;
    }

    const getCellValue = function(){
        return value;
    }

    return {addMark, getCellValue,};
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

   

    const playRound = function(row, column){
        console.log(`It is ${getActivePlayer().name}'s turn...`);
        gameboard.placeMark(getActivePlayer().mark, row, column);
        console.log(`${getActivePlayer().name} placed a mark at row: ${row}, column: ${column}...`)
        gameboard.logBoard();
        switchPlayer();
    }

    gameboard.logBoard();
    

    return {playRound, getActivePlayer, }
}

const controller = gameController('Player1', 1, 'Player2', 2);