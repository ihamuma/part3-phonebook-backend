const mongoose = require('mongoose')

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

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@phonebook.xu9n4.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
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

    const generateId = () => {
        const id = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)
        return id
      }

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: generateId()
        })

        person.save().then(result => {
        console.log(`Added ${person.name}, number ${person.number}, to phonebook`)
        mongoose.connection.close()
        })
}