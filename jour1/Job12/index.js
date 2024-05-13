const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Erreur interne du serveur');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});
server.listen(8888, () => {
    console.log('Le serveur écoute sur le port 8888...');
});