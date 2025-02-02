async function connectWallet() {
    if (!window.getOfflineSigner || !window.getOfflineSigner(chainId)) {
        alert("Please install Keplr wallet.");
        return null;
    }

    try {
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        const userAddress = accounts[0].address;
        console.log("Connected address:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please check your Keplr settings.");
        return null;
    }
}

