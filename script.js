// --- HTML Elements ---
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

// --- Game Variables ---
let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// --- Wallet Connection Button ---
connectWalletBtn.addEventListener('click', async () => {
    const connected = await connectWallet();
    if (connected) {
        welcomeMessage.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame();
    }
});

// --- Start Game Function ---
function startGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
    kittenInterval = setInterval(moveKittens, 1000);
    gameInterval = setInterval(updateGame, 1000);
}

// --- Move Kittens Function ---
function moveKittens() {
    const kitten = document.createElement('div');
    kitten.classList.add('kitten');
    const randomX = Math.random() * (gameCanvas.clientWidth - 50);
    const randomY = Math.random() * (gameCanvas.clientHeight - 50);
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten);

    kitten.addEventListener('click', function () {
        score++;
        scoreboard.textContent = `Score: ${score}`;
        gameCanvas.removeChild(kitten);
        if (score >= 1000) {
            claimRewardsBtn.style.display = "block";
        }
    });

    setTimeout(() => {
        if (gameCanvas.contains(kitten)) {
            gameCanvas.removeChild(kitten);
        }
    }, 5000);
}

// --- Update Game Function ---
function updateGame() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        clearInterval(gameInterval);
        clearInterval(kittenInterval);
        alert("Game over! Your score: " + score);
        resetGame();
    }
}

// --- Update Timer Function ---
function updateTimer() {
    timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;
}

// --- Reset Game Function ---
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
    welcomeMessage.style.display = 'block';
    gameContainer.style.display = 'none';
    claimRewardsBtn.style.display = "none";
}

// --- Claim Reward Button ---
claimRewardsBtn.addEventListener("click", async () => {
    const userAddress = await connectWallet();
    if (!userAddress) return;

    await claimReward(userAddress);
});
