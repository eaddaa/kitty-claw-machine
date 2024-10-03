// script.js

// HTML Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

// New button for starting the game
const startGameBtn = document.createElement('button');
startGameBtn.textContent = "Start Game";
startGameBtn.style.display = "none"; // Initially hidden
document.body.appendChild(startGameBtn);

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// Click event for the wallet connection button
connectWalletBtn.addEventListener('click', async () => {
    const connected = await connectWallet(); // Connect the wallet
    if (connected) {
        welcomeMessage.style.display = 'none'; // Hide welcome message after connecting
        gameContainer.style.display = 'block'; // Show game container
        startGameBtn.style.display = "block"; // Show the start game button
    }
});

// When the start game button is clicked
startGameBtn.addEventListener('click', startGame);

// Game start function
function startGame() {
    score = 0; // Reset score
    timeLeft = 60; // Reset time
    scoreboard.textContent = `Score: ${score}`; // Show score
    updateTimer(); // Start timer
    kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
    gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
    startGameBtn.style.display = "none"; // Hide start game button after game starts
}

// Function to move kittens
function moveKittens() {
    const kitten = document.createElement('div');
    kitten.classList.add('kitten'); // Add a class for styling
    const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Ensure it fits in the canvas
    const randomY = Math.random() * (gameCanvas.clientHeight - 50);
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten); // Add the kitten to the canvas

    // Add click event for the kitten
    kitten.addEventListener('click', function() {
        score++; // Increase score on click
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
        resetGame(); // Reset the game after time runs out
    }
}

// Update timer display
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
    const userAccount = getUserAccount(); // Get user account
    if (!userAccount) {
        alert("Please connect your wallet first.");
    } else {
        alert("Rewards claimed successfully!"); // Placeholder for claiming rewards functionality
    }
});

