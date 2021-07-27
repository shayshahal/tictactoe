const gameBoard = (() =>
{
    const gb = document.getElementById("gameboard")
    const array = [
        [0 , 0 , 0],
        [0 , 0 , 0],
        [0 , 0 , 0]
    ];
    let startDiv ;
    let restartDiv;
    const showStart = () =>
    {
        startDiv = document.createElement("div");
        startDiv.style.opacity = "0.5";
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
        gb.removeChild(startDiv)
        for (let i = 0; i < 9; i++) 
        {
            const newDiv = document.createElement("div");
            newDiv.setAttribute('style', 'background-color: White');    
            newDiv.classList.add("game-box");
            gb.appendChild(newDiv);
        }
    }
    return {showStart};
})();
gameBoard.showStart();