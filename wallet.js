// --- Blockchain Integration Variables ---
const adminAddress = "kitty194tqyp4kk7pmrjhnf0dfzz72dqlvtuglh8exxt"; // Admin address
const chainId = "dymension_1100-1"; // Dymension Mainnet Chain ID
const rpcEndpoint = "https://dymension-mainnet.public.blastapi.io"; // RPC Endpoint
const restEndpoint = "https://dymension-mainnet-rest.public.blastapi.io"; // REST Endpoint

// --- Wallet Connection Function ---
export async function connectWallet() {
    if (!window.keplr) {
        alert("Please install Keplr wallet.");
        return null;
    }

    try {
        // Suggest the chain to Keplr
        await window.keplr.experimentalSuggestChain({
            chainId: "dymension_1100-1",
            chainName: "Dymension Mainnet",
            rpc: rpcEndpoint,
            rest: restEndpoint,
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: "dym",
                bech32PrefixAccPub: "dym" + "pub",
                bech32PrefixValAddr: "dym" + "valoper",
                bech32PrefixValPub: "dym" + "valoperpub",
                bech32PrefixConsAddr: "dym" + "valcons",
                bech32PrefixConsPub: "dym" + "valconspub",
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
        const userAddress = accounts[0].address;

        console.log("Connected address:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please check your Keplr settings.");
        return null;
    }
}

// --- Claim Reward Function ---
export async function claimReward(userAddress, score) {
    if (!userAddress || score < 1000) {
        alert("Please connect your wallet and reach 1000 points to claim rewards.");
        return;
    }

    const tx = {
        messages: [
            {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend", // Sending tokens via bank module
                value: {
                    fromAddress: adminAddress, // Admin address sends the reward
                    toAddress: userAddress, // Player's address receives the reward
                    amount: [
                        {
                            denom: "kitty", // KITTY token denom
                            amount: "100", // 100 KITTY tokens
                        },
                    ],
                },
            },
        ],
        memo: "",
        fee: {
            amount: [
                {
                    denom: "udym", // Dymension native token for fees
                    amount: "7000000000", // Gas fee in udym (adjust as needed)
                },
            ],
            gas: "200000", // Gas limit
        },
        signerInfos: [
            {
                publicKey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: new TextEncoder().encode(window.keplr.getKey(chainId).pubkey).toString(), // Use TextEncoder instead of Buffer
                },
                modeInfo: {
                    single: {
                        mode: "SIGN_MODE_DIRECT",
                    },
                },
                sequence: 0, // Sequence should ideally be fetched dynamically
            },
        ],
        timeoutHeight: 0,
    };

    try {
        // Sign the transaction
        const signedTx = await window.keplr.signAmino(chainId, adminAddress, tx);

        // Broadcast the transaction
        const response = await fetch(`${rpcEndpoint}:443`, { // Ensure port is included
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
