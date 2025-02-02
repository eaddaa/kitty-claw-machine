// wallet.js

// Keplr wallet connection function
export async function connectWallet() {
    if (!window.getOfflineSigner || !window.getOfflineSigner(chainId)) {
        alert("Keplr wallet is not installed or supported.");
        return null;
    }

    try {
        // Enable Keplr wallet
        await window.getOfflineSigner(chainId).enable();

        // Get user's wallet address
        const accounts = await window.getOfflineSigner(chainId).getAccounts();
        const address = accounts[0].address;

        return address;
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("An error occurred while connecting to the wallet. Please try again.");
        return null;
    }
}

// Reward claiming function
export async function claimReward(userAddress, score) {
    const thresholdScore = 1000;
    const rewardAmount = 100; // 100 KITTY tokens

    if (score < thresholdScore) {
        alert(`You need at least ${thresholdScore} points to claim rewards.`);
        return;
    }

    try {
        // Implement reward claiming logic here
        // This part should interact with your smart contract to process the reward claim
        alert(`${rewardAmount} KITTY tokens successfully claimed!`);
    } catch (error) {
        console.error("Error claiming reward:", error);
        alert("An error occurred while claiming the reward. Please try again.");
    }
}
