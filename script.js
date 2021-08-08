const player = (type) =>
{
    const move = (array, x, y) =>
    {
        gameBoard.applyMove(x, y, type);
        array[x][y] = type;
    }
    const findBestMove = (array) =>
    {
        let moves = allMoves(array, type);
        let bestScore = -Infinity;
        let bestMove;
        moves.forEach(element => {
        array[element.x][element.y] = type;
        let score = miniMax(array, false);
        array[element.x][element.y] = 0;
        if(score > bestScore) 
        { 
            bestScore = score;
            bestMove = element;
        }
        });
        return bestMove;
    }
    const miniMax = (array, isTurn) =>
    {
        let eval = gameFlow.checkWin(array);
        if(eval !== 0)
        {
            return eval * type;
        }
        let moves = allMoves(array);
        if(moves.length === 0)
        {
            return 0;
        }
        let value;
        if(isTurn)
        {
            value = -Infinity;
            moves.forEach(element => {
                array[element.x][element.y] = type;
                value = Math.max(value, miniMax(array, false));
                array[element.x][element.y] = 0;
            });
        }
        else
        {
            value = Infinity;
            moves.forEach(element => {
                array[element.x][element.y] = type * -1;
                value = Math.min(value, miniMax(array, true));
                array[element.x][element.y] = 0;
            });
        }
        return value;
    }
    const allMoves = (array) =>
    {
        moves = [];
        for (let x = 0; x < 3; x++) 
        {
            for (let y = 0; y < 3; y++) 
            {
                if(array[x][y] === 0)
                {
                    moves.push({x, y});
                }
            }
        }
        return moves;
    }
    return{move, findBestMove};
}
const gameBoard = (() =>
{
    const gb = document.getElementById("gameboard")
    let startDiv;
    let divs;
    const showStart = (type) =>
    {
        startDiv = document.createElement("div");
        startDiv.textContent = `Press to ${type}!`;
        startDiv.classList.add("start-div");
        startDiv.addEventListener("click", init);
        gb.appendChild(startDiv);
    }
    const init = () =>
    {     
        const array = [
            [0 , 0 , 0],
            [0 , 0 , 0],
            [0 , 0 , 0]
        ];
        divs = [
            [null , null , null],
            [null , null , null],
            [null , null , null]
        ];
        gb.innerHTML = '';
        for (let x = 0; x < 3; x++) 
        {
            for (let y = 0; y < 3; y++) 
            {
                const newDiv = document.createElement("div");
                newDiv.style.backgroundColor = "White";
                newDiv.style.fontSize = "7rem";
                newDiv.style.userSelect = "none";
                newDiv.classList.add("game-box");
                function makeMove()
                {
                    gameFlow.move(array, x, y);
                }
                newDiv.addEventListener("click", makeMove);
                gb.appendChild(newDiv);           
                divs[x][y] = newDiv;
            }
        }
    }
    const applyMove = (x, y, type) =>
    {
        if(type === 1)
        {
            divs[x][y].textContent = 'X';
        }
        else
        {
            divs[x][y].textContent = 'O';
        }
    }
    return {showStart, applyMove};
})();

const gameFlow = ((player1, player2) => 
{
    let xturn = true;
    const move = (array, x, y) => 
    {
        if(array[x][y] == 0)
        {
            player1.move(array, x, y);
            if(checkWin(array) !== 0)
            {
                endGame();
            }
            let aiMove = player2.findBestMove(array);
            player2.move(array, aiMove.x, aiMove.y);
            let winner = checkWin(array);
            if(winner !== 0)
            {
                endGame(winner);
            }
        }
    }
    const ai = (array) =>
    {
        let aiMove = player2.findBestMove(array);
        player2.move(array, aiMove.x, aiMove.y);
        // Check if game ended after move
        let winner = checkWin(array);
        if(winner !== 0)
        {
            endGame(winner);
        }
    }
    const checkWin = (array) =>
    {
        // LEFT DIAGONAL
        if(array[0][0] === array[1][1] && array[1][1] === array[2][2] && array[0][0] !== 0)
        {
            return array[0][0];
        }

        // RIGHT DIAGONAL
        if(array[0][2] === array[1][1] && array[1][1] === array[2][0] && array[0][2] !== 0)
        {
            return array[0][2];
        }

        // Check rows and cols simultaneously
        for (let j = 0; j < 3; j++) 
        {
            if(array[0][j] === array[1][j] && array[1][j] === array[2][j] && array[2][j] !== 0)     
            {
                return array[0][j];
            }   
            if(array[j][0] === array[j][1] && array[j][1] === array[j][2] && array[j][2] !== 0)     
            {
                return array[j][0];
            }   
        }

        // Check if board is full
        if(array.flat().every(x => x !== 0))
            return -1;
        
        return 0;
    }
    const endGame = (winner) =>
    {
        gameBoard.showStart("RESTART");
    }
    return {move, checkWin};
})(player(1), player(-1));

gameBoard.showStart('START');