// routes/genre.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Permet d'afficher la liste des genres
router.get('/', async (req, res) => {
  try {
    // Permet de trouver tous les genres depuis la BD
    const genres = await prisma.genre.findMany(); 
    res.render('genres/index', { genres }); 
  } catch (error) {
    console.error('Erreur lors de la récupération des genres :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet d'afficher les jeux liés à un genre 
router.get('/:id/jeux', async (req, res) => {
  const genreId = parseInt(req.params.id);   // Récupère l'ID du genre depuis les paramètres de l'URL
  try {
    const genre = await prisma.genre.findUnique({ // Recherche le genre correspondant à l'ID
      where: { id: genreId },
      include: { jeux: true }, 
    });
    if (!genre) {
      return res.status(404).send('Genre non trouvé');
    }
    res.render('genres/jeux', { genre }); 
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux pour ce genre :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

/*// Permet d'afficher le formulaire de création de genre
router.get('/new', (req, res) => {
  res.render('genres/new'); 
});

// Permet de faire la création d'un genre
router.post('/new', async (req, res) => {
  const { nom } = req.body;
  try {
    //crée nouveau genre avec paramètre nom
    const newGenre = await prisma.genre.create({
      data: {
        nom,
      },
    });
    res.redirect('/genres'); 
  } catch (error) {
    console.error('Erreur lors de la création du genre :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet d'afficher le formulaire de modification d'un genre
router.get('/:id/edit', async (req, res) => {
  const genreId = parseInt(req.params.id);
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) {
      return res.status(404).send('Genre non trouvé');
    }
    res.render('genres/edit', { genre }); 
  } catch (error) {
    console.error('Erreur lors de la récupération du genre :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet de traiter la modification d'un genre
router.post('/:id/edit', async (req, res) => {
  const genreId = parseInt(req.params.id);
  const { nom } = req.body;
  try {
    // Met à jour le nom du genre
    const updatedGenre = await prisma.genre.update({
      where: { id: genreId },
      data: {
        nom, 
      },
    });
    res.redirect('/genres'); 
  } catch (error) {
    console.error('Erreur lors de la modification du genre :', error);
    res.status(500).send('Erreur du serveur.');
  }
});*/

module.exports = router;