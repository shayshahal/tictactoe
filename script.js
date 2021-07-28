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
    const showStart = () =>
    {
        startDiv = document.createElement("div");
        startDiv.style.backgroundColor = "White";
        startDiv.textContent = "Press to START!";
        startDiv.style.textAlign = "center";
        startDiv.style.lineHeight = "35rem";
        startDiv.style.fontSize = "1.5rem";
        startDiv.style.userSelect = "none";
        startDiv.style.gridRow = "1 / 4";
        startDiv.style.gridColumn = "1 / 4";
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
        gb.removeChild(startDiv)
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
            if(xturn == 1) 
            {
                player1.move(e, array, x, y); 
                xturn == 2;
            }
            else
            {
                player2.move(e, array, x, y);
                xturn == 1;
            } 
            console.log(array);
            if(checkWin(array))
            {
                endGame();
            }
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

    }
    return {move};
})(player(1), player(2));

gameBoard.showStart();