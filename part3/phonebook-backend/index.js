require('dotenv').config()
//const { request } = require('express')
const express = require('express')
const morgan = require('morgan') //Logging
const app = express()

app.use(express.static('build'))

//Allow requests from all origins:
const cors = require('cors')
app.use(cors())

//json-parser de express
app.use(express.json())

//Logging middleware
morgan.token('data', (request) => {
  if (request.method === 'POST')
    return JSON.stringify(request.body)

  return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//Model
const Person = require('./models/person')

//Get Info of the API
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const how_many = persons.length
    response.send(`<p>Phonebook has info for ${how_many} people</p>` +
            '<p>' + Date() + '</p>')
  })
})

//Get people list
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//Get person $id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) { response.json(person.toJSON()) }
      else { response.status(404).end() }
    })
    .catch(error => next(error))
})

//Delete person $id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

//Add new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(saveAndFormattedPerson => {
      response.json(saveAndFormattedPerson)
    })
    .catch(error => next(error))

})

//Modify person $id
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  //https://es.stackoverflow.com/questions/345025/mongoose-unique-validator-message-cannot-read-property-ownerdocument-of-nu
  Person.findByIdAndUpdate(
    request.params.id,
    person,
    {
      new: true, //devuelve el objeto actualizado
      runValidators: true, //aplica las validaciones del esquema del modelo
      context: 'query' //necesario para las disparar las validaciones de mongoose-unique-validator
    }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//Handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

//Listen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})