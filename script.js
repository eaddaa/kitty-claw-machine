let score = 0;
let timeLeft = 60;
const scoreboard = document.getElementById('scoreboard');
const timerDisplay = document.getElementById('timer');
const contractAddress = "0xYourContractAddress";  // Akıllı sözleşme adresini buraya ekle
const contractABI = [ /* Buraya ABI ekleyin */ ];

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            return accounts[0];
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    } else {
        alert("Please install MetaMask.");
    }
}

async function startGame() {
    const userAccount = await connectWallet();
    if (!userAccount) {
        alert("Connect wallet first!");
        return;
    }
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
}

async function claimTokens(score, userAccount) {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.claimRewards(score).send({ from: userAccount });
        alert(`You claimed ${score} KITTY Tokens!`);
    } catch (error) {
        console.error("Error claiming rewards:", error);
        alert("Transaction failed.");
    }
}

document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("claimRewardsBtn").addEventListener("click", async function() {
    const userAccount = await connectWallet();
    if (score > 0) {
        await claimTokens(score, userAccount);
    } else {
        alert("Score must be greater than 0!");
    }
});

