// wallet.js

let userAccount;
let web3;

// Wallet connection function
async function connectWallet() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            
            // Show the game container and hide the welcome message after successful connection
            document.getElementById('welcomeMessage').style.display = 'none';
            document.getElementById('gameContainer').style.display = 'block';

            // Start the game here if necessary
            startGame();

            return true; // Connection successful
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again.");
            return false; // Connection failed
        }
    } else {
        alert("Please install MetaMask.");
        return false; // Connection failed
    }
}

// Return user account
function getUserAccount() {
    return userAccount;
}

// Add event listener to connect wallet button
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
