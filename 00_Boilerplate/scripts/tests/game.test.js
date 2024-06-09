// Add Jest directive that runs before all tests are run
// Add the node fs module, a file system handling module
// that allows us to open, read and write files
beforeALL(() => {
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
});