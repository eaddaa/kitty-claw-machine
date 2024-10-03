// Manage the wallet connection button
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

let userAccount;
let web3;
let score = 0;
let timeLeft = 60;

// Load cat image
const catImage = new Image();
catImage.src = './cat.png'; // Ensure this image is available in the same directory

// Cat initial position and dimensions
let catX;
let catY;
const catWidth = 50;
const catHeight = 50;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Use Web3.js with the ethereum object
        try {
            // Request account access from the user
            const accounts = await web3.eth.requestAccounts();
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            welcomeMessage.style.display = 'none'; // Hide welcome message
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

// Start the game
function startGame() {
    gameCanvas.style.display = 'block'; // Show the game canvas
    claimRewardsBtn.style.display = 'block'; // Show claim rewards button
    startTimer(); // Start the timer
    initializeCatPosition(); // Initialize cat position
    draw(); // Draw the cat
}

// Initialize cat position
function initializeCatPosition() {
    catX = Math.random() * (gameCanvas.width - catWidth);
    catY = Math.random() * (gameCanvas.height - catHeight);
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear the canvas
    ctx.drawImage(catImage, catX, catY, catWidth, catHeight); // Draw the cat
}

// Click event to increase score and move the cat
gameCanvas.addEventListener('click', function(event) {
    if (event.offsetX > catX && event.offsetX < catX + catWidth &&
        event.offsetY > catY && event.offsetY < catY + catHeight) {
        score += 10; // Increase score by 10
        document.getElementById('score').textContent = `Score: ${score}`;

        // Move the cat to a new random position
        initializeCatPosition();
        draw();
    }
});

// Timer function
function startTimer() {
    const timerInterval = setInterval(function() {
        timeLeft -= 1;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your final score is: ${score}`);
            resetGame();
        }
    }, 1000); // Countdown every second
}

// Reset game function
function resetGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    gameCanvas.style.display = 'none'; // Hide the game canvas
    welcomeMessage.style.display = 'block'; // Show welcome message again
}


