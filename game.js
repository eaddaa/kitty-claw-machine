const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let timeLeft = 60;

// Load cat image
const catImage = new Image();
catImage.src = './cat.png'; // Make sure this image exists in the same directory

// Cat initial position and dimensions
let catX = Math.random() * (canvas.width - 50);
let catY = Math.random() * (canvas.height - 50);
const catWidth = 50;
const catHeight = 50;

// Start the timer
function startGame() {
    startTimer();
    draw(); // Initial draw of the cat
}

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


