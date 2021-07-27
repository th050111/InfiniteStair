
const mainMenu = document.querySelector(".main-menu")
const dressRoom = document.querySelector(".dressing-room");
const player = document.querySelector(".playground .player");
const stair = document.querySelector(".stair");



const BACK_MAX = 2;
const STAIR_MAX = 4;
const PLAYER_MAX = 4;

//변수들
let currentY;




//플레이버튼 누를 시
document.querySelector(".play-btn").addEventListener("click", () => {
  location.href = "playGame.html";
})

//이름들 초기화





//드레스룸으로 이동
function turnToDress() {
  mainMenu.style.display = "none";
  dressRoom.style.display = "block";

  const style = getComputedStyle(player);
  currentY = style.getPropertyValue("top");
  currentY = currentY.replace("px", "");
  currentY = Number(currentY);

  player.style.top = (currentY - 70) + "px";
}

function turnToMain() {
  mainMenu.style.display = "block";
  dressRoom.style.display = "none";

  const style = getComputedStyle(player);

  player.style.top = currentY + "px";

  okImg();
}


function zoomout() {
  document.body.style.zoom = 70 + "%";
}