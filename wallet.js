// wallet.js

let userAccount;
let web3;

// Function to connect to the wallet
async function connectWallet() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask provider
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
            userAccount = accounts[0]; // Get the first account
            console.log("Connected account:", userAccount);
            return true; // Connection successful
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again."); // Notify user on error
            return false; // Connection failed
        }
    } else {
        alert("Please install MetaMask."); // Prompt to install MetaMask if not present
        return false; // Connection failed
    }
}

// Function to get the connected user account
function getUserAccount() {
    return userAccount;
}
