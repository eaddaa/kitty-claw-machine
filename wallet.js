<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kitty Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.1/web3.min.js"></script>
    <link rel="stylesheet" href="styles.css"> <!-- Include your CSS file -->
</head>
<body>
    <div id="welcomeMessage">
        <h2>Welcome to the Kitty Game! 🎉</h2>
        <button id="connectWalletBtn">Connect Wallet</button>
        <div id="claimRewardsContainer" style="display: none;">
            <button id="claimRewardsBtn">Claim Rewards</button>
        </div>
    </div>
    <canvas id="gameCanvas" width="400" height="400" style="display: none;"></canvas>
    <div id="score">Score: 0</div>
    <div id="timer">Time Left: 60s</div>
    <script src="game.js"></script> <!-- Include your game logic file -->
</body>
</html>
