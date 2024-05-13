const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }
    console.log('Contenu du fichier data.txt :\n', data);
});