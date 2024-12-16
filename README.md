# Vapeur
Vapeur est une application web dynamique pour gérer une collection de jeux vidéo. Ce projet utilise Express.js pour le backend, Prisma pour la gestion de base de données avec SQLite, et Handlebars comme moteur de templates.

## Fonctionnalités Principales
L'application Vapeur permet de :

Gestion des Jeux :

Créer, modifier et supprimer des jeux.
Afficher les détails d'un jeu, incluant le titre, la description, la date de sortie, le genre et l'éditeur.
Mettre en avant certains jeux sur la page d'accueil.
Gestion des Genres de Jeux :

Afficher une liste de genres.
Voir les jeux associés à un genre spécifique.
Gestion des Éditeurs de Jeux :

Créer, modifier et supprimer des éditeurs.
Afficher une liste des éditeurs.
Voir les jeux associés à un éditeur spécifique.
## Prérequis
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Cloner le dépôt Git :**:

   ```bash
   git clone <REPO_URL>
   ```

2. **Installer les dépendances :**:

   ```bash
   npm install
   ```

3. **Créer un fichier .env à la racine du projet pour configurer les variables d'environnement :

   ```env
   DATABASE_URL="file:./database.db"
   ```

4. **Configurer Prisma si necessaire (Normalement pas besoin):** :

   - Initialiser la base de données et appliquer les migrations :
     
     ```bash
     npx prisma migrate dev --name init
     ```

   - Peupler la base de données avec des genres et des éditeurs par défaut :
     
     ```bash
     npm run seed
     ```

5. **Démarrer le serveur :** :

   ```bash
   npm start
   ```

6. **Accéder à l'application depuis votre navigateur :** in your browser:

   ```
   http://localhost:3008
   ```

## Structure du Projet

```
Projet_Vapeur/
├── node_modules/            # Répertoire des dépendances Node.js
├── prisma/                  # Répertoire pour la base de données Prisma
│   ├── migrations/             # Fichiers des migrations Prisma
│   ├── prisma/                 # Sous-répertoire non détaillé
│   ├── database.db             # Fichier de la base de données SQLite
│   ├── schema.prisma           # Schéma de la base de données Prisma
│   └── seed.js                 # Script pour insérer les données initiales
├── routers/                # Répertoire contenant les fichiers de routes
│   ├── editeur.js             # Routes pour les éditeurs
│   ├── genre.js               # Routes pour les genres
│   └── jeux.js                # Routes pour les jeux
├── views/                  # Répertoire des templates Handlebars
│   ├── editeurs/              # Templates pour les éditeurs
│   │   ├── edit.hbs              # Formulaire de modification
│   │   ├── index.hbs             # Liste des éditeurs
│   │   ├── jeux.hbs              # Liste des jeux d'un éditeur
│   │   └── new.hbs               # Formulaire de création d'éditeur
│   ├── genres/                # Templates pour les genres
│   │   ├── edit.hbs              # Formulaire de modification
│   │   ├── index.hbs             # Liste des genres
│   │   ├── jeux.hbs              # Liste des jeux d'un genre
│   │   └── new.hbs               # Formulaire de création de genre
│   ├── jeux/                  # Templates pour les jeux
│   │   ├── details.hbs           # Détails d'un jeu
│   │   ├── edit.hbs              # Formulaire de modification
│   │   ├── index.hbs             # Liste des jeux
│   │   ├── new.hbs               # Formulaire de création de jeu
│   │   └── show.hbs              # Affichage d'un jeu spécifique
│   ├── layouts/               # Layouts généraux
│   │   └── main.hbs              # Layout principal
│   └── partials/              # Templates partiels
│       ├── footer.hbs            # Pied de page
│       ├── header.hbs            # En-tête
│       └── index.hbs             # Index partiel
│   └── index.hbs              # Page principale
├── .env                     # Fichier de configuration des variables d'environnement
├── .gitattributes           # Configuration Git
├── .gitignore               # Liste des fichiers ignorés par Git
├── package-lock.json        # Fichier de verrouillage des dépendances
├── package.json             # Liste des dépendances et scripts du projet
├── README.md                # Documentation du projet
└── server.js                # Point d'entrée du serveur Express.js


```


---

Créer par Guigue Axel et Virgile Marion
