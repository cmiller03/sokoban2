// DOM elements to intereact with
const mazeDiv = document.getElementById("mazeDiv");
const avatarDiv = document.getElementById("avatar");
const youWonDiv = document.getElementById("youWonDiv")

// Size of the squares in the grid, in pixels.
const delta = 33;

// Coordinates of the player's avatar.
let avatarRow;
let avatarCol;

// Separate array for keeping track of the moving crates.
const crates = [];
var circleCrate = 0;

function crate(row, col) {
    const newCrate = document.createElement("div");

    newCrate.className = "crate";
    newCrate.style.left = col * delta + "px";
    newCrate.style.top = row * delta + "px";
    mazeDiv.appendChild(newCrate);

    return newCrate;
}




// START HERE -----------------------------------------------------------------/
// While the maze project only kept track of (W)alls, the player's
// (S)tarting position, and the (F)inishing position, in sokoban, we
// have to keep track of (O)pen storage locations, (B)oxes, and
// e(X)actly where to move those boxes to. 
//
// Write a conditional that adds Xs to the "crateRow" variable but uses
// an "O" class for the cell. "B"
//
// Your task is to write a for loop that draws the map, taking the above cell
// types into consideration. Keep in mind that the player and boxes will be
// absolutely positioned (so that they can be moved) and that you'll need to
// draw a box for both B's _and_ X's. 
//
// Similarly, you'll want to draw a a storage location for both O's and X's. In
// other words, X is a tile that has both a box and something indicating it as
// storage at the same time.
//
// Continue to STEP 2
for (let row = 0; row < map.length; row++) {
    const rowStr = map[row];
    const rowDiv = document.createElement("div");
    var cratesRow = [];
    rowDiv.className = "row";

    for (let i = 0; i < rowStr.length; i++) {
        let cellClass = rowStr[i];
        const cellDiv = document.createElement("div");

        cellDiv.className = "cell " + cellClass;
        
        var newCrate = "";
        if (cellClass === "S") {
            cellDiv.innerHTML = "S"
            avatarRow = row;
            avatarCol = i;
        }
        if (cellClass === "O") {

        }
        if (cellClass === "B") {
            newCrate = crate(row, i);
        }
        if (cellClass === "X") {
            cellDiv.className = "cell " + "O";
            newCrate = crate(row,i);
            circleCrate ++;
        }
        cratesRow.push(newCrate);
        

        rowDiv.appendChild(cellDiv);
    }
    mazeDiv.appendChild(rowDiv);

    crates.push(cratesRow);
}

// Helper function for creating a div representing a box/crate,
// and positioning it at a specified row/column in the grid.
function crate(row, col) {
    const newCrate = document.createElement("div");

    newCrate.className = "crate";
    newCrate.style.left = col * delta + "px";
    newCrate.style.top = row * delta + "px";
    mazeDiv.appendChild(newCrate);

    return newCrate;
}


// Update the coordinates of the player's avatar.
function redrawAvatar() {
    avatarDiv.classList.remove("hidden");
    avatarDiv.style.top = avatarRow * delta + "px";
    avatarDiv.style.left = avatarCol * delta + "px";
}

// Move the player's avatar in the specified direction
// dRow is the desired change in row (-1, 0, or +1)
// dCol is the desired change in column (-1, 0, or +1)
function move(dRow, dCol) {
    // Calculate the coordinates the player wants to move to.
    const destRow = avatarRow + dRow;
    const destCol = avatarCol + dCol;
    const destCell = map[destRow][destCol];

    // Check if there is a crate there
    if (crates[destRow][destCol] !== "") {
        crateDestRow = destRow + dRow;
        crateDestCol = destCol + dCol;
        if(map[crateDestRow][crateDestCol] === "W") {
            return;
        }
        if(crates[crateDestRow][crateDestCol] !== "") {
            return;
        }
        crates[crateDestRow][crateDestCol] = crates[destRow][destCol];
        crates[destRow][destCol] = "";
        crates[crateDestRow][crateDestCol].style.left = crateDestCol * delta + "px";
        crates[crateDestRow][crateDestCol].style.top = crateDestRow * delta + "px";
            if(map[crateDestRow][crateDestCol] === "O") {
                circleCrate ++;
            }
            if (map[destRow][destCol] === "O") {
                circleCrate --;
            }
            if(map[crateDestRow][crateDestCol] === "X") {
                circleCrate ++;
            }
            if (map[destRow][destCol] === "X") {
                circleCrate --;
            }
    }
    if (destCell && destCell !== "W") {
        avatarRow += dRow;
        avatarCol += dCol;
        redrawAvatar();
    }
    


    // STEP 2 -----------------------------------------------------------------/
    // For the maze, it was enough to check that the place the player wanted to
    // move was empty. Here, we want to check if the place that the player wants
    // to move has a crate in it, and if so, if the space next to that crate is
    // empty. If so, we can move that crate.
    //
    // Write a conditional that checks whether or not a box can be pushed and
    // pushes it in the correct direction. A box can not be moved if:
    // - a wall exists where it is being pushed
    // - another box exists where it is being pushed
    //
    // You will then need to move the player if the destination cell is empty.
    // Continue to STEP 3

    checkForWin();
    console.log(circleCrate);
}

function checkForWin() {
    // if(crates[destRow][destCol] === "O") {
    //     youWonDiv.classList.remove("hidden");
    //     const audio = new Audio('wow.mp3');
    //     audio.play();
    // }
    if (circleCrate === 7) {
         youWonDiv.classList.remove("hidden");
         const audio = new Audio('wow.mp3');
         audio.play();
    }
}
    // STEP 3 -----------------------------------------------------------------/
    // Write a function that checks if the player won. A player wins when all
    // boxes are moved over all storage spaces.


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
            move(1, 0);
            break;
        case "ArrowUp":
            move(-1, 0);
            break;
        case "ArrowLeft":
            move(0, -1);
            break;
        case "ArrowRight":
            move(0, 1);
            break;
        default:
            console.log('keydown event\n\nkey: ' + event.key);
    }
});

youWonDiv.addEventListener("click", () => location.reload());
