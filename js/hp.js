

let level = 200;
let downHp = 5;
let currentHp = 100;


let hpInterval = setInterval(setValue, level);


function setValue() {
  document.querySelector(".hp-bar-fill").style.width = currentHp + "%";
  currentHp -= downHp;
  if (currentHp < 0) {
    clearInterval(hpInterval);
  }
}

function restoreHp(amount) {
  currentHp += amount;
  if (currentHp > 100) {
    currentHp = 100;
  }
  document.querySelector(".hp-bar-fill").style.width = currentHp + "%";
}