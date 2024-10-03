// wallet.js

let userAccount;
let web3;

// Wallet connection function
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            return true; // Bağlantı başarılı
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again.");
            return false; // Bağlantı başarısız
        }
    } else {
        alert("Please install MetaMask.");
        return false; // Bağlantı başarısız
    }
}

// Cüzdanı döndür
function getUserAccount() {
    return userAccount;
}
