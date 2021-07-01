const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    minlength:
    [
      3,
      'Username \'{VALUE}\' is too short. Username must have minimum lenght of 3 characters'
    ],
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*$/,
      'Username must contain only alphanumeric characters or underscore, but no at the beggining or end'
    ]

  },
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User