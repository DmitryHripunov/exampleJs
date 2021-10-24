const fs = require('fs');
const path = require('path');

//асинхронные методы
fs.writeFile('text.txt', 'works', 'utf-8', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  fs.readFile('text.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(data);
  })
});

console.log(fs.readFileSync(path.join(__dirname, 'text.txt'), 'utf-8'));

// fs.mkdir - создание директории
// fs.rmdir - удаление директории
// fs.onLink - удаление файла
// fs.appendFile - дописывает данные в конец файла например для логирования
// fs.copyFile - coppy данные файла


//синхронные методы
// fs.writeFileSync('text.txt', 'works', 'utf-8');
// console.log(fs.readFileSync('text.txt', 'utf-8'));
