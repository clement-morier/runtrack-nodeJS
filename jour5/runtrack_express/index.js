const express = require("express");
const app = express();

const port = 80;

// Définir une route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil de notre site web !');
  });
  
  // Route pour la page de présentation du projet
  app.get('/about', (req, res) => {
    res.send('Cette page présente notre projet : un site web construit avec Express.js.');
  });
  
  // Démarrer le serveur
  app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
  });