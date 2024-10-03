// Manage the wallet connection button
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameContainer = document.getElementById('gameContainer'); // Assuming you have a game container
const gameCanvas = document.getElementById('gameCanvas');

let userAccount;
let web3;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Use Web3.js with the ethereum object
        try {
            // Request account access from the user
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            connectWalletBtn.style.display = 'none'; // Hide button after connecting
            claimRewardsBtn.style.display = 'block'; // Show claim rewards button
            startGame(); // Start the game after connecting
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
        alert("Rewards claimed successfully!"); // Update this with more functionality as needed
    }
});

// Start the game after wallet connection
function startGame() {
    welcomeMessage.style.display = 'none'; // Hide the welcome message
    gameContainer.style.display = 'block'; // Show the game container
    gameCanvas.style.display = 'block'; // Show the game canvas
    initializeGame(); // Initialize game state if needed
}

// Example initialization function for game state (you can expand this)
function initializeGame() {
    // Reset scores, timers, and other necessary game variables
    console.log("Game initialized.");
}
