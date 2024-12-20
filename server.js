const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const hbs = require("hbs");
const { engine } = require('express-handlebars');

// Initialisation de l'application
const app = express();
const prisma = new PrismaClient();

// Configuration de Handlebars avec l'enregistrement du helper
const hbsEngine = engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main',
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    formatDate: function (date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Mois de 01 à 12
      const day = d.getDate().toString().padStart(2, '0'); // Jour de 01 à 31
      return `${year}-${month}-${day}`; // Format final : YYYY-MM-DD
    },
    eq: function (a, b) {
      return a === b;
    }
  }
});

// Sert des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de Handlebars
app.engine('hbs', hbsEngine);
app.set("view engine", "hbs"); // Définit Handlebars comme moteur de template
app.set("views", path.join(__dirname, "views")); // Définit le dossier des vues
hbs.registerPartials(path.join(__dirname, "views", "partials")); // Définit le dossier des partials

// Décortique les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Importation des routeurs
const genreRouter = require('./routers/genre');
app.use('/genres', genreRouter);

const jeuxRouter = require('./routers/jeux');
app.use('/jeux', jeuxRouter);

const editeurRouter = require('./routers/editeur');
app.use('/editeurs', editeurRouter);

// Route principale "/" avec récupération des jeux mis en avant
app.get('/', async (req, res) => {
  try {
    // Récupération des jeux mis en avant
    const jeuxMisEnAvant = await prisma.jeu.findMany({
      where: { misEnAvant: true },
      orderBy: { titre: 'asc' }
    });

    // Affichage de la vue "index.hbs" avec les jeux récupérés
    res.render('index', { jeuxMisEnAvant });
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux mis en avant :", error);
    res.status(500).send("Erreur interne du serveur.");
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
