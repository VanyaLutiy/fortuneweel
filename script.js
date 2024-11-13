// Инициализация переменных
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.getElementById("close-button");

const segments = ["Промокод 1", "Промокод 2", "Промокод 3", "Денежный приз"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFD700"];
let startAngle = 0;
let isSpinning = false;
let spinAngle = 0;
let spinTimeout = null;

// Рисуем колесо
function drawWheel() {
  const segmentAngle = (2 * Math.PI) / segments.length;
  
  segments.forEach((text, index) => {
    // Устанавливаем цвет сегмента
    ctx.fillStyle = colors[index];
    
    // Рисуем сегмент
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, startAngle + segmentAngle);
    ctx.lineTo(150, 150);
    ctx.fill();
    
    // Добавляем текст
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, 90, 0);
    ctx.restore();

    // Переход к следующему сегменту
    startAngle += segmentAngle;
  });
}

// Функция анимации вращения колеса
function rotateWheel() {
  spinAngle += 20; // Скорость вращения
  spinAngle %= 360;
  canvas.style.transform = rotate(${spinAngle}deg);

  // Уменьшение скорости
  if (spinTimeout) {
    clearTimeout(spinTimeout);
  }
  spinTimeout = setTimeout(() => {
    if (spinAngle > 0.5) {
      rotateWheel();
    } else {
      stopWheel();
    }
  }, 10);
}

// Старт вращения
function startSpin() {
  if (!isSpinning) {
    isSpinning = true;
    spinAngle = Math.random() * 5000 + 2000; // Генерация случайного угла
    rotateWheel();
  }
}

// Остановка вращения и отображение результата
function stopWheel() {
  const segmentAngle = 360 / segments.length;
  const winningSegmentIndex = Math.floor((360 - (spinAngle % 360)) / segmentAngle) % segments.length;
  const winningSegment = segments[winningSegmentIndex];

  // Отображение результата через модальное окно
  showModal(`Поздравляем! Вы выиграли: ${winningSegment}`);

  // Сброс состояния
  isSpinning = false;
  spinAngle = 0;
}

// Функция отображения модального окна
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

// Обработчик закрытия модального окна
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Обработчик нажатия кнопки "Крутить"
spinButton.addEventListener("click", startSpin);

// Инициализация колеса
drawWheel();