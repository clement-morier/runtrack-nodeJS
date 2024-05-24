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
  // Appel de la fonction pour filtrer les étudiants
  filterStudents();
})
.catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

// Définir un schéma pour la collection "student"
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year'
  }
});

// Modèle Student basé sur le schéma "student"
const Student = mongoose.model('Student', studentSchema);

// Fonction pour filtrer les étudiants ayant un numéro d'étudiant plus grand que celui saisi par l'utilisateur
async function filterStudents() {
  try {
    // Demander à l'utilisateur de saisir le numéro d'étudiant
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Entrez le numéro d\'étudiant minimum : ', async (studentsNumber) => {
      readline.close();

      // Convertir l'entrée utilisateur en nombre entier
      studentsNumber = parseInt(studentsNumber);

      // Filtrer les étudiants avec un numéro d'étudiant supérieur à celui saisi par l'utilisateur
      const filteredStudents = await Student.find({ students_number: { $gt: studentsNumber } });

      // Afficher les étudiants filtrés dans la console
      console.log('Étudiants avec un numéro d\'étudiant plus grand que', studentsNumber, ':');
      filteredStudents.forEach(student => {
        console.log(`${student.firstname} ${student.lastname} - Numéro étudiant: ${student.students_number}`);
      });
    });
  } catch (error) {
    console.error('Erreur lors du filtrage des étudiants :', error);
  }
}
