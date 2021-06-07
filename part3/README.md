# Phone Book backend
from *Part 3: Communicating with servert* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of exercises 3.1 to 3.21.

The app has been deployed using Heroku at this address:
https://gv-fso-2021-part3.herokuapp.com/ 

The code of the backend app can be found inside ['phonebook-backend'](https://github.com/greenvan/fullstackopen2021/tree/main/part3/phonebook-backend) folder

The code of the frontend app can be found inside ['phonebook-frontend'](https://github.com/greenvan/fullstackopen2021/tree/main/part3/phonebook-frontend) folder

## Exercise 3.1: PhoneBook backend step 1

1. Create backend with `npm init`
2. Add to scripts area of `package.json` following line:
```json
    "start": "node index.js",
```
3. Install express with `npm install express`
4. Create `index.js` file and start server with `npm start`:
```js
const express = require('express')
const app = express()

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

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
```
5. Install nodemon `npm install --save-dev nodemon` as development dependency.
6. Add to scripts area of `package.json` dev line:
```js
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```
7. Start server with `npm run debug`

## Exercise 3.2: PhoneBook backend step 2
Added new get to `index.js`:
```js
app.get('/info', (request, response) => {
    const how_many = persons.length
    response.send(`<p>Phonebook has info for ${how_many} people</p>` +
        '<p>' + Date() + '</p>')
})
```

## Exercise 3.3: PhoneBook backend step 3
Added new get to `index.js`:
```js
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) { response.json(person) }
    else { response.status(404).end() }
})
```

## Exercise 3.4: PhoneBook backend step 4
Added delete to `index.js`
```js
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
```
Tested on VS Code in a `delete_2.rest` file with this line:
```
DELETE http://localhost:3001/api/persons/2
```

## Exercise 3.5: PhoneBook backend step 5
Add new entries.
Include the following in `index.js`
```js
app.use(express.json())
[...]

app.post('/api/persons', (request, response) => {
    const body = request.body

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
```

The function `generateId()` uses Math.random(), converts to base 36(numbers + letters) and then grab the first 10 characters after the decimal.
Source: https://gist.github.com/gordonbrander/2230317
```js
const generateId = () => {
    return  Math.random().toString(36).substr(2, 10);
}
```

Tested with this `post.rest` file:
```
POST http://localhost:3001/api/persons
Content-Type: application/json

{
"name": "Green Van",
"number": "12-34-56789"
}
```

## Exercise 3.6: PhoneBook backend step 6
Implement error handling for creating new entries when name or number is missing or the name already exists.
```js
    if (!body.name) {
        return response.status(400).json({ error: 'Name is missing' });
    }
    if (!body.number) {
        return response.status(400).json({ error: 'Number is missing' })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'Name must be unique' });
    }
```  

## Exercise 3.7: PhoneBook backend step 7
1. Install morgan `nmp install morgan`
2. Include this on `index.js`
```js
const morgan = require('morgan')
app.use(morgan('tiny'))
```

Snapshots of messages in the console:

```
[nodemon] starting `node index.js`
Server running on port 3001
GET /api/persons 200 223 - 4.048 ms
GET /api/persons/4 200 59 - 0.770 ms
GET /info 200 113 - 0.906 ms
```

## Exercise 3.8*: PhoneBook backend step 8
Add a new token `data` and replace `app.use(morgan(tiny))` with the new format string:

```js
morgan.token('data', (request, response) => {
    if (request.method === 'POST')
        return JSON.stringify(request.body)

    return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
```

Snapshots of messages in the console:

```
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Server running on port 3001
GET /info 200 113 - 35.069 ms
POST /api/persons 200 63 - 0.969 ms {"name":"Green Van 2","number":"12-34-56789"}
GET /persons/4 404 148 - 1.738 ms
```

## Exercise 3.9: PhoneBook backend step 9
Edit baseUrl in `services/phones.js` from frontend:
```js
const baseUrl = 'http://localhost:3001/api/persons'
```

Install cors in the backend to allow request from other origins:
```
npm install cors
```
Include the middleware to use and allow for requests from all origins:
In `index.js` from the backend:
```js
const cors = require('cors')
app.use(cors())
```

## Exercise 3.10: PhoneBook backend step 10
Deploy the backend to the internet (Heroku)

1. Create "Procfile"in the backend root directory:
```
web: npm start
```
2. Change the port definition in `index.js` file:
```js
const PORT = process.env.PORT || 3001
```
3. Create git repository:
  
    3.1 Create .gitignore file with this content:  `node_modules`
  
    3.2 Init git repo:  `git init --initial-branch=main`
  
4. Follow Heroku [Getting Started manual](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app):
  
    4.1 Create heroku application `heroku create gv-fso-2021-part3`

    4.2 Add files to repository `git add .`

    4.3 Initial commit: `git commit -m "Initial commit"`

    4.4 Deploy: `git push heroku main`

API people list:
https://gv-fso-2021-part3.herokuapp.com/api/persons

Info page:
https://gv-fso-2021-part3.herokuapp.com/info


## Exercise 3.11: PhoneBook Full Stack

1. Add the following declaration of middleware to backend's `index.js` file: 
```js
app.use(express.static('build'))
```
2. Change baseUrl to a relative one in `components/phones.js` file:
```js
const baseUrl = '/api/persons'
```
3. Create a production build: `npm run build` at the root of frontend app.
4. Copy `build` folder to backend root's directory.

5. Add some npm-scripts to the `package.json` of the backend: 

```json
{
 "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../phonebook-frontend/ && npm run build --prod && cp -r build ../phonebook-backend",
    "deploy": "git push heroku main",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
 }
}
```

6. Add proxy line to `package.json` file at the frontend, so it can work locally too:
```json
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```

7. Deploy to heroku the build folder using `npm run deploy:full`:
 
 ```json
  "scripts": {
 "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
  }
```

   