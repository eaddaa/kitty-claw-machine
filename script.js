// HTML Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

// Yeni buton
const startGameBtn = document.createElement('button');
startGameBtn.textContent = "Start Game";
startGameBtn.style.display = "none"; // İlk başta görünmez
document.body.appendChild(startGameBtn);

let userAccount;
let web3;
let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            welcomeMessage.style.display = 'none';
            gameContainer.style.display = 'block';
            startGameBtn.style.display = "block"; // Cüzdan bağlandığında butonu göster
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again.");
        }
    } else {
        alert("Please install MetaMask.");
    }
}

// Click event for the wallet connection button
connectWalletBtn.addEventListener('click', connectWallet);

// Oyun başlatma butonuna tıklandığında
startGameBtn.addEventListener('click', startGame);

// Game start function
function startGame() {
    score = 0; // Reset score
    timeLeft = 60; // Reset time
    scoreboard.textContent = `Score: ${score}`; // Show score
    updateTimer(); // Start timer
    kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
    gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
    startGameBtn.style.display = "none"; // Oyun başladıktan sonra butonu gizle
}

// Function to move kittens
function moveKittens() {
    const kitten = document.createElement('div');
    kitten.classList.add('kitten');
    const randomX = Math.random() * (gameCanvas.width - 50);
    const randomY = Math.random() * (gameCanvas.height - 50);
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten);

    // Add click event for the kitten
    kitten.addEventListener('click', function() {
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

// Update game state
function updateGame() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer(); // Update timer
    } else {
        clearInterval(gameInterval);
        clearInterval(kittenInterval);
        alert("Game over! Your score: " + score);
        resetGame();
    }
}

// Update timer
function updateTimer() {
    timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;
}

// Reset game function
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
    welcomeMessage.style.display = 'block'; // Show welcome message again
    gameContainer.style.display = 'none'; // Hide game area
}

// Reward claiming function
claimRewardsBtn.addEventListener("click", function() {
    if (!userAccount) {
        alert("Please connect your wallet first.");
    } else {
        alert("Rewards claimed successfully!"); // Placeholder for claiming rewards functionality
    }
});

