// wallet.js

// Function to connect to MetaMask (which must be configured for your Dymension network)
// Your chain details: 
//   Chain ID: kittyverse_595973-1
//   RPC: https://dymrollapp-rpc.kittyverse.click
//   REST: https://dymrollapp-rest.kittyverse.click
//   EVM Endpoint: https://dymrollapp-evm.kittyverse.click

export async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      console.log('Connected wallet address:', userAddress);
      return userAddress;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      return null;
    }
  } else {
    alert("Please install MetaMask!");
    return null;
  }
}

// Function to claim rewards
// This example simply logs the action.
// Replace this with your actual reward transfer logic from your wallet.
export async function claimReward(userAddress, score) {
  const thresholdScore = 1000;
  const rewardAmount = 100; // 100 KITTY tokens reward
  if (score < thresholdScore) {
    alert(`You need at least ${thresholdScore} points to claim rewards.`);
    return;
  }
  console.log(`Claiming ${rewardAmount} KITTY tokens for ${userAddress} with score ${score}.`);
  // Here, implement the token transfer from your wallet.
  // This could involve constructing a transaction and sending it via web3.
  alert(`${rewardAmount} KITTY tokens have been claimed as your reward!`);
}
