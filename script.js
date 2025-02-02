// script.js

import { connectWallet, claimReward } from "./wallet.js";

// --- HTML Elements ---
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;
let userAddress = null;

// --- Game Functions ---
connectWalletBtn.addEventListener('click', async () => {
    userAddress = await connectWallet(); // Connect the wallet
    if (userAddress) {
        welcomeMessage.style.display = 'none';
        gameContainer.style.display = 'block';
        document.getElementById('startGameBtn').style.display = "block";
    }
});

document.getElementById('startGameBtn').addEventListener('click', startGame);

function startGame() {
    score = 0; // Reset score
    timeLeft = 60; // Reset time
    scoreboard.textContent = `Score: ${score}`; // Show score
    updateTimer(); // Start timer
    kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
    gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
    document.getElementById('startGameBtn').style.display = "none"; // Hide button after the game starts
}

function moveKittens() {
    const kitten = document.createElement('div');
    kitten.classList.add('kitten');
    const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Use clientWidth for proper width
    const randomY = Math.random() * (gameCanvas.clientHeight - 50); // Use clientHeight for proper height
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten);

    // Add click event for the kitten
    kitten.addEventListener('click', function () {
        score++;
        scoreboard.textContent = `Score: ${score}`;
        gameCanvas.removeChild(kitten); // Remove the kitten after clicking
    });

    // Remove kitten after 5 seconds if not clicked
    setTimeout(() => {
        if (gameCanvas.contains(kitten)) {
            gameCanvas.removeChild(kitten);
        }
    }, 5000);
}
