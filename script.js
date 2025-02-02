// --- HTML Elements ---
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');
const startGameBtn = document.getElementById('startGameBtn');

// --- Game Variables ---
let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;
let userAddress = null;

// --- Blockchain Integration Variables ---
const adminAddress = "kitty194tqyp4kk7pmrjhnf0dfzz72dqlvtuglh8exxt"; // Admin address holding KITTY tokens
const chainId = "dymension_1100-1"; // Dymension Mainnet chain ID
const rpcEndpoint = "https://dymension-mainnet.public.blastapi.io"; // RPC Endpoint
const restEndpoint = "https://dymension-mainnet-rest.public.blastapi.io"; // REST Endpoint

// --- Keplr Wallet Connection Function ---
async function connectWallet() {
  if (!window.keplr) {
    alert("Please install the Keplr wallet.");
    return null;
  }
  try {
    // Suggest the Dymension chain to Keplr (if not already added)
    await window.keplr.experimentalSuggestChain({
      chainId: chainId,
      chainName: "Dymension Mainnet",
      rpc: rpcEndpoint,
      rest: restEndpoint,
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "dym",
        bech32PrefixAccPub: "dympub",
        bech32PrefixValAddr: "dymvaloper",
        bech32PrefixValPub: "dymvaloperpub",
        bech32PrefixConsAddr: "dymvalcons",
        bech32PrefixConsPub: "dymvalconspub",
      },
      currencies: [
        {
          coinDenom: "UDYM",
          coinMinimalDenom: "udym",
          coinDecimals: 6,
          coinGeckoId: "dymension",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "UDYM",
          coinMinimalDenom: "udym",
          coinDecimals: 6,
          coinGeckoId: "dymension",
        },
      ],
      stakeCurrency: {
        coinDenom: "UDYM",
        coinMinimalDenom: "udym",
        coinDecimals: 6,
        coinGeckoId: "dymension",
      },
      features: ["stargate", "ibc-transfer"],
    });

    // Enable the chain and get accounts
    await window.keplr.enable(chainId);
    const accounts = await window.keplr.getAccounts(chainId);
    userAddress = accounts[0].address;
    console.log("Connected address:", userAddress);
    return userAddress;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    alert("Failed to connect wallet. Please check your Keplr settings.");
    return null;
  }
}

// --- Game Initialization and Logic ---
connectWalletBtn.addEventListener('click', async () => {
  const connected = await connectWallet();
  if (connected) {
    welcomeMessage.style.display = 'none';
    gameContainer.style.display = 'block';
    startGameBtn.style.display = "block"; // Show Start Game button after wallet is connected
  }
});

startGameBtn.addEventListener('click', startGame);

function startGame() {
  score = 0;
  timeLeft = 60;
  scoreboard.textContent = `Score: ${score}`;
  updateTimer();
  kittenInterval = setInterval(moveKittens, 1000); // Create a kitten every second
  gameInterval = setInterval(updateGame, 1000); // Update game state every second
  startGameBtn.style.display = "none";
}

function moveKittens() {
  const kitten = document.createElement('div');
  kitten.classList.add('kitten');
  const randomX = Math.random() * (gameCanvas.clientWidth - 50);
  const randomY = Math.random() * (gameCanvas.clientHeight - 50);
  kitten.style.left = `${randomX}px`;
  kitten.style.top = `${randomY}px`;
  gameCanvas.appendChild(kitten);

  // When a kitten is clicked, increment the score and remove the kitten
  kitten.addEventListener('click', () => {
    score++;
    scoreboard.textContent = `Score: ${score}`;
    gameCanvas.removeChild(kitten);
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
    updateTimer();
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
  welcomeMessage.style.display = 'block';
  gameContainer.style.display = 'none';
}

// --- Reward Claim Function ---
// Players with a score of at least 1000 can claim 100 KITTY tokens.
async function claimReward() {
  if (!userAddress) {
    alert("Please connect your wallet first.");
    return;
  }
  if (score < 1000) {
    alert("Your score must be at least 1000 to claim rewards.");
    return;
  }

  // Construct the transaction message to send 100 KITTY tokens from admin to the user
  const msgSend = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: adminAddress,
      toAddress: userAddress,
      amount: [
        {
          denom: "kitty", // The denomination for KITTY tokens
          amount: "100",
        },
      ],
    },
  };

  // Define fee and gas settings
  const fee = {
    amount: [
      {
        denom: "udym",
        amount: "7000000000", // Adjust fee amount as needed
      },
    ],
    gas: "200000",
  };

  // Construct the transaction object
  const tx = {
    msgs: [msgSend],
    fee: fee,
    memo: "",
    signatures: [],
  };

  try {
    // Sign the transaction using Keplr's Amino signer
    const signResponse = await window.keplr.signAmino(chainId, adminAddress, tx);
    // Broadcast the transaction using the RPC endpoint
    const response = await fetch(rpcEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "broadcast_tx_commit",
        method: "broadcast_tx_commit",
        params: [signResponse.signed],
      }),
    });
    const result = await response.json();
    if (result.error) {
      console.error("Transaction failed:", result.error);
      alert("Failed to claim reward.");
    } else {
      console.log("Transaction result:", result.result);
      alert("Successfully claimed 100 KITTY tokens!");
    }
  } catch (error) {
    console.error("Failed to sign or broadcast transaction:", error);
    alert("Failed to claim reward.");
  }
}

// --- Claim Reward Button Event Listener ---
claimRewardsBtn.addEventListener("click", claimReward);

