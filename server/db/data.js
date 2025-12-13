const pool = require('./database');

// - Posts CRUD -
async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY date DESC');
  return result.rows;
}

async function getPostById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id=$1', [id]);
  return result.rows[0];
}

async function createPost(body) {
  const result = await pool.query(
    'INSERT INTO posts(body, date) VALUES ($1, NOW()) RETURNING *',
    [body]
  );
  return result.rows[0];
}

async function updatePost(id, body) {
  const result = await pool.query(
    'UPDATE posts SET body=$1 WHERE id=$2 RETURNING *',
    [body, id]
  );
  return result.rows[0];
}

async function deletePost(id) {
  await pool.query('DELETE FROM posts WHERE id=$1', [id]);
}

async function deleteAllPosts() {
  await pool.query('DELETE FROM posts');
}

// - Users -
async function createUser(email, passwordHash) {
  const result = await pool.query(
    'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );
  return result.rows[0];
}



module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
  createUser,
  getUserByEmail
};
