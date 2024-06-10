/**
 * @jest-environment jsdom
 */
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

// Add Jest spy to report when interesting activity appears
jest.spyOn(window, "alert").mockImplementation(() => { });

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
    // Add a sixth failing test to check if the turn number key exist
    test("turnNumber key exist", () => {
        expect("turnNumber" in game).toBe(true);
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
    // Add new test to check if it contains one element
    test("should be one element in the computer's array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    // Add a test to check if the data listener attribute has been set tot rue on each circle
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

// add describe section that contains a.. 
describe("gameplay works correctly", () => {
    // ..a beforeEach section to run before each test is run
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    // ..a afterEach block to run after each test is run
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    // Add test to call addTurn again and check to see that there are now two elements
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    // Add failing test to check if the light class has been added to button to light up
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    // Add failing test so showTurns to update game TurnNumber
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    // Add test to increment the score if the turn is correct
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    // Add test to call an alert if the move is wrong
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        // Add a matcher (toBeCalledWith)
        expect(window.alert).toBeCalledWith("Wrong move!!");
    });
});