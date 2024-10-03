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
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            connectWalletBtn.style.display = 'none'; // Hide button after connecting
            claimRewardsBtn.style.display = 'block'; // Show claim rewards button
            startGame(); // Start the game after connecting
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

// Start the game after wallet connection
function startGame() {
    document.getElementById('welcomeMessage').style.display = 'none'; // Hide the welcome message
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block'; // Show the game canvas
    const ctx = canvas.getContext('2d');

    let score = 0;
    let timeLeft = 60;

    // Load cat image
    const catImage = new Image();
    catImage.src = './cat.png'; // Ensure this image is available in the same directory

    // Cat initial position and dimensions
    let catX = Math.random() * (canvas.width - 50);
    let catY = Math.random() * (canvas.height - 50);
    const catWidth = 50;
    const catHeight = 50;

    // Start the timer
    startTimer();

    // Draw the cat image when loaded
    catImage.onload = function() {
        draw();
    };

    // Draw function
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(catImage, catX, catY, catWidth, catHeight); // Draw the cat
    }

    // Click event to increase score and move the cat
    canvas.addEventListener('click', function(event) {
        if (event.offsetX > catX && event.offsetX < catX + catWidth &&
            event.offsetY > catY && event.offsetY < catY + catHeight) {
            score += 10; // Increase score by 10
            document.getElementById('score').textContent = `Score: ${score}`;

            // Move the cat to a new random position
            catX = Math.random() * (canvas.width - catWidth);
            catY = Math.random() * (canvas.height - catHeight);
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
            }
        }, 1000); // Countdown every second
    }
}


