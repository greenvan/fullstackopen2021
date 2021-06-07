const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('build'))

//Allow requests from all origins
const cors = require('cors')
app.use(cors())

app.use(express.json())

morgan.token('data', (request, response) => {
    if (request.method === 'POST')
        return JSON.stringify(request.body)

    return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (request, response) => {
    const how_many = persons.length
    response.send(`<p>Phonebook has info for ${how_many} people</p>` +
        '<p>' + Date() + '</p>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) { response.json(person) }
    else { response.status(404).end() }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateIdOLd = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

const generateId = () => {
    //Source: https://gist.github.com/gordonbrander/2230317
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 10 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 10);
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({ error: 'Name is missing' });
    }
    if (!body.number) {
        return response.status(400).json({ error: 'Number is missing' })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'Name must be unique' });
    }

    const name = body.name
    const number = body.number

    const person = {
        name: name,
        number: number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})