# Vapeur

Vapeur is a dynamic web application for managing a video game collection. This project uses Express.js for the backend, Prisma for database management with SQLite, and Handlebars as the templating engine.

## Main Features

The Vapeur application allows:

1. **Game Management**:
   - Create, edit, and delete games.
   - Display game details, including title, description, release date, genre, and publisher.
   - Highlight certain games on the homepage.

2. **Game Genre Management**:
   - View a list of genres.
   - See games associated with a specific genre.

3. **Game Publisher Management**:
   - Create, edit, and delete publishers.
   - View a list of publishers.
   - See games associated with a specific publisher.

## Prerequisites

Before starting, ensure the following are pre-installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the Git repository**:

   ```bash
   git clone <REPO_URL>
   cd Vapeur_Detournay_Bordet

   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** at the root of the project to configure environment variables:

   ```env
   DATABASE_URL="file:./prisma/database.db"
   ```

4. **Configure Prisma** :

   - Initialize the database and apply migrations:
     
     ```bash
     npx prisma migrate dev --name init
     ```

   - Seed the database with default genres and publishers:
     
     ```bash
     npm run seed
     ```

5. **Start the server** :

   ```bash
   npm start
   ```

6. **Access the application** in your browser:

   ```
   http://localhost:3000
   ```

## Project Structure

```
Vapeur_Detournay_Bordet/
├── prisma/                 # Prisma files
│   ├── schema.prisma          # Database schema definition
│   └── seed.js                # File to initialize default data
├── public/                 # Static files
│   └── css/
│       └── global.css            # CSS file
├── routes/                 # Route definitions
│   ├── editorRoutes.js        # Routes for publishers
│   ├── gameRoutes.js          # Routes for games
│   └── genreRoutes.js         # Routes for genres
├── views/                  # Handlebars templates
│   ├── editors/               # Templates for publishers
│   │   ├── edit.hbs              # Edit form
│   │   ├── games.hbs             # List of a publisher's games
│   │   ├── index.hbs             # List of publishers
│   │   └── new.hbs               # Creation form
│   ├── games/                 # Templates for games
│   │   ├── details.hbs           # Game details
│   │   ├── edit.hbs              # Edit form
│   │   ├── index.hbs             # List of games
│   │   └── new.hbs               # Creation form
│   ├── genres/                # Templates for genres
│   │   ├── games.hbs             # List of a genre's games
│   │   └── index.hbs             # List of genres
│   └── partials/              # Partial templates
│       ├── header.hbs            
│       ├── index.hbs             
│       └── layout.hbs            # Main layout
├── .gitignore              # Files to ignore in Git
├── package-lock.json       
├── package.json            # Dependencies and npm scripts
├── README.md               # Project documentation
└── server.js               # Express server

```


---

Created by Corentin Detournay and Enzo Bordet.

Thank you for using Vapeur!
