document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");
  const spinButton = document.getElementById("spinButton");

  // Список сегментов колеса
  const segments = [
    "Приз 1", "Приз 2", "Приз 3", "Приз 4", 
    "Приз 5", "Приз 6", "Приз 7", "Приз 8", 
    "Приз 9", "Приз 10"
  ];

  // Цвета для каждого сегмента
  const segmentColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
    "#9966FF", "#FF9F40", "#FF5733", "#33FF57", 
    "#FF6347", "#6A5ACD"
  ];

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200;
  let currentAngle = 0;
  let isSpinning = false;

  // Функция рисования колеса
  function drawWheel() {
    const segmentAngle = (2 * Math.PI) / segments.length;

    for (let i = 0; i < segments.length; i++) {
      // Устанавливаем цвет сегмента
      ctx.fillStyle = segmentColors[i];
      
      // Начинаем рисовать сегмент
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX, centerY, radius, 
        currentAngle, currentAngle + segmentAngle
      );
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Рисуем текст на сегменте
      ctx.save();
      ctx.translate(
        centerX + Math.cos(currentAngle + segmentAngle / 2) * (radius - 50),
        centerY + Math.sin(currentAngle + segmentAngle / 2) * (radius - 50)
      );
      ctx.rotate(currentAngle + segmentAngle / 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 16px Arial";
      ctx.fillText(
        segments[i], 
        -ctx.measureText(segments[i]).width / 2, 
        5
      );
      ctx.restore();

      // Увеличиваем угол для следующего сегмента
      currentAngle += segmentAngle;
    }

    // Рисуем стрелку
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - radius - 10);
    ctx.lineTo(centerX + 10, centerY - radius - 10);
    ctx.lineTo(centerX, centerY - radius + 20);
    ctx.fill();
  }

  // Функция вращения колеса
  function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    let spinAngle = Math.random() * 360 + 360 * 4; // Минимум 4 полных оборота
    let spinDuration = 4000; // Время вращения 4 секунды
    const startAngle = currentAngle;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      currentAngle = startAngle + (spinAngle * progress * (1 - progress)); // Замедление

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isSpinning = false;
        const winningIndex = Math.floor((segments.length * (1 - (currentAngle % (2 * Math.PI)) / (2 * Math.PI))));
        alert("Поздравляем! Вы выиграли: " + segments[winningIndex]);
      }
    }

    requestAnimationFrame(animate);
  }

  // Отрисовываем колесо при загрузке страницы
  drawWheel();

  // Обработчик кнопки "Крутить"
  spinButton.addEventListener("click", spinWheel);
});