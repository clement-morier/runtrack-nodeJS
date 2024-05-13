const fs = require('fs');
fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Erreur lors de la lecture du répertoire :', err);
        return;
    }
    const folders = files.filter(file => {
        return fs.statSync(file).isDirectory();
    });
    console.log("Contenu du répertoir courant :");
    folders.forEach(folder => {
        console.log(folder);
    });
});