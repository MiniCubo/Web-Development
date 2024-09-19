var fs = require('fs');
fs.readFile("./data/input.txt",'utf8', (err, data) => {
    console.log(data)
  });