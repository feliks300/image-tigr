
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let users = require('./users.json');

// Регистрация
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }
  users.push({ username, password });
  fs.writeFileSync('./backend/users.json', JSON.stringify(users, null, 2));
  res.json({ message: 'Регистрация прошла успешно' });
});

// Вход
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверные учетные данные' });
  }
  res.json({ message: 'Вход выполнен успешно' });
});

// Генерация
app.post('/api/generate', (req, res) => {
  const { prompt, type, style } = req.body;
  const fakeUrl = type === 'image' ? '/sample.jpg' : '/sample.mp4';
  res.json({ url: fakeUrl });
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
