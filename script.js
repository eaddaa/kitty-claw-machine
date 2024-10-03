// HTML Elemanlarını Seçme
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');

let userAccount;
let web3;
let score = 0;
let timeLeft = 60;
let gameInterval;

// Cüzdan Bağlantı Fonksiyonu
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Web3.js ile ethereum nesnesini kullan
        try {
            // Kullanıcıdan hesap erişimi talep et
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Bağlı hesap:", userAccount);
            welcomeMessage.style.display = 'none'; // Bağlandıktan sonra hoş geldin mesajını gizle
            gameContainer.style.display = 'block'; // Oyun kutusunu göster
            startGame(); // Oyunu başlat
        } catch (error) {
            console.error("Cüzdan bağlantı hatası:", error);
            alert("Cüzdan bağlantısı başarısız oldu. Lütfen tekrar deneyin.");
        }
    } else {
        alert("Lütfen MetaMask'ı kurun.");
    }
}

// Bağlantı butonuna tıklama olayı
connectWalletBtn.addEventListener('click', connectWallet);

// Oyun Başlatma Fonksiyonu
function startGame() {
    score = 0; // Skoru sıfırla
    timeLeft = 60; // Kalan süreyi sıfırla
    scoreboard.textContent = `Score: ${score}`; // Skoru göster
    updateTimer(); // Zamanlayıcıyı başlat
    gameInterval = setInterval(updateGame, 1000); // Her saniyede updateGame'i çağır
}

// Oyun durumunu güncelle
function updateGame() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer(); // Zamanlayıcıyı güncelle
    } else {
        clearInterval(gameInterval);
        alert("Oyun bitti! Skorunuz: " + score);
        resetGame();
    }
}

// Zamanlayıcıyı güncelle
function updateTimer() {
    timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;
}

// Oyun Sıfırlama Fonksiyonu
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Score: ${score}`;
    updateTimer();
    welcomeMessage.style.display = 'block'; // Hoş geldin mesajını tekrar göster
    gameContainer.style.display = 'none'; // Oyun alanını gizle
}

// Ödül talep etme fonksiyonu
claimRewardsBtn.addEventListener("click", function() {
    if (!userAccount) {
        alert("Lütfen önce cüzdanınızı bağlayın.");
    } else {
        alert("Ödüller başarıyla talep edildi!"); // Ödül talep etme işlevselliği için yer tutucu
    }
});

