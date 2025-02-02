// script.js

import { connectWallet, claimReward } from './wallet.js';

let isMusicPlaying = false;
let userAddress = null;
let userScore = 0;
let gameInterval = null;
let gameDuration = 60; // Game duration in seconds

// Event listeners for UI buttons
document.getElementById('connectWalletBtn').addEventListener('click', async () => {
  userAddress = await connectWallet();
  if (userAddress) {
    document.getElementById('welcomeMessage').innerText = `Connected: ${userAddress}`;
    document.getElementById('connectWalletBtn').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    // Optionally, show the Start Game button
    document.getElementById('startGameBtn').style.display = 'block';
  }
});

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('playMusicBtn').addEventListener('click', playMusic);
document.getElementById('pauseMusicBtn').addEventListener('click', pauseMusic);
document.getElementById('claimRewardsBtn').addEventListener('click', async () => {
  await claimReward(userAddress, userScore);
});

// Function to start the game
function startGame() {
  userScore = 0;
  gameDuration = 60;
  document.getElementById('scoreboard').innerText = `Score: ${userScore}`;
  document.getElementById('timeLeft').innerText = `Time Left: ${gameDuration}s`;
  spawnKittens();
  gameInterval = setInterval(updateGame, 1000);
  document.getElementById('startGameBtn').style.display = 'none';
}

// Function to update game timer and check end conditions
function updateGame() {
  gameDuration--;
  document.getElementById('timeLeft').innerText = `Time Left: ${gameDuration}s`;
  if (gameDuration <= 0) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${userScore}`);
    // Show the claim rewards button if score threshold is met
    if (userScore >= 1000) {
      document.getElementById('claimRewardsBtn').style.display = 'block';
    }
  }
}

// Function to spawn kittens on the canvas
function spawnKittens() {
  const canvas = document.getElementById('gameCanvas');
  // Clear any existing kittens
  canvas.innerHTML = '';
  // Spawn 5 kittens
  for (let i = 0; i < 5; i++) {
    const kitten = document.createElement('div');
    kitten.className = 'kitten';
    kitten.style.top = Math.random() * (canvas.offsetHeight - 50) + 'px';
    kitten.style.left = Math.random() * (canvas.offsetWidth - 50) + 'px';
    // On click, increase score and remove the kitten
    kitten.addEventListener('click', () => {
      userScore += 100; // Each kitten gives 100 points
      document.getElementById('scoreboard').innerText = `Score: ${userScore}`;
      kitten.remove();
    });
    canvas.appendChild(kitten);
  }
}

// Function to play background music
function playMusic() {
  const music = document.getElementById('backgroundMusic');
  music.play().catch((error) => {
    console.error("Music playback failed:", error);
  });
  isMusicPlaying = true;
}

// Function to pause background music
function pauseMusic() {
  const music = document.getElementById('backgroundMusic');
  music.pause();
  isMusicPlaying = false;
}
