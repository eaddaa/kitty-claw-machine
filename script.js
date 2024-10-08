// HTML Elemanları
const connectWalletBtn = document.getElementById('connectWalletBtn');
const claimRewardsBtn = document.getElementById('claimRewardsBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const gameCanvas = document.getElementById('gameCanvas');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('gameContainer');
const timeLeftDisplay = document.getElementById('timeLeft');
const backgroundMusic = document.getElementById('backgroundMusic');

let score = 0;
let timeLeft = 60;
let gameInterval;
let kittenInterval;

// Müzik çalma
backgroundMusic.play();

// Cüzdan bağlantısı için buton tıklama olayı
connectWalletBtn.addEventListener('click', async () => {
    const connected = await connectWallet(); // Cüzdanı bağla
    if (connected) {
        welcomeMessage.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame(); // Oyun başlat
    }
});

// Cüzdan bağlantı fonksiyonu (placeholder)
async function connectWallet() {
    // Cüzdan bağlantı mantığı buraya gelecek
    return true; // Başarıyla bağlandığını simüle et
}

// Oyun başlatma
function startGame() {
    score = 0; // Skoru sıfırla
    timeLeft = 60; // Süreyi sıfırla
    scoreboard.textContent = `Skor: ${score}`; // Skoru göster
    updateTimer(); // Süre güncelle
    kittenInterval = setInterval(moveKittens, 1000); // Kedileri her saniye hareket ettir
    gameInterval = setInterval(updateGame, 1000); // Oyun güncelleme
}

// Kedileri hareket ettirme
function moveKittens() {
    const kitten = document.createElement('img');
    kitten.src = 'images/kitten.png'; // Kedi görseli
    kitten.style.position = 'absolute';
    const randomX = Math.random() * (gameCanvas.clientWidth - 50); // Genişliği kullan
    const randomY = Math.random() * (gameCanvas.clientHeight - 50); // Yüksekliği kullan
    kitten.style.left = `${randomX}px`;
    kitten.style.top = `${randomY}px`;
    gameCanvas.appendChild(kitten);

    // Kediye tıklama olayı ekle
    kitten.addEventListener('click', function() {
        score++;
        scoreboard.textContent = `Skor: ${score}`;
        gameCanvas.removeChild(kitten); // Kediyi tıklayınca kaldır
    });

    // 5 saniye içinde tıklanmazsa kediyi kaldır
    setTimeout(() => {
        if (gameCanvas.contains(kitten)) {
            gameCanvas.removeChild(kitten);
        }
    }, 5000);
}

// Oyun durumunu güncelle
function updateGame() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer(); // Süreyi güncelle
    } else {
        clearInterval(gameInterval);
        clearInterval(kittenInterval);
        alert("Oyun bitti! Skorunuz: " + score);
        resetGame();
    }
}

// Süre güncelleme
function updateTimer() {
    timeLeftDisplay.textContent = `Kalan Süre: ${timeLeft}s`;
}

// Oyun sıfırlama fonksiyonu
function resetGame() {
    score = 0;
    timeLeft = 60;
    scoreboard.textContent = `Skor: ${score}`;
    updateTimer();
    welcomeMessage.style.display = 'block'; // Hoş geldin mesajını göster
    gameContainer.style.display = 'none'; // Oyun alanını gizle
}

// Ödül alma fonksiyonu
claimRewardsBtn.addEventListener("click", function() {
    const userAccount = getUserAccount(); // Cüzdan bilgilerini al
    if (!userAccount) {
        alert("Önce cüzdanınızı bağlayın.");
    } else {
        claimRewards(score); // Mevcut skorla ödül al
        alert("Ödüller başarıyla alındı! " + score + " KITTY tokeni aldınız."); // Ödül alma işlemi için placeholder
    }
});

// Kullanıcı hesabını alma fonksiyonu (placeholder)
function getUserAccount() {
    // Kullanıcı hesabını alma mantığı buraya gelecek
    return true; // Kullanıcı hesabının alındığını simüle et
}

// Ödülleri alma fonksiyonu (placeholder)
function claimRewards(score) {
    // Skora bağlı olarak ödül alma mantığı buraya gelecek
    console.log(`Alındı ${score} KITTY token.`);
}

