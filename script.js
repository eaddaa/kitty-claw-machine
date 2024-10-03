const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('score');
const gameContainer = document.getElementById('gameContainer');

let userAccount;
let web3;
let score = 0;
let timeLeft = 60;
let gameInterval;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Use Web3.js with the ethereum object
        try {
            // Request account access from the user
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            welcomeMessage.style.display = 'none'; // Hide welcome message after connecting
            gameCanvas.style.display = 'block'; // Show the game canvas
            gameContainer.style.display = 'block'; // Show the game box
            startGame(); // Start the game
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

// Reward claiming function
claimRewardsBtn.addEventListener("click", function() {
    if (!userAccount) {
        alert("Please connect your wallet first.");
    } else {
        alert("Rewards claimed successfully!"); // Placeholder for claiming rewards functionality
    }
});

// Start the game after wallet connection
function startGame() {
    // Game initialization logic here (e.g., reset score, set up game canvas)
    score = 0; // Reset score
    timeLeft = 60; // Reset time left
    scoreboard.textContent = `Score: ${score}`; // Display score
    updateTimer(); // Start the timer
    gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
}

// Update the game state
function updateGame() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer(); // Update timer display
    } else {
        clearInterval(gameInterval);
        alert("Game over! Your score: " + score);
        resetGame();
    }
}

// Update timer display
function updateTimer() {
    document.getElementById('timeLeft').textContent = `Time Left: ${timeLeft}s`;
}

// Reset the game
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
    welcomeMessage.style.display = 'block'; // Show the welcome message again
    gameCanvas.style.display = 'none'; // Hide the game canvas
    gameContainer.style.display = 'none'; // Hide the game box
}
