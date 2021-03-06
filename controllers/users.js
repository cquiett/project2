
const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

//shows our form
users.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

//when we hit submit on our form
users.post('/', (req, res)=>{
  //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/')
    })
})


module.exports = users
