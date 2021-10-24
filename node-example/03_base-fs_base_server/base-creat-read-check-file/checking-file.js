const fs = require('fs');
const path = require('path');

const readFileSafe = (file, defaultData, callback) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if(err) {
      if(err.code === 'ENOENT') {
        callback(null, defaultData);
      } else {
        callback(err);
      }
    } else {
      callback(null, data);
    }
  });
}

readFileSafe('text.txt', 'is default data', (err, data) => {
  if(data) {
    console.log(data);
  }
});