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
  // Appel de la fonction pour mettre à jour le cursus d'un étudiant
  updateStudentYearById();
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

// Fonction pour mettre à jour le cursus d'un étudiant en fonction de son ID
async function updateStudentYearById() {
  try {
    // Supposons que l'ID de l'étudiant et le nouvel ID du cursus sont fournis en tant qu'arguments de la fonction
    const studentId = 'ID_de_l_étudiant';
    const newYearId = 'Nouvel_ID_du_cursus';

    // Mettre à jour le cursus de l'étudiant en fonction de son ID
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: studentId }, // Filtre pour trouver l'étudiant par son ID
      { $set: { year_id: newYearId } }, // Modification du champ year_id
      { new: true } // Option pour retourner le document mis à jour
    );

    if (updatedStudent) {
      console.log('Cursus de l\'étudiant mis à jour avec succès :');
      console.log(updatedStudent);
    } else {
      console.log(`Aucun étudiant trouvé avec l'ID ${studentId}.`);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cursus de l\'étudiant :', error);
  } finally {
    // Déconnexion de la base de données une fois l'opération terminée
    mongoose.disconnect();
  }
}
