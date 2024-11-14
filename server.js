const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Функция для получения промокодов
async function fetchPromoCodes() {
    try {
        const url = 'https://promokodi.net/ru/';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const promoCodes = [];
        
        // Парсим промокоды с сайта
        $('.promo-code-card .promo-code').each((index, element) => {
            const code = $(element).text().trim();
            if (code) {
                promoCodes.push(code);
            }
        });

        return promoCodes;
    } catch (error) {
        console.error('Ошибка при получении промокодов:', error);
        return [];
    }
}

// Эндпоинт для получения промокодов
app.get('/promocodes', async (req, res) => {
    const promoCodes = await fetchPromoCodes();
    res.json(promoCodes);
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});