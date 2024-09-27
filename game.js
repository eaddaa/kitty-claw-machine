let score = 0;
let timeLeft = 60;
let gameInterval;
let kittyInterval;

// Function to start the game
function startGame() {
  score = 0;
  timeLeft = 60;
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timeLeft;

  // Spawn cats every second
  kittyInterval = setInterval(spawnKitty, 1000);

  // Start countdown timer
  gameInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(kittyInterval);
      alert(`Game Over! Your score: ${score}`);
      // Optionally: send score to the backend to record the score
    }
  }, 1000);
}

// Function to spawn a kitty at a random position
function spawnKitty() {
  const kitty = document.createElement('div');
  kitty.classList.add('kitty');

  // Random position for the kitty
  const x = Math.random() * (350 - 50) + 50;
  const y = Math.random() * (350 - 50) + 50;
  kitty.style.left = `${x}px`;
  kitty.style.top = `${y}px`;

  // When kitty is clicked, increase score and remove the kitty
  kitty.onclick = function () {
    score++;
    document.getElementById('score').textContent = score;
    kitty.remove(); // Remove kitty after it's clicked
  };

  // Add the kitty to the game container
  document.getElementById('gameContainer').appendChild(kitty);

  // Remove the kitty after 2 seconds if not clicked
  setTimeout(() => {
    kitty.remove();
  }, 2000);
}
