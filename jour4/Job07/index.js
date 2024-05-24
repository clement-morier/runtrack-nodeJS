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
  // Appel de la fonction pour récupérer les informations de l'étudiant
  getStudentInfo();
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

// Fonction pour récupérer les informations de l'étudiant à partir du nom de famille saisi par l'utilisateur
async function getStudentInfo() {
  try {
    // Demander à l'utilisateur de saisir le nom de famille de l'étudiant
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Entrez le nom de famille de l\'étudiant : ', async (lastname) => {
      readline.close();

      // Rechercher l'étudiant avec le nom de famille saisi par l'utilisateur
      const student = await Student.findOne({ lastname: lastname });

      // Vérifier si l'étudiant a été trouvé
      if (student) {
        console.log('Informations de l\'étudiant :');
        console.log(`Nom: ${student.lastname}`);
        console.log(`Prénom: ${student.firstname}`);
        console.log(`Numéro d'étudiant: ${student.students_number}`);
      } else {
        console.log(`Aucun étudiant trouvé avec le nom de famille ${lastname}.`);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'étudiant :', error);
  }
}
