const playground = document.querySelector(".playground > ul");

const stairImage = document.querySelector(".player .stair");
const playerImage = document.querySelector(".player .player-img");
const groundImage = document.querySelector(".playground > ul");

const zoomOutBtn = document.querySelector(".zoom-out");
const zoomInBtn = document.querySelector(".zoom-in");

const GAME_ROWS = 20;
const GAME_COLS = 7;
let i = 0;


let currentZoom = localStorage.getItem("zoom") === null ? 100 : Number(localStorage.getItem("zoom"))

let groundUrl = localStorage.getItem("ground-url") === null ? "url('https://infinitestair.tgim4253.repl.co/img/back/background1.jpg')" : localStorage.getItem("ground-url")
let stairUrl = localStorage.getItem("stair-url") === null ? "url('https://infinitestair.tgim4253.repl.co/img/stair/stair1.png')" : localStorage.getItem("stair-url")
let playerUrl = localStorage.getItem("player-url") === null ? "url('https://infinitestair.tgim4253.repl.co/img/player/player1/stand1.png')" : localStorage.getItem("player-url");



document.documentElement.style.setProperty("--stair-url", stairUrl);
document.documentElement.style.setProperty("--playerUrl-url", playerUrl);
document.documentElement.style.setProperty("--background-url", groundUrl);

playground.style.zoom = currentZoom + "%";

zoomInBtn.addEventListener("click", () => {
  currentZoom += 10;
  if (currentZoom < 150) {
    playground.style.zoom = currentZoom + "%";
    localStorage.setItem("zoom", currentZoom);
  } else {
    currentZoom -= 10;
  }
})

zoomOutBtn.addEventListener("click", () => {
  currentZoom -= 10;
  if (currentZoom > 50) {
    playground.style.zoom = currentZoom + "%";
    localStorage.setItem("zoom", currentZoom);
  } else {
    currentZoom += 10;
  }
})



// 격자 생성
for (let i = 0; i < GAME_ROWS; i++) {
  prependNewLine();
}

//줄 생성
function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement("li");

    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

//배경 이미지 생성
playground.style.backgroundImage = groundUrl;