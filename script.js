// --- HTML Elements ---
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
const contractAddress = "dym1278838f86a613193e9cf2efe8846b705674cbfe2"; // Dymension rollapp adresi
const chainId = "dym1-testnet"; // Dymension testnet ID'si

// --- Wallet Connection Function ---
async function connectWallet() {
    if (!window.keplr) {
        alert("Please install Keplr wallet.");
        return null;
    }

    try {
        await window.keplr.enable(chainId);
        const accounts = await window.keplr.getAccounts(chainId);
        const userAddress = accounts[0].address;
        console.log("Connected address:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet.");
        return null;
    }
}

// --- Claim Reward Function ---
async function claimReward(userAddress) {
    if (!userAddress || score < 1000) {
        alert("Please connect your wallet and reach 1000 points to claim rewards.");
        return;
    }

    const tx = {
        messages: [
            {
                typeUrl: "/your.module.score.MsgClaimReward",
                value: {
                    creator: userAddress,
                },
            },
        ],
        memo: "",
        fee: {
            amount: [],
            gas: "200000",
        },
        signerInfos: [
            {
                publicKey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: Buffer.from(window.keplr.getKey(chainId).pubkey, "base64").toString("base64"),
                },
                modeInfo: {
                    single: {
                        mode: "SIGN_MODE_DIRECT",
                    },
                },
                sequence: 0,
            },
        ],
        timeoutHeight: 0,
    };

    try {
        const signedTx = await window.keplr.signAmino(chainId, userAddress, tx);

        const response = await fetch("https://rpc.testnet.dymension.xyz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "broadcast",
                method: "broadcast_tx_commit",
                params: [signedTx],
            }),
        });

        const result = await response.json();
        if (result.error) {
            console.error("Transaction failed:", result.error);
            alert("Failed to claim reward.");
        } else {
            console.log("Transaction result:", result.result);
            alert(`Successfully claimed ${(score / 10).toFixed(2)} KITTY Tokens!`);
        }
    } catch (error) {
        console.error("Failed to sign and broadcast transaction:", error);
        alert("Failed to claim reward.");
    }
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
    document.getElementById('startGameBtn').style.display = "none"; // Hide button after the game starts
}

function moveKittens() {
    const kitten = document.createElement('div');
    kitten.classList.add('kitten');
    const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Use clientWidth for proper width
    const randomY = Math.random() * (gameCanvas.clientHeight - 50); // Use clientHeight for proper height
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten);

    // Add click event for the kitten
    kitten.addEventListener('click', function () {
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

// --- Reward Claim Button Event Listener ---
claimRewardsBtn.addEventListener("click", async () => {
    const userAddress = await connectWallet();
    if (!userAddress) return;

    await claimReward(userAddress);
});
