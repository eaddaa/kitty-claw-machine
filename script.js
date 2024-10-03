// HTML elementlerini seç
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let userAccount;
let web3;
let score = 0;
let timeLeft = 60;
let catX, catY, catWidth = 50, catHeight = 50;
const ctx = gameCanvas.getContext('2d');

// Kedi görselini yükle
const catImage = new Image();
catImage.src = './cat.png'; // Görselin yolunu doğrulayın

// Wallet bağlanma fonksiyonu
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // Web3.js ile Ethereum'u kullan
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log("Connected account:", userAccount);
            connectWalletBtn.style.display = 'none'; // Cüzdan bağlandıktan sonra butonu gizle
            gameContainer.style.display = 'block'; // Oyunu göster
            startGame(); // Oyunu başlat
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Wallet connection failed. Please try again.");
        }
    } else {
        alert("Please install MetaMask.");
    }
}

// Click event for the wallet connection button
connectWalletBtn.addEventListener('click', connectWallet);

// Ödül alma fonksiyonu
claimRewardsBtn.addEventListener("click", function() {
    if (!userAccount) {
        alert("Please connect your wallet first.");
    } else {
        alert("Rewards claimed successfully!"); // Daha fazla işlevsellik ekleyebilirsiniz
    }
});

// Oyun başlangıç fonksiyonu
function startGame() {
    welcomeMessage.style.display = 'none'; // Hoş geldiniz mesajını gizle
    gameCanvas.style.display = 'block'; // Oyun alanını göster
    startTimer(); // Zamanlayıcıyı başlat
    moveCat(); // Kedi resmini başlat
}

// Kediyi yeni bir rastgele konuma taşı
function moveCat() {
    catX = Math.random() * (gameCanvas.width - catWidth);
    catY = Math.random() * (gameCanvas.height - catHeight);
    drawCat();
}

// Kediyi canvas üzerine çiz
function drawCat() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Önce temizle
    ctx.drawImage(catImage, catX, catY, catWidth, catHeight); // Yeni kediyi çiz
}

// Oyuncu kedinin üzerine tıklarsa skoru artır
gameCanvas.addEventListener('click', function(event) {
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    // Eğer tıklama kedinin üzerindeyse
    if (clickX > catX && clickX < catX + catWidth && clickY > catY && clickY < catY + catHeight) {
        score += 10; // Skoru artır
        scoreDisplay.textContent = `Score: ${score}`;
        moveCat(); // Kediyi yeni yere taşı
    }
});

// Zamanlayıcı fonksiyonu
function startTimer() {
    const timerInterval = setInterval(function() {
        timeLeft -= 1;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your final score is: ${score}`);
        }
    }, 1000); // Her saniyede bir azalt
}

