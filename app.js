const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Mongoose setup
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/secretsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// User schema and model
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

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      // You can optionally render an error message instead
      return res.redirect('/register');
    }

    // Create and save the new user
    const newUser = new User({ email: username, password });
    await newUser.save();
    res.render('secrets');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ email: username });
    if (foundUser && foundUser.password === password) {
      res.render('secrets');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Server
app.listen(3000, () => {
  console.log('OMG! Check out my secrets at http://localhost:3000 !');
});
