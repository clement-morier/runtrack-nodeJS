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

// Définir un schéma pour la collection "student"
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String
});

// Modèle Student basé sur le schéma "student"
const Student = mongoose.model('Student', studentSchema);

// Créer les étudiants spécifiés
const studentsData = [
  { lastname: 'LeBricoleur', firstname: 'Bob' },
  { lastname: 'Doe', firstname: 'John' },
  { lastname: 'Dupont', firstname: 'Marine' }
];

// Fonction pour ajouter les étudiants à la base de données
async function addStudents() {
  try {
    // Ajouter les étudiants à la base de données
    await Student.insertMany(studentsData);
    console.log('Étudiants ajoutés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des étudiants :', error);
  } finally {
    // Déconnexion de la base de données une fois l'opération terminée
    mongoose.disconnect();
  }
}

// Appel de la fonction pour ajouter les étudiants
addStudents();