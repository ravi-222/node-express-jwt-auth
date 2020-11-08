const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Ravinder:qwerty123@cluster0.qcrnu.gcp.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

app.get('/set-cookies',(req,res) => {
  // res.setHeader('set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isWorking', true);
  res.send('coookkiiieeeesss!!!');
})

app.get('/read-cookies', (req,res) => {
  const cookies = req.cookies;
  res.json(cookies);
})