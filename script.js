function gameBoard(){
    let columns = 3;
    let rows = 3;
    let board = [];

    //create board array based on defined size
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(cell());
        }
    }

    const getBoard = function(){
        return board;
    };

    const placeMark = function(column, row, player){

        const availableCell = board[row][column];
        //if a mark is already in the cell this will return true
        //this is an invalid move, end execution
        if(availableCell) return;
        
        //otherwise place the players mark in the cell
        board[row][column].addMark(player);
    };

    //print board to console
    const printBoard = function(){
        const boardWithCellValues = board.map(function(row){
            return row.map(function(cell){
                return cell.getValue();
            });
        });
        console.log(boardWithCellValues);
    };

    return {
        getboard,
        placeMark,
        printBoard,
    };
}

function cell(){
    //empty cell has value 0
    let value = 0;

    //change value of cell to players mark
    const addMark = function(player){
        value = player;
    };

    //retrieve current value of cell
    const getValue = function(){
        return value;
    };

    return {
        addMark,
        getValue,
    };
}

function gameController(playerOneName = 'playerOne', playerTwoName = 'playerTwo'){
    const board = gameBoard();

    const players = [
        {
            name: 'playerOne',
            mark: 1
        },
        {
            name: 'playerTwo',
            mark: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = function(){
        if(activePlayer === players[0]){
            activePlayer = players[1];
        }else{
            activePlayer = players[0];
        }
    };

    const getActivePlayer = function(){
        return activePlayer;
    };
    
    const printNewRound = function(){
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = function(row, column){
        console.log(`Placing ${getActivePlayer().name}'s mark into row ${row}, column ${column}.`);
        placeMark(row, column, getActivePlayer().mark);

        switchPlayerTurn();
        printNewRound();
    };

    return {
        playRound,
        getActivePlayer,
    }
}

const game = gameController();