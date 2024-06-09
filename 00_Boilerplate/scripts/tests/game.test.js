/**
 * @jest-environment jsdom
 */
const { game, newGame, showScore } = require("../game");

// Add Jest directive that runs before all tests are run
// Add the node fs module, a file system handling module
// that allows us to open, read and write files
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// Add a top parent describe block that contains the test and what we expect
describe("game object contains correct keys", () => {
    test("score key exists", () =>{
        expect("score" in game).toBe(true);
    });
    // Add a second failing test
    test("currentGame key exists", () =>{
        expect("currentGame" in game).toBe(true);
    });
    // Add a third failing test
    test("playerMoves key exists", () =>{
        expect("playerMoves" in game).toBe(true);
    });
    // Add a fourth failing test
    test("choices key exists", () =>{
        expect("choices" in game).toBe(true);
    });
    // Add  a fifth test with buttons as an array
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear the computer sequence array", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});