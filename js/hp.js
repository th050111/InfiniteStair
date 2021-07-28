

let level = 1;
let currentHp = 100;

const LEVEL_MAX = 5;

const downHpLevel = [1.5,2,3,3.5,4.6];
const stairLevel = [20,50,100,200,300];


let hpInterval = setInterval(setValue, 100);

function restartHp() {
  clearInterval(hpInterval);
  currentHp = 100;
  level = 1;
  document.querySelector(".hp-bar-fill").style.width = currentHp + "%";
  hpInterval = setInterval(setValue, 100);
}

function setValue() {
  document.querySelector(".hp-bar-fill").style.width = currentHp + "%";
  currentHp -= downHpLevel[level-1];
  if (currentHp < 0) {
    clearInterval(hpInterval);
    if(!isDie)
    gameEnd();
  }
}

function restoreHp(amount) {
  currentHp += amount;

  if (currentHp > 100) {
    currentHp = 100;
  }
  document.querySelector(".hp-bar-fill").style.width = currentHp + "%";
}