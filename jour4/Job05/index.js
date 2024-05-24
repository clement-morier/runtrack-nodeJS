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

// Définir un schéma pour la collection "student"
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year'
  }
});

// Modèle Student basé sur le schéma "student"
const Student = mongoose.model('Student', studentSchema);

// Requête pour récupérer l'ensemble des étudiants avec leurs cursus
async function getStudentsWithYear() {
  try {
    const students = await Student.find().populate('year_id');
    console.log('Liste des étudiants avec leurs cursus :');
    students.forEach(student => {
      console.log(`${student.firstname} ${student.lastname} - ${student.year_id.year}`);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants :', error);
  } finally {
    // Déconnexion de la base de données une fois l'opération terminée
    mongoose.disconnect();
  }
}

// Appel de la fonction pour récupérer les étudiants avec leurs cursus
getStudentsWithYear();
