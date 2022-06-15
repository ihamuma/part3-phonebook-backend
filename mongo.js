const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length == 4 ) {
    console.log('Please provide a name and a number as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
}

if (process.argv.length > 5 ) {
    console.log('Please do not provide additional arguments. Arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

console.log('schema defined in mongo.js')

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({})
    .then(console.log('Phonebook:'))
    .then(result => {
        result.forEach(person => {
          console.log(person.name, '', person.number)
        })
        mongoose.connection.close()
      })
}

if (process.argv.length == 5 ) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        })
    person.save()
      .then(result => {
      console.log(`Added ${person.name}, number ${person.number}, to phonebook`)
      mongoose.connection.close()
    })
}