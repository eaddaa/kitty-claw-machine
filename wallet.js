// wallet.js

let userAccount;
let web3;

// Function to connect the wallet
async function connectWallet() {
    // Check if the Ethereum object is available in the window
    if (typeof window.ethereum !== 'undefined') {
        // Create a Web3 instance
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0]; // Store the first account
            console.log("Connected account:", userAccount);
            return true; // Successful connection
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again.");
            return false; // Connection failed
        }
    } else {
        alert("Please install MetaMask."); // Notify user to install MetaMask
        return false; // Connection failed
    }
}

// Function to retrieve the user account
function getUserAccount() {
    return userAccount; // Return the connected user account
}
