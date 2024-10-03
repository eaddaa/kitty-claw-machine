const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let catX = canvas.width / 2; // Initial X position (middle of the canvas)
let catY = canvas.height / 2; // Initial Y position (middle of the canvas)
let catSize = 20; // Size of the "cat"
let score = 0;
let timeLeft = 60; // Game time in seconds
let gameInterval;
let timerInterval;

// Function to draw the cat
function drawCat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = 'orange'; // Cat color
    ctx.fillRect(catX, catY, catSize, catSize); // Draw the cat
}

// Handle player input to move the cat
document.addEventListener('keydown', function(event) {
    const speed = 10; // How fast the cat moves
    if (event.key === 'ArrowUp') {
        catY = Math.max(0, catY - speed); // Move up, ensure it doesn't go out of bounds
    } else if (event.key === 'ArrowDown') {
        catY = Math.min(canvas.height - catSize, catY + speed); // Move down
    } else if (event.key === 'ArrowLeft') {
        catX = Math.max(0, catX - speed); // Move left
    } else if (event.key === 'ArrowRight') {
        catX = Math.min(canvas.width - catSize, catX + speed); // Move right
    }
    score += 1; // Increase score with each move
    document.getElementById('score').innerText = 'Score: ' + score; // Update score display
    drawCat(); // Redraw the cat at the new position
});

// Function to start the game and the timer
function initializeGame() {
    score = 0; // Reset score
    timeLeft = 60; // Reset timer to 60 seconds
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('timer').innerText = 'Time Left: ' + timeLeft + 's';
    drawCat(); // Draw the cat in the initial position

    // Game logic interval (redraw the cat every 20ms)
    gameInterval = setInterval(drawCat, 20);

    // Timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = 'Time Left: ' + timeLeft + 's';
        if (timeLeft <= 0) {
            clearInterval(gameInterval); // Stop the game when time is up
            clearInterval(timerInterval); // Stop the timer
            alert("Game over! Your final score is: " + score);
        }
    }, 1000); // Update timer every second
}

// This function is called from your wallet connection logic when the game starts
function startGame() {
    welcomeMessage.style.display = 'none'; // Hide welcome message
    gameContainer.style.display = 'block'; // Show the game container
    initializeGame(); // Initialize and start the game
}


