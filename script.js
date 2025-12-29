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
            return true;
        } else {
            console.log('That space is already taken...');
            return false;
        }
    }

    const checkWinner = function(board){
        const gameButtons = document.querySelectorAll('.cell');
        function disableButtons(buttons){
            buttons.forEach(button => {
                button.disabled = true;
            });
        }
        // check rows
        for (let r = 0; r < row; r++){
            const a = board[r][0].getCellValue();
            const b = board[r][1].getCellValue();
            const c = board[r][2].getCellValue();

            if (a === b && a ===c && a !== 0){
                console.log(`Player ${a} wins!`);
                disableButtons(gameButtons);
                return;
            }
        }
        //check columns
        for(let col = 0; col < column; col++){
            const a = board[0][col].getCellValue();
            const b = board[1][col].getCellValue();
            const c = board[2][col].getCellValue();

            if (a === b && a === c && a !== 0){
                console.log(`Player ${a} wins!`);
                disableButtons(gameButtons);
                return;
            }
        }
        //check diagonals
        const center = board[1][1].getCellValue();
        if (center !== 0){
            //top-left to bottom-right
            if (board[0][0].getCellValue() === center && board[2][2].getCellValue() === center){
                console.log(`Player ${center} wins!`);
                disableButtons(gameButtons);
                return;
            }
            //top-right to bottom-left
            if (board[0][2].getCellValue() === center && board[2][0].getCellValue() === center){
                console.log(`Player ${center} wins!`);
                disableButtons(gameButtons);
                return;
            }
        }
    }

    return {logBoard, placeMark, getBoard, checkWinner, };
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
        const moveSuccessful = gameboard.placeMark(getActivePlayer().mark, row, column);
    
        if (!moveSuccessful) {
            console.log(`Invalid move. ${getActivePlayer().name}, please try again.`);
            return; // Exit early without switching players
        }
        //gameboard.placeMark(getActivePlayer().mark, row, column);
        console.log(`${getActivePlayer().name} placed a mark at row: ${row}, column: ${column}...`)
        gameboard.logBoard();
        gameboard.checkWinner(gameboard.getBoard());
        

        switchPlayer();
    }

    gameboard.logBoard();
    

    return {playRound, getActivePlayer, gameboard,}
}

function screenController(){
    const boardDiv = document.querySelector('.board');
    const playerTurnBox = document.querySelector('.playerTurnBox');
    let playerOneName = 'Player 1';
    let playerTwoName = 'Player 2';
    const controller = gameController(playerOneName, 1, playerTwoName, 2);

    playerTurnBox.textContent = `${controller.getActivePlayer().name}'s turn`;

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.dataset.row = i;
            cellButton.dataset.column = j;
            cellButton.addEventListener('click', () => {
                controller.playRound(i, j);
                const board = controller.gameboard;
                const cellValue = board.getBoard()[i][j].getCellValue();
                if (cellValue === 1){
                    cellButton.textContent = 'X';
                } else if (cellValue === 2){
                    cellButton.textContent = 'O';
                }
                playerTurnBox.textContent = `${controller.getActivePlayer().name}'s turn`;
            });
            boardDiv.appendChild(cellButton);
        }
    }
}

screenController();