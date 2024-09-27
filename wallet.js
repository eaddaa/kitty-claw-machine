import Web3 from 'web3';

// Cüzdan bağlama butonunu yönetme
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');

let userAccount;
let web3;

// Cüzdanı bağlama fonksiyonu
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Web3.js ile ethereum objesini kullan
        try {
            // Kullanıcıdan cüzdan bağlantı isteği
            const accounts = await web3.eth.requestAccounts();
            userAccount = accounts[0];
            connectWalletBtn.style.display = 'none'; // Bağlandıktan sonra butonu gizle
            claimRewardsBtn.style.display = 'block'; // Ödül talep et butonunu göster
            console.log("Bağlı hesap:", userAccount);
        } catch (error) {
            console.error("Cüzdan bağlama hatası:", error);
            alert("Cüzdan bağlantısı başarısız oldu. Lütfen tekrar deneyin.");
        }
    } else {
        alert("MetaMask'ı yükleyin."); // MetaMask'ın yüklü olup olmadığını kontrol et
    }
}

// Cüzdan bağlama butonuna tıklama olayı
connectWalletBtn.addEventListener('click', connectWallet);

// Ödül talep etme işlemi
claimRewardsBtn.addEventListener("click", function() {
    if (!userAccount) {
        alert("Lütfen önce cüzdanınızı bağlayın.");
    } else {
        alert("Ödüller başarıyla talep edildi!"); // Burayı daha fazla işlevsellik ile güncelleyebilirsin
    }
});
