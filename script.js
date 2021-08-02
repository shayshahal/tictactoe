const player = (type) =>
{
    
    const move = (array, x, y) =>
    {
        gameBoard.applyMove(x, y, type);
        array[x][y] = type;
    }
    const findBestMove = (array) =>
    {
        moves = allMoves(array, type);
        let bestScore = -Infinity;
        let bestMove;
        moves.forEach(element => {
        array[element.x, element.y] = type;
        let score = miniMax(array, false);
        array[element.x, element.y] = 0;
        if(score > bestScore) 
        { 
            bestScore = score;
            bestMove = element;
        }
        });
    }
    const miniMax = (array, isTurn) => 
    {

    }
    const allMoves = (array, typ) =>
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
    return{move};
}
const gameBoard = (() =>
{
    const gb = document.getElementById("gameboard")
    let startDiv ;
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
        if(type == 1)
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

            if(checkWin(array) != 0)
            {
                endGame();
            }
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
        if(array[0][2] == array[1][1] && array[1][1] == array[2][0] && array[0][2] !== 0)
            {
            return array[0][2];
        }
        for (let j = 0; j < 3; j++) 
        {
            if(array[0][j] == array[1][j] && array[1][j] == array[2][j] && array[2][j] !== 0)     
            {
                return array[0][j];
            }   
            if(array[j][0] == array[j][1] && array[j][1] == array[j][2] && array[j][2] !== 0)     
            {
                return array[j][0];
            }   
        }
        return 0;
    }
    const endGame = () =>
    {
        gameBoard.showStart("RESTART");
    }
    return {move, checkWin};
})(player(1), player(2));

gameBoard.showStart('START');