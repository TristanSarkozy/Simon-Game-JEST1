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
    // showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

// Add lightson function with the ID of circ
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

module.exports = { game, newGame, showScore, addTurn, lightsOn };