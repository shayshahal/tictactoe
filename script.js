const gameBoard = (() =>
{
    const gb = document.getElementById("gameboard")
    const array = [
        [0 , 0 , 0],
        [0 , 0 , 0],
        [0 , 0 , 0]
    ];
    const init = () =>
    {     
        for (let i = 0; i < 9; i++) 
        {
            const newDiv = document.createElement("div");
            newDiv.setAttribute('style', 'background-color: White');    
            newDiv.classList.add("game-box");
            gb.appendChild(newDiv);
        }
    }
    return {init};
})();
gameBoard.init();