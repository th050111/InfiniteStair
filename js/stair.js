//격자
const player = document.querySelector(".playground .player");
const gameUi = document.querySelector(".ui");
const currentScoreText = document.querySelector(".score");
const gameEndUi = document.querySelector(".playground .game-end-ui");
const lastScoreText = document.querySelector(".game-end-score > span");
const gameEndBestText = document.querySelector(".game-end-best > span");

//Setting
const BOLCK_MAX = 7;
const BLOCK_MIN = 4;
const BLOCK_HEIGHT = 35;

//variables
const type = {
  0: "stand",
  1: "run",
};
const currentPlayerLocation = [(GAME_COLS - 1) / 2, GAME_ROWS - 5];
let currentBlocks = [
  [3, GAME_ROWS - 4],
];
let groundDirection = "left";
let playerDirection = "left";
let toCreatBlocks;
let isRun = false;
let moveTimer = null;
let isDie = false;
let currentScore = 0;
let bestScore = 0;
let playerNumber = "4";
let dieMove;
let isDieMove = false;
let dieMoveInterval = null;


init();

//키 입력 받기
document.addEventListener("keyup", event => {
  let isArray = true;
  if (!isDie) {
    switch (event.keyCode) {
      case 39:
        playerDirection = "right";
        break;
      case 37:
        playerDirection = "left";
        break;
      default:
        isArray = false;
        break;
    }
    if (isArray) {
      move();
      movingImg();
    }
  }
});
document.querySelector(".restart-btn").addEventListener("click", restart);



//시작했을때 호출되는 함수
function init() {
  playerImage.style.backgroundImage = playerUrl;
  bestScore = localStorage.getItem("bestScore") === null ? 0 : Number(localStorage.getItem("bestScore"));


  toCreatBlocks = Math.floor(Math.random() * BOLCK_MAX) + BLOCK_MIN - 3;
  createNewBlocks();
  renderBlock();
}

//다시 시작
function restart() {
  isDieMove = false;
  clearInterval(dieMove);
  if (dieMoveInterval != null) {
    clearInterval(dieMoveInterval); y
  }
  //계단 블럭 삭제
  const stairBlocks = document.querySelectorAll(".stair");
  stairBlocks.forEach(moving => {
    moving.classList.remove("stair");
  });

  //최고기록 불러오기
  bestScore = localStorage.getItem("bestScore") === null ? 0 : Number(localStorage.getItem("bestScore"));

  //game ui 창 삭제
  isDie = false;
  gameEndUi.style.display = "none";

  //변수 초기화
  currentBlocks = [
    [3, GAME_ROWS - 4],
  ];
  groundDirection = "left";
  playerDirection = "left";
  isRun = false;
  moveTimer = null;
  isDie = false;
  currentScore = 0;
  currentScoreText.innerText = currentScore;

  //플레이어 위치 원래대로
  player.style.top = BLOCK_HEIGHT * (GAME_ROWS - 6) - 3 + "px";
  playerImage.style.transform = "none";
  //!!! 삭제
  playerImage.querySelector(".question-mark").style.display = "none";


  //투명도 원래대로
  gameUi.style.opacity = "1";

  toCreatBlocks = Math.floor(Math.random() * BOLCK_MAX) + BLOCK_MIN - 3;
  createNewBlocks();
  renderBlock();
}

//게임 끝났을때
function gameEnd() {
  setTimeout(() => {
    playerImage.querySelector(".question-mark").style.display = "inline";
  }, 500);
  setTimeout(dieAnimation, 1000);
  isDie = true;
  setTimeout(() => {
    gameEndUi.style.display = "block";
    gameUi.style.opacity = "0.5";
    lastScoreText.innerText = currentScore;
    gameEndBestText.innerText = bestScore;
    currentScore--;
    if (currentScore > bestScore) {
      localStorage.setItem("bestScore", String(currentScore));
    }
  }, 1200);
}


//죽을때 모션
function dieAnimation() {

  isDieMove = true;
  const style = getComputedStyle(player);
  let currentY = style.getPropertyValue("top");
  currentY = currentY.replace("px", "");
  currentY = Number(currentY);

  let moveY = 0;
  dieMove = setInterval(() => {
    if (isDieMove) {
      player.style.top = (currentY + moveY) + "px";
      moveY += 10;
      if ((currentY + moveY) > GAME_ROWS * BLOCK_HEIGHT + 7) {
        clearInterval(dieMove);
      }
    }
  }, 10);
}

//플레이어 이미지 애니메이션
function movingImg() {
  if (moveTimer != null)
    clearTimeout(moveTimer);
  playerImage.style.backgroundImage = playerUrl.replace("stand", "run");
  moveTimer = setTimeout(() => {
    playerImage.style.backgroundImage = playerUrl.replace("run", "stand");
  }, 100);
  if (playerDirection === "left") {
    playerImage.style.transform = "none";
  } else {
    playerImage.style.transform = "scaleX(-1)";
  }
}

//움직이기
function move() {

  //격자안의 계단 블럭들 삭제
  const stairBlocks = document.querySelectorAll(".stair");
  stairBlocks.forEach(moving => {
    moving.classList.remove("stair");
  });

  //새로운 배열 생성
  createNewBlocks();

  let i = 0;
  currentBlocks.forEach(block => {
    const x = block[0];
    const y = block[1];
    currentBlocks[i++] = playerDirection === "left" ? [x + 1, y + 1] : [x - 1, y + 1];
  })
  renderBlock();

  isEmpty(currentPlayerLocation);
  currentScore++;
  currentScoreText.innerText = currentScore;
}

//빈곳인지 확인
function isEmpty(location) {
  const x = location[0];
  const y = location[1];
  const target = playground.childNodes[y + 1].childNodes[0].childNodes[x];

  if (!target.classList.contains("stair")) {
    gameEnd();
  }
}


//블럭 생성
function renderBlock() {
  const blocks = [...currentBlocks];
  blocks.forEach(block => {
    const x = block[0];
    const y = block[1];
    if (x >= 0 && x < GAME_COLS && y >= 0 && y <= GAME_ROWS) {
      changClassName(block, "stair", null);
    }
  });
}

//나올 블럭 배열 생성
function createNewBlocks() {
  let extra = 0;
  while ((currentBlocks.length + extra) < GAME_ROWS) {
    if (toCreatBlocks === 0) {
      toCreatBlocks = Math.floor(Math.random() * BOLCK_MAX);
      if(toCreatBlocks < 1)
        toCreatBlocks = 1;
      else if(toCreatBlocks < 4){
        toCreatBlocks += BLOCK_MIN;
      }
      groundDirection = groundDirection === "right" ? "left" : "right";
    }
    let newLocation = currentBlocks[0];
    const x = newLocation[0];
    const y = newLocation[1];
    if (y > 0 && y < GAME_ROWS) {
      newLocation = groundDirection === "right" ? [x + 1, y - 1] : [x - 1, y - 1];
      currentBlocks.unshift(newLocation);
    } else {
      extra++;
      console.log("hi");
      toCreatBlocks++;
    }
    toCreatBlocks--;
  }
  if (extra === 0) {
    currentBlocks.pop();
  }
}


//좌표와 추가할 클래스이름, 삭제할 클래스이름
function changClassName(location, addName = null, deleteName = null) {
  const x = location[0];
  const y = location[1];
  const target = playground.childNodes[y].childNodes[0].childNodes[x];
  // if (!target.classList.contains("player")) {
  if (addName != null)
    target.classList.add(addName);
  if (deleteName != null)
    target.classList.remove(deleteName);
  // }
}

function deleteFirstBlocks(isDelete = true) {
  console.log("1");
  firstBlocks.forEach(block => {
    changClassName(block, null, "stair");
  })
  if (isDelete && firstBlocks.length != 0) {
    firstBlocks.shift();
  }
}
