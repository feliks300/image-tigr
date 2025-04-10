
document.getElementById('auth-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
    }
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert('Ошибка авторизации');
  }
});

document.getElementById('generate-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const type = document.getElementById('type').value;
  const style = document.getElementById('style').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Генерация...</p>';

  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type, style })
  });

  const data = await res.json();
  if (type === 'image') {
    resultDiv.innerHTML = `<img src="${data.url}" alt="Generated image" width="300">`;
  } else {
    resultDiv.innerHTML = `<video controls width="300"><source src="${data.url}" type="video/mp4"></video>`;
  }
});
