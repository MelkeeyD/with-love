// Массив комплиментов
const compliments = [
    "Твоя улыбка освещает мой день ✨",
    "Ты самая красивая девушка, которую я встречал 🌸",
    "Твой смех - лучшая музыка для моих ушей 🎵",
    "Ты делаешь этот мир лучше своим присутствием 💫",
    "Твои глаза - как звезды на ночном небе ⭐",
    "С тобой даже серые дни становятся яркими 🌈",
    "Ты - самая умная и талантливая девушка 🌟",
    "Твоя доброта согревает всех вокруг ☀️",
    "Ты вдохновляешь меня быть лучше 💪",
    "Я счастлив просто быть рядом с тобой 💕"
];

let currentCompliment = 0;

// Переключение слайдов
function goToSlide(slideNum) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    const slide = document.getElementById(`slide${slideNum}`);
    if (slide) {
        slide.classList.add('active');
        slide.style.animation = 'none';
        setTimeout(() => {
            slide.style.animation = 'fadeIn 0.6s ease';
        }, 10);
        
        // Если перешли на финальный слайд, показываем кнопку "Нет"
        if (slideNum === 3) {
            const noBtn = document.getElementById('noBtn');
            if (noBtn) {
                noBtn.style.display = 'block';
                // Позиционируем кнопку справа снизу от кнопки "Да"
                setTimeout(() => {
                    positionNoButton();
                }, 100);
            }
        } else {
            const noBtn = document.getElementById('noBtn');
            if (noBtn) {
                noBtn.style.display = 'none';
            }
        }
    }
}

// Позиционирование кнопки "Нет" рядом с кнопкой "Да"
function positionNoButton() {
    const yesBtn = document.querySelector('.btn-yes');
    const noBtn = document.getElementById('noBtn');
    
    if (yesBtn && noBtn) {
        const rect = yesBtn.getBoundingClientRect();
        // Ставим кнопку справа от "Да" с небольшим отступом
        let x = rect.right + 20;
        let y = rect.top;
        
        // Проверяем, не выходит ли за экран
        if (x + noBtn.offsetWidth > window.innerWidth - 20) {
            x = rect.left - noBtn.offsetWidth - 20;
        }
        if (y + noBtn.offsetHeight > window.innerHeight - 20) {
            y = window.innerHeight - noBtn.offsetHeight - 20;
        }
        if (y < 20) {
            y = 20;
        }
        
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
}

// Управление комплиментами
function updateCompliment() {
    const textElement = document.getElementById('complimentText');
    const counterElement = document.getElementById('complimentCounter');
    const goToFinalBtn = document.getElementById('goToFinal');
    
    textElement.textContent = compliments[currentCompliment];
    counterElement.textContent = `${currentCompliment + 1} / ${compliments.length}`;
    
    if (currentCompliment === compliments.length - 1) {
        goToFinalBtn.classList.remove('hidden');
    } else {
        goToFinalBtn.classList.add('hidden');
    }
    
    textElement.style.animation = 'none';
    setTimeout(() => {
        textElement.style.animation = 'textPop 0.3s ease';
    }, 10);
}

document.getElementById('nextCompliment')?.addEventListener('click', () => {
    if (currentCompliment < compliments.length - 1) {
        currentCompliment++;
        updateCompliment();
    }
});

document.getElementById('prevCompliment')?.addEventListener('click', () => {
    if (currentCompliment > 0) {
        currentCompliment--;
        updateCompliment();
    }
});

document.getElementById('goToFinal')?.addEventListener('click', () => {
    goToSlide(3);
    createMiniCelebration();
});

// Кнопка "Нет" - бегает по всему экрану при клике
const noBtn = document.getElementById('noBtn');
let noClickCount = 0;

noBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    noClickCount++;
    
    // Получаем размеры кнопки и окна
    const btnWidth = this.offsetWidth;
    const btnHeight = this.offsetHeight;
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;
    
    // Случайная позиция по всему экрану
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Применяем новую позицию
    this.style.left = randomX + 'px';
    this.style.top = randomY + 'px';
    
    // Меняем текст кнопки
    const messages = [
        'Ну пожалуйста! 🥺',
        'Ты уверена? 😅',
        'Подумай еще раз! 💕',
        'Мое сердце разбивается... 💔',
        'Я буду самым счастливым! 🙏',
        'Ну же, соглашайся! ❤️',
        'Я не сдамся! 😤',
        'Ты ведь тоже хочешь! 💫',
        'Давай без обид! 😊',
        'Я тебя очень прошу! 🙏',
        'Ну почему ты такая упрямая? 😄',
        'Ладно, я подожду! ⏳',
        'Мое сердце принадлежит тебе! 💕',
        'Ты сводишь меня с ума! 😍'
    ];
    
    if (noClickCount <= messages.length) {
        this.textContent = messages[noClickCount - 1];
    } else {
        this.textContent = messages[noClickCount % messages.length];
    }
    
    // Меняем стиль кнопки
    if (noClickCount > 2) {
        this.style.background = 'rgba(255, 107, 107, 0.3)';
        this.style.borderColor = '#ff6b6b';
    }
    
    // Увеличиваем кнопку
    const scale = 1 + Math.min(noClickCount * 0.03, 0.5);
    this.style.transform = `scale(${scale})`;
    
    // Добавляем эффект встряски
    this.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
        this.style.animation = '';
    }, 300);
    
    // Показываем подсказки
    if (noClickCount === 5) {
        showHint('Может быть, стоит согласиться? 😄');
    }
    if (noClickCount === 10) {
        showHint('Ты упрямая, но я тоже! 💪');
    }
    if (noClickCount === 15) {
        showHint('Я буду ждать столько, сколько нужно! ⏰');
    }
    if (noClickCount === 20) {
        showHint('Ты просто невыносима! 😍');
    }
});

// Функция для показа подсказок
function showHint(text) {
    const hint = document.createElement('div');
    hint.textContent = text;
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #ffd700;
        padding: 20px 40px;
        border-radius: 20px;
        font-size: 24px;
        z-index: 2000;
        animation: fadeIn 0.5s ease;
        border: 2px solid #ffd700;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.3);
        text-align: center;
        pointer-events: none;
    `;
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            hint.remove();
        }, 500);
    }, 2500);
}

// Принять предложение
function acceptProposal() {
    // Прячем кнопку "Нет"
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.style.display = 'none';
    }
    
    // Прячем кнопку "Да"
    document.querySelector('.btn-yes').style.display = 'none';
    
    // Показываем финальное сообщение
    document.getElementById('finalMessage').classList.remove('hidden');
    
    // Создаем эффект конфетти
    createCelebration();
    
    // Меняем фон
    document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    
    // Увеличиваем сердце
    const heart = document.querySelector('.heart-pulse');
    if (heart) {
        heart.style.width = '120px';
        heart.style.height = '120px';
        heart.style.boxShadow = '0 0 80px rgba(255, 71, 87, 0.8)';
        heart.style.transform = 'rotate(45deg) scale(1.2)';
    }
}

// Создание конфетти
function createCelebration() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ffd700', '#ff4757'];
    const emojis = ['❤️', '💕', '💗', '💖', '💘', '💝', '🎉', '✨', '⭐', '🌟', '🎊'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            const isEmoji = Math.random() > 0.6;
            
            if (isEmoji) {
                el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                el.style.fontSize = `${20 + Math.random() * 30}px`;
            } else {
                const size = 5 + Math.random() * 12;
                el.style.width = `${size}px`;
                el.style.height = `${size * 0.6}px`;
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            }
            
            el.style.cssText += `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -20px;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
                transform: rotate(${Math.random() * 360}deg);
                opacity: ${0.7 + Math.random() * 0.3};
            `;
            
            document.body.appendChild(el);
            
            setTimeout(() => {
                el.remove();
            }, 5000);
        }, i * 25);
    }
}

// Маленькое конфетти при переходе
function createMiniCelebration() {
    const emojis = ['✨', '⭐', '🌟', '💫'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${20 + Math.random() * 30}px;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp 2s ease-out forwards;
            `;
            document.body.appendChild(el);
            
            setTimeout(() => {
                el.remove();
            }, 2000);
        }, i * 60);
    }
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        20% { transform: translateX(-15px) rotate(-5deg); }
        40% { transform: translateX(15px) rotate(5deg); }
        60% { transform: translateX(-10px) rotate(-3deg); }
        80% { transform: translateX(10px) rotate(3deg); }
    }
`;
document.head.appendChild(style);

// Система частиц на фоне
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 1.5 + 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.hue = Math.random() * 60 + 280;
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height + 20) {
            this.reset();
            this.y = -20;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${this.opacity * 0.5})`;
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    goToSlide(1);
    updateCompliment();
    
    // Скрываем кнопку "Нет" изначально
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.style.display = 'none';
    }
});

// Обновляем позицию кнопки при ресайзе
window.addEventListener('resize', () => {
    if (document.getElementById('slide3').classList.contains('active')) {
        positionNoButton();
    }
});

// Клавиатура
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        const nextBtn = document.getElementById('nextCompliment');
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    } else if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevCompliment');
        if (prevBtn && !prevBtn.disabled) {
            prevBtn.click();
        }
    } else if (e.key === 'Enter') {
        const goToFinalBtn = document.getElementById('goToFinal');
        if (goToFinalBtn && !goToFinalBtn.classList.contains('hidden')) {
            goToFinalBtn.click();
        }
    }
});