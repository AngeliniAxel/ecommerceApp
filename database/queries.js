const { use } = require('../routes/auth-routes');
const pool = require('./db');

const findUserById = async (id) => {
  const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return data;
};

const findOrCreateUser = async (id, name, last_name, img, email) => {
  try {
    const fetchedUser = await findUserById(id);
    if (fetchedUser.rowCount) {
      return fetchedUser.rows;
    } else {
      await pool.query(
        'INSERT INTO users (id, name, last_name, img, email) VALUES ($1, $2, $3, $4, $5)',
        [id, name, last_name, img, email]
      );
      const createdUser = await findUserById(id);
      return createdUser.rows;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const findOrCreateCart = async (userId) => {
  try {
    const fetchedCart = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );
    if (fetchedCart.rowCount) {
      return fetchedCart.rows;
    } else {
      await pool.query('INSERT INTO carts (user_id) VALUES ($1)', [userId]);
      const createdCart = await pool.query(
        'SELECT * FROM carts WHERE user_id = $1',
        [userId]
      );
      return createdCart.rows;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const queries = { findUserById, findOrCreateUser, findOrCreateCart };

module.exports = queries;
