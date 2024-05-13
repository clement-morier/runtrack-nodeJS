const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier :', err);
        return;
    }

    let result = '';
    for (let i = 0; i < data.length; i += 2) {
        result += data[i];
    }
    console.log('Une lettre sur deux du fichier data.txt :\n', result);
});