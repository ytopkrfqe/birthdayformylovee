// ============================================
// ===== 1. ПОДКЛЮЧЕНИЕ TELEGRAM SDK =====
// ============================================
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ============================================
// ===== 2. ⚠️ НАСТРОЙКИ (ИЗМЕНИ ЗДЕСЬ!) =====
// ============================================

// 👇 НАПИШИ СВОЁ ИМЯ
const YOUR_NAME = "Твой любимый";

// 👇 НАПИШИ ИМЯ ДЕВУШКИ
const HER_NAME = "Ангел";

// 👇 ДАТА НАЧАЛА ОТНОШЕНИЙ (ГГГГ-ММ-ДД)
// 6 СЕНТЯБРЯ 2023 ГОДА
const START_DATE = new Date('2023-09-06');

// ============================================
// ===== 3. КОНТЕНТ ДЛЯ СТРАНИЦ =====
// ============================================

// 👇 ФОТОГРАФИИ (замени эмодзи на реальные фото)
// Как добавить реальные фото:
// 1. Загрузи фото на Imgur или любой хостинг
// 2. Замени "📸" на: "<img src='ССЫЛКА_НА_ФОТО' style='width:100%;height:100%;object-fit:cover;border-radius:12px;' />"
const PHOTOS = [
    { emoji: "💑", label: "Наше первое фото" },
    { emoji: "🏖️", label: "Море" },
    { emoji: "🎄", label: "Новый год" },
    { emoji: "🌅", label: "Закат" },
    { emoji: "🎂", label: "Твой день" },
    { emoji: "❤️", label: "Любовь" },
    { emoji: "✨", label: "Счастье" },
    { emoji: "💫", label: "Звёзды" },
    { emoji: "🌟", label: "Ты сияешь" },
];

// 👇 ПРИЧИНЫ ЛЮБВИ (можешь добавить сколько угодно)
const REASONS = [
    "Твоя улыбка освещает мой день ☀️",
    "Ты самая добрая и нежная ❤️",
    "Твои глаза — моя вселенная ✨",
    "Ты вдохновляешь меня каждый день 🌟",
    "Твоя любовь делает меня лучше 💫",
    "Ты — моё счастье и покой 🌸",
    "Твои объятия — мой дом 🏠",
    "Ты — моя любимая сказка 📖",
];

// 👇 СООБЩЕНИЯ ДЛЯ СЮРПРИЗА
const SURPRISE_MESSAGES = [
    "Ты — самое прекрасное, что случилось в моей жизни 💖",
    "Каждый день с тобой — это праздник 🎉",
    "Я благодарен судьбе, что встретил тебя 🙏",
    "Ты — моя муза и моя любовь 🎨",
    "С тобой я счастлив, как никогда ❤️",
    "Ты — моя вселенная, моя галактика, мой космос 🌌",
    "С тобой я стал лучше, сильнее и счастливее 💪",
];

// 👇 ТЕКСТЫ ДЛЯ "ПЕСНИ"
const LYRICS = [
    "Ты моё сердце, ты моя душа ❤️",
    "С тобой мир стал цветным 🌈",
    "Ты — моя весна даже зимой 🌸",
    "Люблю тебя каждую секунду 💕",
    "Ты — моя муза и вдохновение ✨",
];

// ============================================
// ===== 4. СЧЁТЧИК ДНЕЙ (АВТОМАТИЧЕСКИЙ) =====
// ============================================

// Функция для склонения слов (1 день, 2 дня, 5 дней)
function declineWord(number, one, two, five) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return five;
    if (n1 > 1 && n1 < 5) return two;
    if (n1 === 1) return one;
    return five;
}

// Основной счётчик дней
function calculateDays() {
    const now = new Date();
    const diff = now - START_DATE;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Детальный подсчёт (годы, месяцы, дни)
function calculateDetailedDays() {
    const now = new Date();
    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

// Обновление счётчика на странице
function updateCounter() {
    const days = calculateDays();
    document.getElementById('daysCount').textContent = days;
    
    const detailed = calculateDetailedDays();
    const detailedDateElement = document.getElementById('detailedDate');
    if (detailedDateElement) {
        let parts = [];
        if (detailed.years > 0) {
            parts.push(`${detailed.years} ${declineWord(detailed.years, 'год', 'года', 'лет')}`);
        }
        if (detailed.months > 0) {
            parts.push(`${detailed.months} ${declineWord(detailed.months, 'месяц', 'месяца', 'месяцев')}`);
        }
        parts.push(`${detailed.days} ${declineWord(detailed.days, 'день', 'дня', 'дней')}`);
        detailedDateElement.textContent = `Это ${parts.join(', ')}`;
    }
}

// Запускаем счётчик
updateCounter();

// Обновляем каждые 5 минут (на случай, если страница открыта долго)
setInterval(updateCounter, 300000);

// Подставляем имя девушки
document.getElementById('girlName').textContent = HER_NAME;

// ============================================
// ===== 5. КОТИК (АНИМАЦИЯ) =====
// ============================================

const catContainer = document.getElementById('cat-container');
let catX = 30;
let catY = 30;
let catDirection = 1;
let isMoving = false;

// Случайное движение котика
function randomMoveCat() {
    if (isMoving) return;
    isMoving = true;
    
    const directions = [
        { dx: 0, dy: -50 },
        { dx: 0, dy: 50 },
        { dx: 50, dy: 0 },
        { dx: -50, dy: 0 },
        { dx: 30, dy: -30 },
        { dx: -30, dy: -30 },
        { dx: 30, dy: 30 },
        { dx: -30, dy: 30 },
    ];
    
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 120;
    
    let newX = Math.min(Math.max(catX + dir.dx, 10), maxX);
    let newY = Math.min(Math.max(catY + dir.dy, 10), maxY);
    
    if (dir.dx > 0) catDirection = 1;
    else if (dir.dx < 0) catDirection = -1;
    
    catContainer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    catContainer.style.left = newX + 'px';
    catContainer.style.bottom = newY + 'px';
    catContainer.classList.add('moving');
    
    if (catDirection === -1) {
        catContainer.classList.add('flip');
    } else {
        catContainer.classList.remove('flip');
    }
    
    catX = newX;
    catY = newY;
    
    setTimeout(() => {
        catContainer.classList.remove('moving');
        isMoving = false;
    }, 800);
}

// Клик по котику
catContainer.addEventListener('click', function(e) {
    e.stopPropagation();
    
    this.classList.add('happy');
    setTimeout(() => this.classList.remove('happy'), 500);
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    
    const messages = ['Мяу! ❤️', 'Привет! 😺', 'Я тебя люблю! 💕', 'Ты моя звёздочка! ✨', 'Мур-мур! 🐱'];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    if (tg.showPopup) {
        tg.showPopup({
            title: '🐱 Котик говорит:',
            message: msg,
            buttons: [{ type: 'default', text: '❤️' }]
        });
    }
    
    runCatToMouse(e);
});

// Котик бежит к курсору
function runCatToMouse(e) {
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX || touch.pageX;
    const y = touch.clientY || touch.pageY;
    
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 120;
    
    let targetX = Math.min(Math.max(x - 35, 10), maxX);
    let targetY = Math.min(Math.max(window.innerHeight - y - 35, 10), maxY);
    
    if (targetX > catX) catDirection = 1;
    else catDirection = -1;
    
    catContainer.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    catContainer.style.left = targetX + 'px';
    catContainer.style.bottom = targetY + 'px';
    catContainer.classList.add('moving');
    
    if (catDirection === -1) {
        catContainer.classList.add('flip');
    } else {
        catContainer.classList.remove('flip');
    }
    
    catX = targetX;
    catY = targetY;
    
    setTimeout(() => {
        catContainer.classList.remove('moving');
    }, 600);
}

// Котик бегает каждые 3-7 секунд
setInterval(() => {
    if (!isMoving) {
        randomMoveCat();
    }
}, 4000 + Math.random() * 3000);

// ============================================
// ===== 6. НАВИГАЦИЯ =====
// ============================================

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
    
    setTimeout(() => {
        if (!isMoving) {
            randomMoveCat();
        }
    }, 300);
}

function goBack() {
    showScreen('main-screen');
}

// ============================================
// ===== 7. ГАЛЕРЕЯ =====
// ============================================

function openGallery() {
    showScreen('gallery-screen');
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    
    PHOTOS.forEach((photo) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:40px;">${photo.emoji}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.6);margin-top:4px;">${photo.label}</div>
            </div>
        `;
        div.onclick = () => {
            if (tg.showPopup) {
                tg.showPopup({
                    title: photo.label,
                    message: `Наше совместное фото 💕\n${photo.emoji}`,
                    buttons: [{ type: 'default', text: '❤️' }]
                });
            }
        };
        grid.appendChild(div);
    });
}

// ============================================
// ===== 8. ПРИЧИНЫ ЛЮБВИ =====
// ============================================

function showReasons() {
    showScreen('reasons-screen');
    const list = document.getElementById('reasonsList');
    list.innerHTML = '';
    
    REASONS.forEach((reason, index) => {
        const div = document.createElement('div');
        div.className = 'reason-item';
        div.innerHTML = `
            <span class="number">${index + 1}</span>
            <span>${reason}</span>
        `;
        div.style.animationDelay = `${index * 0.05}s`;
        list.appendChild(div);
    });
}

// ============================================
// ===== 9. СЮРПРИЗ =====
// ============================================

function showSurprise() {
    showScreen('surprise-screen');
    const randomMsg = SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)];
    document.getElementById('surpriseMessage').textContent = randomMsg;
    
    const fireworks = document.getElementById('fireworks');
    setInterval(() => {
        const emojis = ['🎉', '✨', '🎊', '🌟', '💖', '🎆', '💫'];
        fireworks.textContent = emojis.sort(() => Math.random() - 0.5).join(' ');
    }, 300);
}

// ============================================
// ===== 10. МУЗЫКА =====
// ============================================

let isPlaying = false;
let audioContext = null;

function playMusic() {
    showScreen('music-screen');
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    let index = 0;
    setInterval(() => {
        lyricsDisplay.textContent = LYRICS[index % LYRICS.length];
        index++;
    }, 3000);
}

function toggleMusic() {
    const btn = document.querySelector('.play-btn');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        btn.textContent = '⏸️ Пауза';
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            playTone();
        }
    } else {
        btn.textContent = '▶️ Включить';
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
    }
}

function playTone() {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
    setTimeout(playTone, 1000);
}

// ============================================
// ===== 11. ОТПРАВКА ДАННЫХ В TELEGRAM =====
// ============================================

function sendToBot(data) {
    if (tg.sendData) {
        tg.sendData(JSON.stringify(data));
    }
}

console.log('🎉 Мини-апп для любимой загружен!');
console.log('❤️ С Днём Рождения!');
console.log(`📅 Мы вместе уже ${calculateDays()} дней!`);