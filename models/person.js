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
    minlength: [3, 'User name must be longer than 3 characters'],
    required: [true, 'User name required']
  },
  number: {
    type: String,
    minlength: [8, 'User number must be at least 8 digits'],
    validate: {
      validator: function(v) {
        return /(\d{3}|\d{2})-\d/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Correct formats: 12-3456789 or 123-4567890`
    },
    required: [true, 'User phone number required']
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
