const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
const newContent = "Je manipule les fichiers avec un module node !";
fs.writeFile(filePath, newContent, 'utf8', (err) => {
    if (err) {
        console.error('Erreur lors de l\'écriture dans le fichier :', err);
        return;
    }
    console.log('Le contenu du fichier data.txt a été modifié avec succès !');
});