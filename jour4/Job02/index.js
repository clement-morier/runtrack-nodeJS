const mongoose = require('mongoose');

// URL de connexion à votre base de données MongoDB
const mongoURI = 'mongodb://localhost:27017/LaPlateforme';

// Connectez-vous à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connecté à MongoDB');
})
.catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

