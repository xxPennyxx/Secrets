require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/secretsDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ email: username });
    if (existingUser) return res.redirect('/register');

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email: username, password: hash });
    await newUser.save();
    res.render('secrets');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ email: username });

    if (foundUser && await bcrypt.compare(password, foundUser.password)) {
      res.render('secrets');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log("OMG! Check out my secrets at http://localhost:3000 !");
});
