const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');

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
            welcomeMessage.style.display = 'none'; // Hide welcome message after connecting
            gameCanvas.style.display = 'block'; // Show the game canvas
            scoreboard.style.display = 'flex'; // Show the scoreboard
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
