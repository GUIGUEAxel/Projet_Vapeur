const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route pour afficher la liste des éditeurs
router.get('/', async (req, res) => { // req = request et res = response
  try {
    // Permet de trouver tous les éditeurs depuis la BD
    const editeurs = await prisma.editeur.findMany(); 
    res.render('editeurs/index', { editeurs }); 
  } catch (error) {
    console.error('Erreur lors de la récupération des éditeurs :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet d'afficher les jeux d'un éditeur 
router.get('/:id/jeux', async (req, res) => {
  const editeurId = parseInt(req.params.id);
  try {
    //Permet d'avoir les éditeurs qui correspond aux paramètres d'après
    const editeur = await prisma.editeur.findUnique({
      where: { id: editeurId },
      include: { jeux: true }, // Inclut les jeux associés à cet éditeur
    });
    if (!editeur) {
      return res.status(404).send('Éditeur non trouvé');
    }
    res.render('editeurs/jeux', { editeur }); 
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux pour cet éditeur :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet d'afficher le formulaire de création d'un éditeur
router.get('/new', (req, res) => {
  res.render('editeurs/new'); 
});

// Permet de traiter la création d'un éditeur
router.post('/new', async (req, res) => {
  const { nom } = req.body;
  try {
    //crée nouvel éditeur avec paramètre nom
    const newEditeur = await prisma.editeur.create({
      data: {
        nom, 
      },
    });
    res.redirect('/editeurs'); 
  } catch (error) {
    console.error('Erreur lors de la création de l\'éditeur :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet d'afficher un formulaire de modification d'un éditeur
router.get('/:id/edit', async (req, res) => {
  const editeurId = parseInt(req.params.id); // Convertit l'id en entier
  try {
    const editeur = await prisma.editeur.findUnique({
      where: { id: editeurId },
    });
    if (!editeur) {
      return res.status(404).send('Éditeur non trouvé');
    }
    res.render('editeurs/edit', { editeur }); 
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'éditeur :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet de traiter la modification d'un éditeur
router.post('/:id/edit', async (req, res) => {
  const editeurId = parseInt(req.params.id);
  const { nom } = req.body;
  try {
    // Met à jour l'éditeur avec les nouveaux paramètres en fonction d'un id
    const updatedEditeur = await prisma.editeur.update({
      where: { id: editeurId }, 
      data: {
        nom,
      },
    });
    res.redirect('/editeurs'); 
  } catch (error) {
    console.error('Erreur lors de la modification de l\'éditeur :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

// Permet de supprimer un éditeur
router.post('/:id/delete', async (req, res) => {
  const editeurId = parseInt(req.params.id); // récupére l'id depuis L'url 
  try {
    await prisma.editeur.delete({
      where: { id: editeurId },
    });
    res.redirect('/editeurs'); 
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'éditeur :', error);
    res.status(500).send('Erreur du serveur.');
  }
});

module.exports = router;
