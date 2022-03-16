const fs = require('fs');
const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt');

const express = require('express');
const app = express();

app.use('', express.static('./'))

app.get('/', (req, res, next) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
});



const https = require('https');
const server = https.createServer({ key, cert }, app);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});