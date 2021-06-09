const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name \'{VALUE}\' is too short. Name field must have minimum lenght of 3 characters'],
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: [8, 'Number \'{VALUE}\' is too short. Number field must have minimum lenght of 8 characters'],
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)