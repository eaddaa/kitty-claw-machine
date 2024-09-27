// Manage the wallet connection button
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');

let userAccount;
let web3;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Use Web3.js with the ethereum object
        try {
            // Request account access from the user
            const accounts = await web3.eth.requestAccounts();
            userAccount = accounts[0];
            connectWalletBtn.style.display = 'none'; // Hide button after connecting
            claimRewardsBtn.style.display = 'block'; // Show claim rewards button
            console.log("Connected account:", userAccount);
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
