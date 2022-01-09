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

let persons = [
      {
        name: "Ida Lovelace",
        number: "39-44-5323523",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
    ]
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).json({
          error: 'content missing'
        })
      }
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
        error: 'content missing'
    })
    }
  })

  const generateId = () => {
    const id = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)
    return id
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.some(p => p.name === body.name)) {
      return response.status(400).json({
          error: 'name must be unique'
      })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  