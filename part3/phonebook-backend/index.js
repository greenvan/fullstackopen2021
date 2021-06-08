require('dotenv').config()
const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('build'))

//Allow requests from all origins:
const cors = require('cors')
app.use(cors())

app.use(express.json())

morgan.token('data', (request, response) => {
    if (request.method === 'POST')
        return JSON.stringify(request.body)

    return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const Person = require('./models/person')


app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const how_many = persons.length
        response.send(`<p>Phonebook has info for ${how_many} people</p>` +
            '<p>' + Date() + '</p>')
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) { response.json(person.toJSON()) }
            else { response.status(404).end() }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: 'Name is missing' });
    }
    if (!body.number) {
        return response.status(400).json({ error: 'Number is missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(person)
    })

})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})