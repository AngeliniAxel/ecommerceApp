const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database/db');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const cartRoutes = require('./routes/cart_routes');
const cookieSession = require('cookie-session');
require('./config/passport-setup');
const cookieParser = require('cookie-parser');
const cart_productsRoutes = require('./routes/cart_products-routes');
require('dotenv').config();
const path = require('path');

const PORT = process.env.PORT || '5000';

const app = express();
app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'ecommerce-session',
    keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use('/auth', authRoutes);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use('/api/cart', cartRoutes);

app.use('/api/cart_products', cart_productsRoutes);

app.get('/api', async (req, res) => {
  try {
    const test = await pool.query('SELECT * FROM products');
    res.send(test.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
