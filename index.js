require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data' ))
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    if (persons.some(p => p.id === id)) {
      persons = persons.filter(person => person.id !== id)
      return response.status(204).end()
    } else {
      return response.status(400).json({
        error: 'name missing'
    })
    }
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    console.log('person', person)
    
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
