const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let timeLeft = 60;
let fallingCats = [];
let gameInterval;
let timerInterval;

// Cat object class
class Cat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 2 + 1; // Random falling speed
        this.image = new Image();
        this.image.src = "assets/cat.png"; // Image path
    }

    // Draw the cat on the canvas
    draw() {
        ctx.drawImage(this.image, this.x, this.y, 50, 50);
    }

    // Make the cat fall
    fall() {
        this.y += this.speed;
    }
}

// Generate random cats at the top of the canvas
function generateCats() {
    const x = Math.random() * (canvas.width - 50); // Ensure cats stay within canvas
    const newCat = new Cat(x, 0); // Start at the top (y = 0)
    fallingCats.push(newCat);
}

// Catch a cat and update the score
function catchCat(catIndex) {
    score += 100; // Increase score
    fallingCats.splice(catIndex, 1); // Remove the caught cat
}

// Update the game by redrawing the canvas and moving the cats
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    fallingCats.forEach((cat, index) => {
        cat.fall();
        cat.draw();
        
        // End game if a cat falls off the screen
        if (cat.y > canvas.height) {
            alert("Game Over! Your Score: " + score);
            resetGame();
        }
    });

    // Update score and time display
    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = timeLeft;
}

// Reset the game when time runs out or when a cat reaches the bottom
function resetGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    score = 0;
    timeLeft = 60;
    fallingCats = [];
    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = timeLeft;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's Up! Your Score: " + score);
            resetGame();
        }
        document.getElementById('timeLeft').textContent = timeLeft;
    }, 1000);
}

// Start the game and timer
function startGame() {
    gameInterval = setInterval(generateCats, 1000); // Generate a new cat every second
    startTimer(); // Start the timer
    gameLoop(); // Start the game loop
}

// Start the game loop to update the canvas
function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

// Detect mouse click to catch cats
canvas.addEventListener("click", function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    fallingCats.forEach((cat, index) => {
        if (mouseX >= cat.x && mouseX <= cat.x + 50 && mouseY >= cat.y && mouseY <= cat.y + 50) {
            catchCat(index); // Catch the cat
        }
    });
});

// Start the game
startGame();
