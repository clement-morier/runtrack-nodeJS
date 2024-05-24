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

// Définir un schéma pour la collection "year"
const yearSchema = new mongoose.Schema({
  year: String
});

// Modèle Year basé sur le schéma "year"
const Year = mongoose.model('Year', yearSchema);

// Créer les années spécifiées
const yearsData = [
  { year: 'Bachelor 1' },
  { year: 'Bachelor 2' },
  { year: 'Bachelor 3' }
];

// Fonction pour ajouter les années à la base de données
async function addYears() {
  try {
    // Ajouter les années à la base de données
    const insertedYears = await Year.insertMany(yearsData);

    // Log des années ajoutées avec succès
    console.log('Années ajoutées avec succès.');

    // Récupérer les IDs des années ajoutées
    const yearIds = insertedYears.map(year => year._id);

  } catch (error) {
    console.error('Erreur lors de l\'ajout des années :', error);
  } finally {
    // Déconnexion de la base de données une fois l'opération terminée
    mongoose.disconnect();
  }
}

// Appel de la fonction pour ajouter les années
addYears();
