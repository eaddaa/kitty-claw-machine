// --- Blockchain Integration Variables ---
const contractAddress = "dym1278838f86a613193e9cf2efe8846b705674cbfe2"; // Kontrat adresi
const chainId = "dymension_1100-1"; // Dymension chain ID

// --- Wallet Connection Function ---
async function connectWallet() {
    if (!window.keplr) {
        alert("Please install Keplr wallet.");
        return null;
    }

    try {
        await window.keplr.enable(chainId);
        const accounts = await window.keplr.getAccounts(chainId);
        const userAddress = accounts[0].address;
        console.log("Connected address:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet.");
        return null;
    }
}

// --- Claim Reward Function ---
async function claimReward(userAddress) {
    if (!userAddress || score < 1000) {
        alert("Please connect your wallet and reach 1000 points to claim rewards.");
        return;
    }

    const tx = {
        messages: [
            {
                typeUrl: "/your.module.score.MsgClaimReward", // Kendi modülüne göre ayarla
                value: {
                    creator: userAddress,
                    amount: "100", // 100 KITTY token
                },
            },
        ],
        memo: "",
        fee: {
            amount: [],
            gas: "200000",
        },
        signerInfos: [
            {
                publicKey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: Buffer.from(window.keplr.getKey(chainId).pubkey, "base64").toString("base64"),
                },
                modeInfo: {
                    single: {
                        mode: "SIGN_MODE_DIRECT",
                    },
                },
                sequence: 0,
            },
        ],
        timeoutHeight: 0,
    };

    try {
        const signedTx = await window.keplr.signAmino(chainId, userAddress, tx);

        const response = await fetch("https://dymension-mainnet-tendermint.public.blastapi.io:443", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "broadcast",
                method: "broadcast_tx_commit",
                params: [signedTx],
            }),
        });

        const result = await response.json();
        if (result.error) {
            console.error("Transaction failed:", result.error);
            alert("Failed to claim reward.");
        } else {
            console.log("Transaction result:", result.result);
            alert(`Successfully claimed 100 KITTY Tokens!`);
        }
    } catch (error) {
        console.error("Failed to sign and broadcast transaction:", error);
        alert("Failed to claim reward.");
    }
}
