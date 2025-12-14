// server.js
const express = require('express');
const pool = require('./db/database');
const cors = require('cors')
const port = process.env.PORT || 3000;
const initDatabase = require('./db/init');

// Secure
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors( { origin: 'http://localhost:8080', credentials: true } ));

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(cookieParser());

// Connect router
const usersRoutes = require('./api/users');
const postRoutes = require('./api/posts');

app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);

//  Handling HTTP requests code will go here  

(async () => {
  try {
    await initDatabase(); // вызываем функцию
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
})();