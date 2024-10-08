<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KITTYVERSE GAME</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff; /* Arka plan rengi */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        #gameContainer {
            background-color: #40e0d0; /* Turkuaz rengi */
            border-radius: 15px; /* Yuvarlatılmış köşeler */
            padding: 20px; /* İç boşluk */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Gölge efekti */
            text-align: center; /* Metni ortalamak için */
        }

        h1 {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Yazı gölgesi */
            color: #fff; /* Yazı rengi */
        }

        button {
            margin-top: 10px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #ffffff;
            border: none;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>

    <h1>KITTYVERSE GAME</h1>
    <div id="welcomeMessage">Welcome to the Kittyverse Game!</div>
    <div id="gameContainer" style="display: none;">
        <canvas id="gameCanvas" width="400" height="400" style="border: 1px solid black;"></canvas>
        <div id="scoreboard">Score: 0</div>
        <div id="timeLeft">Time Left: 60s</div>
        <button id="claimRewardsBtn">Claim Rewards</button>
    </div>

    <button id="connectWalletBtn">Connect Wallet</button>
    <audio id="backgroundMusic" loop>
        <source src="music/music.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <script>
        // HTML Elements
        const connectWalletBtn = document.getElementById('connectWalletBtn');
        const claimRewardsBtn = document.getElementById('claimRewardsBtn');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const gameCanvas = document.getElementById('gameCanvas');
        const scoreboard = document.getElementById('scoreboard');
        const gameContainer = document.getElementById('gameContainer');
        const timeLeftDisplay = document.getElementById('timeLeft');
        const backgroundMusic = document.getElementById('backgroundMusic');

        let score = 0;
        let timeLeft = 60;
        let gameInterval;
        let kittenInterval;

        // Play background music
        backgroundMusic.play();

        // Click event for the wallet connection button
        connectWalletBtn.addEventListener('click', async () => {
            const connected = await connectWallet(); // Connect the wallet
            if (connected) {
                welcomeMessage.style.display = 'none';
                gameContainer.style.display = 'block';
                startGame(); // Start the game directly after wallet connection
            }
        });

        // Function to connect wallet (placeholder)
        async function connectWallet() {
            // Your wallet connection logic here
            return true; // Simulating successful connection
        }

        // When clicking the start game button
        function startGame() {
            score = 0; // Reset score
            timeLeft = 60; // Reset time
            scoreboard.textContent = `Score: ${score}`; // Show score
            updateTimer(); // Start timer
            kittenInterval = setInterval(moveKittens, 1000); // Move kittens every second
            gameInterval = setInterval(updateGame, 1000); // Call updateGame every second
        }

        // Function to move kittens
        function moveKittens() {
            const kitten = document.createElement('div');
            kitten.classList.add('kitten');
            const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Use clientWidth for proper width
            const randomY = Math.random() * (gameCanvas.clientHeight - 50); // Use clientHeight for proper height
            kitten.style.left = `${randomX}px`;
            kitten.style.top = `${randomY}px`;
            gameCanvas.appendChild(kitten);

            // Add click event for the kitten
            kitten.addEventListener('click', function() {
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

        // Update game state
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

        // Update timer
        function updateTimer() {
            timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;
        }

        // Reset game function
        function resetGame() {
            score = 0;
            timeLeft = 60;
            scoreboard.textContent = `Score: ${score}`;
            updateTimer();
            welcomeMessage.style.display = 'block'; // Show welcome message again
            gameContainer.style.display = 'none'; // Hide game area
        }

        // Reward claiming function
        claimRewardsBtn.addEventListener("click", function() {
            const userAccount = getUserAccount(); // Get wallet info
            if (!userAccount) {
                alert("Please connect your wallet first.");
            } else {
                claimRewards(score); // Claim rewards with the current score
                alert("Rewards claimed successfully! You claimed " + score + " KITTY tokens."); // Placeholder for claiming rewards functionality
            }
        });

        // Function to get user account (placeholder)
        function getUserAccount() {
            // Your logic to get user account
            return true; // Simulating user account retrieval
        }

        // Function to claim rewards (placeholder)
        function claimRewards(score) {
            // Your logic to claim rewards based on score
            console.log(`Claimed ${score} KITTY tokens.`);
        }
    </script>
</body>
</html>
