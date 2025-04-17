let rstbtn = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");
let winmsg = document.querySelector(".winmsg");
let scoreOEl = document.getElementById("scoreO");
let scoreXEl = document.getElementById("scoreX");
let playerONameEl = document.getElementById("playerOName");
let playerXNameEl = document.getElementById("playerXName");

let turnO = true;

// Prompt for player names
let oname = prompt("Enter Player 1 Name (O)");
let xname = prompt("Enter Player 2 Name (X)");
if (!oname) oname = "Player O";
if (!xname) xname = "Player X";

// Set names on the screen
playerONameEl.innerText = oname+" (O)"; 
playerXNameEl.innerText = xname +" (X)";    

// Track scores
let scoreO = 0;
let scoreX = 0;

let win_pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    checkWinner();
    turnO = !turnO;
  });
});

const checkWinner = () => {
  for (let pattern of win_pattern) {
    let [a, b, c] = pattern;
    let valA = boxes[a].innerText;
    let valB = boxes[b].innerText;
    let valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      const winnerName = valA === "O" ? oname : xname;

      winmsg.innerText = `Congratulations, Winner is ${winnerName}`;
      winmsg.classList.remove("hide");

      if (valA === "O") {
        scoreO++;
        scoreOEl.innerText = scoreO;
      } else {
        scoreX++;
        scoreXEl.innerText = scoreX;
      }

      boxes.forEach((box) => box.disabled = true);
      return;
    }
  }
};

const rstEvent = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  winmsg.classList.add("hide");
};

rstbtn.addEventListener("click", rstEvent);

// Initially hide the win message
winmsg.classList.add("hide");
