const { Transform } = require('stream'); 

// Створюємо кастомний трансформуючий стрім
const customStream = new Transform({
  transform(chunk, encoding, callback) {
    const input = chunk.toString(); // перетвор у рядок

    const transformed = input
      .split('') 
      .map(char => {
       
        if (char.match(/[a-zа-яієґ]/i)) {
          return char.toUpperCase();
        }
        return char; 
      })
      .join(''); 

    console.log('Результат:', transformed); 
    callback(null, transformed); 
  }
});

process.stdin.pipe(customStream); 
