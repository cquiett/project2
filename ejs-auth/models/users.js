const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: String,
  password: String
})

//convert schema into a model
const User = mongoose.model('User', userSchema)

module.exports = User
