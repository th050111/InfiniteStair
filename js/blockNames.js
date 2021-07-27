const changeBack = document.querySelector(".change-back");
const changePlayer = document.querySelector(".change-player");
const changeStair = document.querySelector(".change-stair");

const changeBackText = document.querySelector(".change-back > span");
const changePlayerText = document.querySelector(".change-player > span");
const changeStairText = document.querySelector(".change-stair > span");



const playerType = localStorage.getItem("playerType") === null ? 1 : Number(localStorage.getItem("playerType"));
const groundType = localStorage.getItem("groundType") === null ? 1 : Number(localStorage.getItem("groundType"));
const stairType = localStorage.getItem("stairType") === null ? 1 : Number(localStorage.getItem("stairType"));

console.log(playerType,groundType,stairType);

let currentPlayerUrl = playerUrl;
let currentBackUrl = groundUrl;
let currentStairUrl = stairUrl;

let currentBackNumber = groundType;
let currentStairNumber = stairType;
let currentPlayerNumber = playerType;



const stairName = {
  1: "stair1",
  2: "stair2",
  3: "stair3",
  4: "stair4",
}

const playerName = {
  1: "player1",
  2: "player2",
  3: "player3",
  4: "player4",
}

const backName = {
  1: "background1",
  2: "background2",
}

document.querySelector(".stair").style.backgroundImage = stairUrl;
document.querySelector(".player-img").style.backgroundImage = playerUrl;
playground.style.backgroundImage = groundUrl;




changeBackText.innerText = backName[currentBackNumber];
changeStairText.innerText = stairName[currentStairNumber];
changePlayerText.innerText = playerName[currentPlayerNumber];


document.querySelector(".left-back").addEventListener("click", () => {
  currentBackNumber--;
  currentBackNumber = isOkay(currentBackNumber, BACK_MAX);
  console.log(currentBackNumber);
  changeBackText.innerText = backName[currentBackNumber];
  changeImg(1);
});
document.querySelector(".left-stair").addEventListener("click", () => {
  currentStairNumber--;
  currentStairNumber = isOkay(currentStairNumber, STAIR_MAX);
  changeStairText.innerText = stairName[currentStairNumber];
  changeImg(3);
});
document.querySelector(".left-player").addEventListener("click", () => {
  currentPlayerNumber--;
  currentPlayerNumber = isOkay(currentPlayerNumber, PLAYER_MAX);
  changePlayerText.innerText = playerName[currentPlayerNumber];
  changeImg(2);
});
document.querySelector(".right-back").addEventListener("click", () => {
  currentBackNumber++;
  currentBackNumber = isOkay(currentBackNumber, BACK_MAX);
  changeBackText.innerText = backName[currentBackNumber];
  changeImg(1);
});
document.querySelector(".right-stair").addEventListener("click", () => {
  currentStairNumber++;
  currentStairNumber = isOkay(currentStairNumber, STAIR_MAX);
  changeStairText.innerText = stairName[currentStairNumber];
  changeImg(3);
});
document.querySelector(".right-player").addEventListener("click", () => {
  currentPlayerNumber++;
  currentPlayerNumber = isOkay(currentPlayerNumber, PLAYER_MAX);
  changePlayerText.innerText = playerName[currentPlayerNumber];
  changeImg(2);
});


//변수 1~4만큼 되게
function isOkay(number, max) {
  if (number > max) {
    return 1;
  }
  else if (number <= 0) {
    return max;
  }

  return number;
}

function changeImg(type) {
  switch (type) {
    case 1:
      currentBackUrl = groundUrl.replace("background"+String(groundType), "background"+String(currentBackNumber))
      playground.style.backgroundImage = currentBackUrl;
      break;
    case 2:
      const toText = playerUrl.replace("player"+String(playerType), "player"+String(currentPlayerNumber));
      currentPlayerUrl= toText.replace("stand"+String(playerType), "stand"+String(currentPlayerNumber));
      document.querySelector(".player-img").style.backgroundImage  = currentPlayerUrl;
      console.log(currentPlayerUrl);
      break;
    case 3:
      currentStairUrl = stairUrl.replace("stair"+String(stairType), "stair"+String(currentStairNumber));
      document.querySelector(".stair").style.backgroundImage = currentStairUrl;
      break;
  }
}

function okImg(){
  localStorage.setItem("player-url",currentPlayerUrl);
  localStorage.setItem("ground-url",currentBackUrl);
  localStorage.setItem("stair-url",currentStairUrl);

  localStorage.setItem("playerType",currentPlayerNumber);
  localStorage.setItem("stairType",currentStairNumber);
  localStorage.setItem("groundType",currentBackNumber);
}