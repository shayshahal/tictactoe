const player = (type) =>
{
    
    const move = (e, array, x, y) =>
    {
        if(type == 1)
        {
            e.textContent = 'X';
        }
        else
        {
            e.textContent = 'O';
        }
        array[x][y] = type;
    }
    return{move};
}
const gameBoard = (() =>
{
    const gb = document.getElementById("gameboard")
    let startDiv ;
    const showStart = (type) =>
    {
        startDiv = document.createElement("div");
        startDiv.style.position = 'absolute';
        startDiv.style.backgroundColor = "White";
        startDiv.style.opacity = '0.5';
        startDiv.textContent = `Press to ${type}!`;
        startDiv.style.textAlign = "center";
        startDiv.style.lineHeight = "35rem";
        startDiv.style.fontSize = "1.5rem";
        startDiv.style.userSelect = "none";
        startDiv.style.height = "35rem";
        startDiv.style.width = "35rem";
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
                    gameFlow.move(newDiv, array, x, y);
                }
                newDiv.addEventListener("click", makeMove);
                gb.appendChild(newDiv);           
            }
        }
    }
    return {showStart};
})();

const gameFlow = ((player1, player2) => 
{
    let turn = 1;
    const move = (e, array, x, y) => 
    {
        if(array[x][y] == 0)
        {
            if(turn == 1) 
            {
                player1.move(e, array, x, y); 
            }
            else
            {
                player2.move(e, array, x, y);
            } 
            console.log(array);
            if(checkWin(array))
            {
                console.log("BLA");
                endGame();
            }
            turn == 1 ? turn = 2 : turn = 1;
        }
    }
    const checkWin = (array) =>
    {
        // LEFT DIAGONAL
        if(array[0][0] == turn && array[1][1] == turn && array[2][2] == turn)
        {
            return true;
        }
        // RIGHT DIAGONAL
        if(array[0][2] == turn && array[1][1] == turn && array[2][0] == turn)
        {
            return true;
        }
        for (let i = 0; i < 3; i++) 
        {
            if(array[0][i] == turn && array[1][i] == turn && array[2][i] == turn)     
            {
                return true;
            }   
            if(array[i][0] == turn && array[i][1] == turn && array[i][2] == turn)     
            {
                return true;
            }   
        }
        return false;
    }
    const endGame = () =>
    {
        gameBoard.showStart("RESTART");
    }
    return {move};
})(player(1), player(2));

gameBoard.showStart('START');