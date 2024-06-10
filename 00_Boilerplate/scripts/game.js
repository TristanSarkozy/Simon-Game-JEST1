let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

// Add addTurn function to..
function addTurn() {
    // ..to clear the playerMoves array
    game.playerMoves = [];
    // ..to randomly add a button ID to the currentGame array 
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    // .. to call showTurns() function
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

// Add lightsOn function with the ID of circ
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

// Add showTurns function to set interval turning the lightsOn.. 
// ..increment the game turnNumber and turning them off again
function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };
