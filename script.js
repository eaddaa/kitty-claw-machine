// script.js

import { connectWallet, claimReward } from './wallet.js';

// HTML Elemanları
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameContainer = document.getElementById('gameContainer');
const scoreboard = document.getElementById('scoreboard');
const timeLeftDisplay = document.getElementById('timeLeft');
const startGameBtn = document.getElementById('startGameBtn');

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;
let userAddress = null;

// Olay Dinleyicileri
connectWalletBtn.addEventListener('click', async () => {
  userAddress = await connectWallet();
  if (userAddress) {
    welcomeMessage.style.display = 'none';
    gameContainer.style.display = 'block';
    startGameBtn.style.display = 'block';
  }
});

startGameBtn.addEventListener('click', startGame);

claimRewardsBtn.addEventListener('click', async () => {
  if (!userAddress) {
    alert('Lütfen önce cüzdanınızı bağlayın.');
    return;
  }
  await claimReward(userAddress, score);
});

// Oyun Fonksiyonları
function startGame() {
  score = 0;
  timeLeft = 60;
  scoreboard.textContent = `Puan: ${score}`;
  updateTimer();
  kittenInterval = setInterval(moveKittens, 1000);
  gameInterval = setInterval(updateGame, 1000);
  startGameBtn.style.display = 'none';
}

function moveKittens() {
  // Kedilerin hareket etme mantığını buraya ekleyin
}

function updateGame() {
  // Oyun güncelleme mantığını buraya ekleyin
}

function updateTimer() {
  timeLeftDisplay.textContent = `Kalan Süre: ${timeLeft}s`;
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(gameInterval);
    clearInterval(kittenInterval);
    alert('Oyun Bitti!');
  }
}
