let score = 0;
let clickPower = 1;
let autoClickers = 0;
let autoClickerCost = 10;
let multiplierLevel = 1;
let multiplierCost = 50;
let perSecond = 0;

const tg = window.Telegram.WebApp;

// Инициализация Telegram WebApp
document.addEventListener('DOMContentLoaded', function() {
    tg.expand();
    tg.ready();
});

// Обновление отображения очков
function updateScore() {
    document.getElementById('score').textContent = Math.floor(score);
    document.getElementById('perSecond').textContent = perSecond.toFixed(1);
    updateUpgrades();
}

// Создание всплывающего текста при клике
function createScorePopup(x, y, amount) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = `+${amount}`;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

// Обработка клика
document.getElementById('clickerButton').addEventListener('click', function(e) {
    score += clickPower;
    updateScore();
    
    // Создаем всплывающий текст
    const rect = this.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    createScorePopup(x, y, clickPower);
    
    // Анимация кнопки
    this.style.animation = 'pop 0.1s ease';
    setTimeout(() => this.style.animation = '', 100);
});

// Обновление улучшений
function updateUpgrades() {
    document.querySelector('#autoClicker .upgrade-cost').textContent = `Цена: ${autoClickerCost}`;
    document.querySelector('#autoClicker .upgrade-count').textContent = `Количество: ${autoClickers}`;
    document.querySelector('#clickMultiplier .upgrade-cost').textContent = `Цена: ${multiplierCost}`;
    document.querySelector('#clickMultiplier .upgrade-count').textContent = `Уровень: ${multiplierLevel}`;
}

// Покупка авто-кликера
document.getElementById('autoClicker').addEventListener('click', function() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        perSecond += 0.1;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateScore();
    }
});

// Покупка множителя
document.getElementById('clickMultiplier').addEventListener('click', function() {
    if (score >= multiplierCost) {
        score -= multiplierCost;
        multiplierLevel++;
        clickPower = Math.pow(2, multiplierLevel - 1);
        multiplierCost = Math.floor(multiplierCost * 2);
        updateScore();
    }
});

// Автоматический клик
setInterval(function() {
    score += perSecond;
    updateScore();
}, 1000); 