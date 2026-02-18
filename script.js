const toggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Sayfa yüklendiğinde tercihi kontrol et
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Kalıcı hafıza
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Kalıcı hafıza
    }
});


async function getDüzceWeather() {
    const apiKey = '51dd8f36f673edc276cf11989e15c465'; 
    const city = 'Düzce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    const loadingText = document.getElementById('weather-loading');
    const weatherContent = document.getElementById('weather-content');

    try {
        console.log("Hava durumu verisi çekiliyor..."); //
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Hatası: ${response.status}`); // Hata durumunda mesaj fırlat
        }

        const data = await response.json();
        console.log("Gelen Veri:", data); // Veriyi konsolda gör
        displayWeatherAdvice(data);
        
    } catch (error) {
        console.error("Hava durumu çekilemedi:", error);
        loadingText.innerText = "Hava durumu şu an yüklenemedi, Nuvola her havada yanınızda!";
    }
}

function displayWeatherAdvice(data) {
    const status = data.weather[0].main; 
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    
    document.getElementById('weather-loading').style.display = 'none'; //
    document.getElementById('weather-content').style.display = 'block';

    document.getElementById('weather-status').innerText = `Düzce'de Bugün: ${temp}°C | ${description}`;

    const adviceText = document.getElementById('beauty-advice');
    
    //  yorumlar
    const recommendations = {
        'Clear': "Güneş parlıyor! Cilt bakımı için harika bir gün, tam french tırnak yaptırma havası. ✨",
        'Clouds': "Hava biraz kapalı ama ruhun parlasın! Tam alışveriş havası ve nude tonlar günü kurtarır. ☁️",
        'Rain': "Yağmura inat ışıltını koru! Bugün soft bir cilt bakımı ve bordo tırnaklar seni modunda tutar. ☔",
        'Drizzle': "Hafif yağmur, bolca huzur. Bugün tam bir nemlendirici maske yapma havası! 🧴"
    };

    adviceText.innerText = recommendations[status] || "Dısarıda tam Nuvola Beauty'de şımartılma havası var!";
}

// Sayfa yüklendiğinde başlat
getDüzceWeather();

/*----kampanya---*/
window.onload = function() {
    const popup = document.getElementById('campaign-popup');
    const closeBtn = document.getElementById('close-popup');

    // Sayfa açıldıktan 1 saniye sonra göster
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 1000);

    // Çarpıya basınca kapat
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    }

    // Dışarıya tıklayınca kapat
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
};

/*---KAMPANY---*/

// Sayfa yüklendiğinde hafızayı kontrol et
document.addEventListener('DOMContentLoaded', () => {
    const savedCode = localStorage.getItem('nuvola_promo_code');
    const actionBtn = document.getElementById('main-action-btn');
    
    if (savedCode) {
        // Eğer kod varsa butonu güncelle
        actionBtn.innerText = "Hediyeni Görüntüle";
        actionBtn.onclick = showSavedReward;
    }
});

function handleMainAction() {
    // 1. Önce oyun alanını temizle ve 1. görevi içine yaz
    const content = document.getElementById('step-content');
    content.innerHTML = `
        <div id="step-1" class="step-active">
            <h2>✨ Logo Avı</h2>
            <p>Ekranda uçuşan 3 logoyu yakala! (<span id="count">0</span>/3)</p>
            <div id="logo-zone" style="position:relative; width:100%; height:300px; overflow:hidden; border:1px dashed var(--primary-pink); border-radius:15px; margin-top:10px;"></div>
        </div>
    `;
    
    // 2. Alttaki adımları güncelle
    updateSteps(1);
    
    // 3. Logoları oluşturmaya başla
    const zone = document.getElementById('logo-zone');
    caughtLogos = 0; // Sayacı her zaman sıfırla
    
    for (let i = 0; i < 3; i++) {
        createFlyingLogo(zone);
    }
}

function showSavedReward() {
    const savedCode = localStorage.getItem('nuvola_promo_code');
    const savedGift = localStorage.getItem('nuvola_gift_name');
    
    document.getElementById('start-screen').classList.replace('step-active', 'step-hidden');
    document.getElementById('reward-screen').classList.replace('step-hidden', 'step-active');
    document.getElementById('final-promo-code').innerText = savedCode;
    document.getElementById('reward-text').innerText = `Daha önce kazandığın ödül: ${savedGift}`;
}


//GÖREV1

let caughtLogos = 0;

function startLogoCatch() {
    const area = document.getElementById('step-content');
    area.innerHTML = `<h2>Logo Avı</h2><p>Ekranda uçuşan 3 logoyu yakala! (<span id="count">0</span>/3)</p>
                      <div id="logo-zone" style="position:relative; width:100%; height:300px; overflow:hidden;"></div>`;
    
    const zone = document.getElementById('logo-zone');

    for (let i = 0; i < 3; i++) {
        createFlyingLogo(zone);
    }
}

function createFlyingLogo(zone) {
    const logo = document.createElement('img');
    logo.src = 'img/logo.jpg';
    logo.className = 'flying-logo';
    
    // Rastgele başlangıç
    let x = Math.random() * (zone.offsetWidth - 40);
    let y = Math.random() * (zone.offsetHeight - 40);
    let dx = (Math.random() - 0.5) * 6; 
    let dy = (Math.random() - 0.5) * 6;

    logo.style.left = x + 'px';
    logo.style.top = y + 'px';
    zone.appendChild(logo);

    const move = () => {
        x += dx;
        y += dy;

        // Duvarlara çarpma kontrolü (40px değerine göre)
        if (x <= 0 || x >= zone.offsetWidth - 40) dx *= -1;
        if (y <= 0 || y >= zone.offsetHeight - 40) dy *= -1;

        logo.style.left = x + 'px';
        logo.style.top = y + 'px';

        if (logo.parentElement) requestAnimationFrame(move);
    };
    
    move();

    logo.onclick = () => {
        logo.remove();
        caughtLogos++;
        document.getElementById('count').innerText = caughtLogos;
        if (caughtLogos === 3) {
            setTimeout(goToStep2, 500); // 2. göreve geç
        }
    };
}

function updateSteps(activeStep) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`dot-${activeStep}`).classList.add('active');
}

function goToStep2() {
    updateSteps(2);
    const content = document.getElementById('step-content');
    content.innerHTML = `<h2> Hafıza Oyunu</h2><p>Kartları eşleştirerek ilerle!</p>
                        <div id="memory-grid" class="memory-grid"></div>`;
    startMemoryGame(); // 2. Görevi başlat
}

//GÖREV2

let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    const grid = document.getElementById('memory-grid');
    
    const images = [
        'img/h-oje.png', 
        'img/h-ruj.png', 
        'img/h-taki.png', 
        'img/h-bakim.png'
    ];
    
    const cards = [...images, ...images].sort(() => Math.random() - 0.5);
    
    grid.innerHTML = ''; // Temizle
    cards.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.image = imgSrc;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back"><img src="${imgSrc}"></div>
            </div>
        `;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === 4) {
            setTimeout(goToStep3, 1000); // 3. göreve geç
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function goToStep3() {
    updateSteps(3); // 3. adımı parlat
    const content = document.getElementById('step-content');
    content.innerHTML = `
        <div id="step-3" class="step-active">
            <h2>💖 Işıltıyı Doldur</h2>
            <p>Buluta hızlıca dokunarak parlat ve hediyeni ortaya çıkar!</p>
            <div id="perfume-container" onclick="fillPerfume()">
                <img src="img/logo.jpg" id="perfume-bottle" style="width:100px; transition: 0.3s;">
                <div id="progress-text">0%</div>
            </div>
        </div>
    `;
}


let fillAmount = 0;

function fillPerfume() {
    const bottle = document.getElementById('perfume-bottle');
    const text = document.getElementById('progress-text');
    
    if (fillAmount < 100) {
        fillAmount += 5; // Her tıklamada %5 artar
        text.innerText = `%${fillAmount}`;
        
        // Şişenin parlamasını ve büyümesini sağlar
        bottle.style.filter = `drop-shadow(0 0 ${fillAmount / 4}px var(--primary-pink))`;
        bottle.style.transform = `scale(${1 + fillAmount / 500})`;
        
        if (fillAmount === 100) {
            setTimeout(finishSeruven, 500); 
        }
    }
}

function finishSeruven() {
    // Rastgele kod üret
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'NUVOLA-';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Hediye ismini belirle (Örn: %20 İndirim)
    const gifts = ["%20 İndirim", "Ücretsiz Cilt Bakımı", "Nail Art Hediyesi","Yüz Maskesi","Kirpik Bakımı", "Nuvola Kahvesi", "Sürpiz Hediye", "Sürpriz Bakım Kiti"];
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    // LocalStorage'a kaydet 
    localStorage.setItem('nuvola_promo_code', code);
    localStorage.setItem('nuvola_gift_name', randomGift);

    // Ekranı güncelle
    const content = document.getElementById('step-content');
    content.innerHTML = `
        <div id="reward-screen" class="step-active">
            <h2 style="font-size: 2.5rem;">🎉 TEBRİKLER! 🎉</h2>
            <p>Görevleri tamamladın ve harika bir ödül kazandın:</p>
            <h3 style="color:var(--primary-pink); margin: 20px 0;">${randomGift}</h3>
            <div id="final-promo-code" style="background:var(--primary-pink); color:white; padding:15px; border-radius:10px; font-size:1.5rem; font-weight:bold; margin-bottom:20px;">
                ${code}
            </div>
            <button class="nuvola-btn" onclick="location.reload()">Kapat ve Kodu Sakla</button>
        </div>
    `;
    
    updateSteps(3); // Adım çubuğunu tamamla
}

function showSavedReward() {
    const savedCode = localStorage.getItem('nuvola_promo_code');
    const savedGift = localStorage.getItem('nuvola_gift_name');
    const content = document.getElementById('step-content');
    
    if (savedCode && savedGift) {
        content.innerHTML = `
            <div id="reward-screen" class="step-active">
                <h2 style="font-size: 2rem;">TEBRİKLER💖</h2>
                <p>Kayıtlı olan hediyen burada:</p>
                <h3 style="color:var(--primary-pink); margin: 20px 0;">${savedGift}</h3>
                <div id="final-promo-code" style="background:var(--primary-pink); color:white; padding:15px; border-radius:10px; font-size:1.5rem; font-weight:bold; margin-bottom:20px;">
                    ${savedCode}
                </div>
                <p style="font-size:0.9rem; opacity:0.8;">Bu kodu randevu sırasında göstermeyi unutma! ✨</p>
                <button class="nuvola-btn" style="margin-top:10px;" onclick="location.reload()">Kapat</button>
                <button class="nuvola-btn" style="background:#5d4037; margin-top:10px;" onclick="resetAdventure()">Serüveni Sıfırla (Test Modu)</button>
            </div>
        `;
        // Tüm adımları tamamlanmış göster
        updateSteps(3);
    } else {
        alert("Henüz bir hediye kazanmamışsın, serüvene başla!");
    }
}


function resetAdventure() {
    if(confirm("Tüm ilerlemen silinecek ve oyuna baştan başlayacaksın. Emin misin?")) {
        localStorage.removeItem('nuvola_promo_code');
        localStorage.removeItem('nuvola_gift_name');
        location.reload(); // Sayfayı yenileyerek oyunu başlatır
    }
}


function resetAdventure() {
    if(confirm("Tüm ilerlemen silinecek ve görevlere baştan başlayacaksın.")) {
        localStorage.removeItem('nuvola_promo_code');
        localStorage.removeItem('nuvola_gift_name');
        location.reload(); // Sayfayı yenileyerek oyunu başlatır
    }
}