// script.js

// HTML Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// --- Blockchain Integration Variables ---
// Replace with your deployed smart contract address and ABI
const contractAddress = "0x580b5069547d7583ee227dbc263fd320f3fe6061";  
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "score",
        "type": "uint256"
      }
    ],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// --- Wallet Connection Functions ---
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      return accounts[0]; // Return the first account address
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  } else {
    alert("Please install MetaMask or another Web3-compatible wallet.");
    return null;
  }
}

async function getUserAccount() {
  return await connectWallet();
}

// --- Game Functions ---
connectWalletBtn.addEventListener('click', async () => {
  const connected = await connectWallet(); // Connect the wallet
  if (connected) {
    welcomeMessage.style.display = 'none';
    gameContainer.style.display = 'block';
    document.getElementById('startGameBtn').style.display = "block"; // Show button to start the game
  }
});

document.getElementById('startGameBtn').addEventListener('click', startGame);

function startGame() {
  score = 0; // Reset score
  timeLeft = 60; // Reset time
  scoreboard.textContent = `Score: ${score}`; // Show score
  updateTimer(); // Start timer
  kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
  gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
  document.getElementById('startGameBtn').style.display = "none"; // Hide start button after game starts
}

function moveKittens() {
  const kitten = document.createElement('div');
  kitten.classList.add('kitten');
  const randomX = Math.random() * (gameCanvas.clientWidth - 50);
  const randomY = Math.random() * (gameCanvas.clientHeight - 50);
  kitten.style.left = `${randomX}px`;
  kitten.style.top = `${randomY}px`;
  gameCanvas.appendChild(kitten);

  // When the kitten is clicked, increment score and remove the kitten
  kitten.addEventListener('click', function() {
    score++;
    scoreboard.textContent = `Score: ${score}`;
    gameCanvas.removeChild(kitten);
  });

  // Remove kitten after 5 seconds if not clicked
  setTimeout(() => {
    if (gameCanvas.contains(kitten)) {
      gameCanvas.removeChild(kitten);
    }
  }, 5000);
}

function updateGame() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimer(); // Update timer
  } else {
    clearInterval(gameInterval);
    clearInterval(kittenInterval);
    alert("Game over! Your score: " + score);
    // Optionally, you could add an on-chain call to save the final score here
    resetGame();
  }
}

function updateTimer() {
  timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;
}

function resetGame() {
  score = 0;
  timeLeft = 60;
  scoreboard.textContent = `Score: ${score}`;
  updateTimer();
  welcomeMessage.style.display = 'block'; // Show welcome message again
  gameContainer.style.display = 'none'; // Hide game area
}

// --- Blockchain Reward Claim Function ---
// This function calls your smart contract's claimRewards function, ensuring 1 score = 1 KITTY token.
async function claimTokens(score, userAccount) {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return;
  }

  // Initialize Web3 with MetaMask's provider
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    // Call the smart contract's claimRewards function with the player's score
    await contract.methods.claimRewards(score).send({ from: userAccount });
    alert(`Successfully claimed ${score} KITTY Tokens!`);
  } catch (error) {
    console.error("Error claiming tokens:", error);
    alert("Token claim failed. Please check the console for details.");
  }
}

// --- Reward Claim Button Event Listener ---
claimRewardsBtn.addEventListener("click", async function() {
  const userAccount = await getUserAccount();
  if (!userAccount) {
    alert("Please connect your wallet first.");
    return;
  }
  
  if (score <= 0) {
    alert("Score must be greater than 0 to claim rewards.");
    return;
  }

  // Claim tokens based on the score. The smart contract should enforce 1 score = 1 KITTY token and prevent cheating.
  await claimTokens(score, userAccount);
});

