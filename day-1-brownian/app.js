const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let content = '';
  const fileName = path.basename(req.url);
  const localDir = __dirname;

  let filePath = __dirname + '/' + fileName;
  fs.readFile(filePath, (e, content) => {
    if (e) console.log(e);
    res.end(content);
  })

}).listen(3008);
