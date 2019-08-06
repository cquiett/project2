//Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()
const app = express()

// Configuration
const PORT = process.env.PORT
const mongoURI = process.env.MONGO_URI


// Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'))
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo', mongoURI)
})

// Routes
//Index
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
})

app.get('/app', (req, res)=>{
  res.render('app/index.ejs')
})

//Controllers
const userController = require('./controllers/users.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

// Listen
app.listen(3001, () => console.log('auth happening on port', 3001))
