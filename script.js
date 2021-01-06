const squares = document.querySelectorAll(".square");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const messageDisplay = document.querySelector("#message");
const colorDisplay = document.querySelector("#colorDisplay");
const title = document.querySelector("h1");
let numSquares = 6;
let colors = [];
let pickedColor;

function fillSquares() {
  let i = 0;
  squares.forEach((square) => {
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i++];
    } else {
      square.style.display = "none";
    }
  });
}

function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });

  title.style.backgroundColor = color;
  messageDisplay.innerHTML = "Correct ! ";
  resetButton.innerHTML = "Play again ?";
}

function handleSquareClick() {
  let clickedColor = this.style.backgroundColor;

  if (clickedColor === pickedColor) {
    changeColors(pickedColor);
  } else {
    this.style.backgroundColor = "#232323";
    messageDisplay.innerHTML = "Try again !";
  }
}

function random() {
  return Math.floor(Math.random() * 256);
}

function pickColor(arr) {
  return Math.floor(Math.random() * arr.length);
}

function randomColor() {
  let r = random();
  let g = random();
  let b = random();

  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColor(num) {
  let arr = [];

  for (i = 0; i < num; i++) {
    color = randomColor();
    arr.push(color);
  }
  return arr;
}

function startGame() {
  title.style.backgroundColor = "steelblue";
  messageDisplay.innerHTML = "";
  resetButton.innerHTML = "New colors";
  colors = generateRandomColor(numSquares);
  pickedColor = colors[pickColor(colors)];
  colorDisplay.innerHTML = pickedColor;
  fillSquares();
  squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });
}

function handleMode() {
  if (this.innerHTML == "Easy") {
    modeButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    this.classList.add("selected");
    numSquares = 3;
    startGame();
  } else {
    modeButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    this.classList.add("selected");
    numSquares = 6;
    startGame();
  }
}

resetButton.addEventListener("click", startGame);
modeButtons.forEach((button) => button.addEventListener("click", handleMode));
startGame();
