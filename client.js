const http = require('http');   // модуль для створеннязапитів
const zlib = require('zlib');   // модуль для стиснення gzip

// Текст на  сервер
const message = 'Привіт, сервер! Це gzip-файл з Node.js 👋';

const gzippedData = zlib.gzipSync(message);

const options = {
  hostname: 'localhost',             
  port: 3001,                       
  path: '/',                         
  method: 'POST',                  
  headers: {                        
    'Content-Type': 'application/gzip',       
    'Content-Encoding': 'gzip',              
    'Content-Length': gzippedData.length      
  }
};

// Створюємо сам HTTP-запит
const req = http.request(options, (res) => {
  let responseData = '';


  res.on('data', (chunk) => {
    responseData += chunk.toString(); 
  });

  // Коли відповідь повністю отримана — виводимо її
  res.on('end', () => {
    console.log('Відповідь від сервера:', responseData);
  });
});

// Обробка помилок під час запиту
req.on('error', (e) => {
  console.error(`Проблема з запитом: ${e.message}`);
});

req.write(gzippedData);

req.end();
