// HTML Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');
const backgroundMusic = document.getElementById('backgroundMusic');

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// Play background music
backgroundMusic.play();

// Click event for the wallet connection button
connectWalletBtn.addEventListener('click', async () => {
    const connected = await connectWallet(); // Connect the wallet
    if (connected) {
        welcomeMessage.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame(); // Start the game directly after wallet connection
    }
});

// Function to connect wallet (placeholder)
async function connectWallet() {
    // Your wallet connection logic here
    return true; // Simulating successful connection
}

// When clicking the start game button
function startGame() {
    score = 0; // Reset score
    timeLeft = 60; // Reset time
    scoreboard.textContent = `Score: ${score}`; // Show score
    updateTimer(); // Start timer
    kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
    gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
}

// Function to move kittens
function moveKittens() {
    const kitten = document.createElement('img');
    kitten.src = 'images/kitten.png'; // Kedi görseli
    kitten.style.position = 'absolute';
    const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Use clientWidth for proper width
    const randomY = Math.random() * (gameCanvas.clientHeight - 50); // Use clientHeight for proper height
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
    const userAccount = getUserAccount(); // Get wallet info
    if (!userAccount) {
        alert("Please connect your wallet first.");
    } else {
        claimRewards(score); // Claim rewards with the current score
        alert("Rewards claimed successfully! You claimed " + score + " KITTY tokens."); // Placeholder for claiming rewards functionality
    }
});

// Function to get user account (placeholder)
function getUserAccount() {
    // Your logic to get user account
    return true; // Simulating user account retrieval
}

// Function to claim rewards (placeholder)
function claimRewards(score) {
    // Your logic to claim rewards based on score
    console.log(`Claimed ${score} KITTY tokens.`);
}
