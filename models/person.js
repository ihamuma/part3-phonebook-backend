const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3, //[3, 'Minimum length for name is 3'], custom message
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

console.log('schema defined in person.js')

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
