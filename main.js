let resultText = document.querySelector('.result-text');
let resultImg = document.querySelector('.result-img');
let chanceText = document.querySelector('.chance-text');
let inputElem = document.querySelector('.input');
let playButton = document.querySelector('.play-btn');
let resetElem = document.querySelector('.reset-btn');

let computerNum = 0;
let gameOver = false;
let chance = 5;
let userValueList = [];

chanceText.innerHTML = `남은기회: ${chance}`;
playButton.addEventListener('click', play);
playButton.addEventListener('click', focusInput);
resetElem.addEventListener('click', reset);
inputElem.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    play();
    focusInput();
  }
});

function getRandom() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log('정답', computerNum);
}

function focusInput() {
  inputElem.value = '';
  inputElem.focus();
}

function play() {
  const userValue = inputElem.value;

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = '1부터 100사이의 값을 입력해주세요.';
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.innerHTML = `이미 입력한 숫자입니다.</br> 다른 숫자를 입력해주세요.`;
    return;
  }

  chance--;
  chanceText.innerHTML = `남은기회: ${chance}`;
  userValueList.push(userValue);

  if (userValue < computerNum) {
    resultImg.src = 'images/up.gif';
    resultText.textContent = 'UP!!!';
  } else if (userValue > computerNum) {
    resultImg.src = 'images/down.gif';
    resultText.textContent = 'DOWN!!!';
  } else if (userValue == computerNum) {
    resultImg.src = 'images/correct.gif';
    resultText.textContent = '정답!!!🎉';
    playButton.style.backgroundColor = '#dfe6e9';
    gameOver = true;
  }

  if (chance == 0) {
    playButton.style.backgroundColor = '#dfe6e9';
  }

  if (chance == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  getRandom();
  focusInput();
  resultImg.src = 'images/opening.gif';
  resultText.textContent = '🚀 숫자를 맞춰보세요 🚀';
  playButton.style.backgroundColor = '#74b9ff';
  gameOver = false;
  chance = 5;
  playButton.disabled = false;
  chanceText.innerHTML = `남은기회: ${chance}`;
  userValueList = [];
}

getRandom();
