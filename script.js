const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let timeLeft = 60;

// Kedi resmini yükleme
const catImage = new Image();
catImage.src = './cat.png'; // Kedi resminin yolunu kontrol et (bu resim 'cat.png' olacak)

// Kedi başlangıç konumu ve boyutları
let catX = Math.random() * (canvas.width - 50);
let catY = Math.random() * (canvas.height - 50);
const catWidth = 50;
const catHeight = 50;

// Zamanlayıcı başlasın
startTimer();

// Kedi resmi yüklendiğinde çizim yap
catImage.onload = function() {
    draw();
};

// Çizim fonksiyonu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas'ı temizle
    ctx.drawImage(catImage, catX, catY, catWidth, catHeight); // Kediyi çiz
}

// Kediye tıklanınca skoru artır ve kedi yerini değiştir
canvas.addEventListener('click', function(event) {
    if (event.offsetX > catX && event.offsetX < catX + catWidth &&
        event.offsetY > catY && event.offsetY < catY + catHeight) {
        score += 10; // Skoru 10 artır
        document.getElementById('score').textContent = `Score: ${score}`;

        // Kediyi yeni rastgele bir yere taşı
        catX = Math.random() * (canvas.width - catWidth);
        catY = Math.random() * (canvas.height - catHeight);
        draw();
    }
});

// Zamanlayıcı fonksiyonu
function startTimer() {
    const timerInterval = setInterval(function() {
        timeLeft -= 1;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your final score is: ${score}`);
        }
    }, 1000); // Her saniyede bir geri sayım
}
