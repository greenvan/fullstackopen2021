# Phone Book backend
from *Part 3: Communicating with servert* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of exercises 3.1 to 3.22.

<b>The app has been deployed using Heroku at this address:
https://gv-fso-2021-part3.herokuapp.com/ </b>

The code of the backend app can be found inside ['phonebook-backend'](https://github.com/greenvan/fullstackopen2021/tree/main/part3/phonebook-backend) folder

The code of the frontend app can be found inside ['phonebook-frontend'](https://github.com/greenvan/fullstackopen2021/tree/main/part3/phonebook-frontend) folder

- [Phone Book backend](#phone-book-backend)
  * [Exercise 3.1: PhoneBook backend step 1](#exercise-31-phonebook-backend-step-1)
  * [Exercise 3.2: PhoneBook backend step 2](#exercise-32-phonebook-backend-step-2)
  * [Exercise 3.3: PhoneBook backend step 3](#exercise-33-phonebook-backend-step-3)
  * [Exercise 3.4: PhoneBook backend step 4](#exercise-34-phonebook-backend-step-4)
  * [Exercise 3.5: PhoneBook backend step 5](#exercise-35-phonebook-backend-step-5)
  * [Exercise 3.6: PhoneBook backend step 6](#exercise-36-phonebook-backend-step-6)
  * [Exercise 3.7: PhoneBook backend step 7](#exercise-37-phonebook-backend-step-7)
  * [Exercise 3.8*: PhoneBook backend step 8](#exercise-38-phonebook-backend-step-8)
  * [Exercise 3.9: PhoneBook backend step 9](#exercise-39-phonebook-backend-step-9)
- [Deploy to Heroku](#exercise-310-phonebook-backend-step-10)
  * [Exercise 3.10: PhoneBook backend step 10](#exercise-310-phonebook-backend-step-10)
  * [Exercise 3.11: PhoneBook Full Stack](#exercise-311-phonebook-full-stack)
- [Phone Book Database](#exercise-312-command-line-database-at-mongodb)
  * [Exercise 3.12 Command-line database at MongoDB](#exercise-312-command-line-database-at-mongodb)
  * [Exercise 3.13: Phonebook database, step 1](#exercise-313-phonebook-database--step-1)
  * [Exercise 3.14: Phonebook database, step 2](#exercise-314-phonebook-database--step-2)
  * [Exercise 3.15: Phonebook database, step 3](#exercise-315-phonebook-database--step-3)
  * [Exercise 3.16: Phonebook database, step 4](#exercise-316-phonebook-database--step-4)
  * [Exercise 3.17*: Phonebook database, step 5](#exercise-317---phonebook-database--step-5)
  * [Exercise 3.18*: Phonebook database step 6](#exercise-318-phonebook-database-step-6)
  * [Exercise 3.19: Phonebook database step 7](#exercise-319-phonebook-database-step-7)
  * [Exercise 3.20*: Phonebook database step 8](#exercise-320-phonebook-database-step-8)
- [Phone Book final Full Stack](#exercise-321-deploying-the-database-backend-to-production)
  * [Exercise 3.21: Deploying the database backend to production](#exercise-321-deploying-the-database-backend-to-production)
  * [Exercise 3.22: Lint configuration](#exercise-322-lint-configuration)
    + [Changes in the eslint rules](#changes-in-the-eslint-rules)
    + [VSCode EsLint plugin](#vscode-eslint-plugin)

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

## Exercise 3.12 Command-line database at MongoDB
1. Create: Organization, Project and Cluster (AWS, Frankfurt)
2. Database Access --> Create database user, read and Write
3. Network Access --> Allow from anywhere
4. Clusters --> Connect

```
mongodb+srv://fullstack:<password>@cluster0.3ji6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

5. Install Mongoose `npm install mongoose`
6. Create mongo.js:

```js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.3ji6l.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

//Add new Person: node mongo.js yourpassword "Arto Vihavainen" 045-1232456
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })

}
else { //Show list: node mongo.js yourpassword

  Person.find({}).then(result => {

    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    
    mongoose.connection.close()
  })

}
```

## Exercise 3.13: Phonebook database, step 1
1. Create new module file `models/person.js` as guided in `notes-app` examples: 
```js
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
```
2. In index.js: `const Person = require('./models/person')`
3. Define environment variables

    3.1 Install dotenv library: `npm install dotenv`

    3.2 Create .env file and edit index.js to include the variables.

```js
MONGODB_URI='mongodb+srv://fullstack:XPASSWORDX@XXclusterdb.mongodb.netXXX/phone-app?retryWrites=true&w=majority'
PORT=3001
```
In index.js, add this line before  the note model is imported
  ```js
  require('dotenv').config()
  ``` 

4. Modify index.js in order to use database in route handlers:

```js
const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

```

## Exercise 3.14: Phonebook database, step 2

Edit post part in `index.js`

```js
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
```

## Exercise 3.15: Phonebook database, step 3

Deleting from database, in `index.js` file:

```js 
app.delete('/api/persons/:id', (request, response) => {

    Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    
})
```

## Exercise 3.16: Phonebook database, step 4
New error handler middleware


```js
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) { response.json(person.toJSON()) }
            else { response.status(404).end() }
        })
        .catch(error => next(error))
})

[...]

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(response.status(204).end())
        .catch(error => next(error))
})

[...]

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


```

## Exercise 3.17*: Phonebook database, step 5
Update existing entry with new number:

```js
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
```

## Exercise 3.18*: Phonebook database step 6

```js
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const how_many = persons.length
        response.send(`<p>Phonebook has info for ${how_many} people</p>` +
            '<p>' + Date() + '</p>')
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
```

## Exercise 3.19: Phonebook database step 7
Validation
1. Install mongoose-unique-validator `npm install mongoose-unique-validator`
2. Edit `models/person.js` file following [mongoose-unique-validator tutorial](https://github.com/blakehaswell/mongoose-unique-validator#readme)

```js
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true
  },
})

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);
```
3. Propagate error to errorHandler instead of checking if fields are empty

```js
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
```
4. Add new `else` to `errorHandler`
```js
 else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
```
## Exercise 3.20*: Phonebook database step 8
1. Add `minlength` field to mongoose schema at `model/person.js`file. Added a customized error message following tutorial at https://mongoosejs.com/docs/validation.html
```js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name '{VALUE}' is too short. Name field must have minimum lenght of 3 characters"],
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: [8, "Number '{VALUE}' is too short. Number field must have minimum lenght of 8 characters"],
    required: true
  },
})
```
2. Enable validators on update at PUT '/api/persons/:id' by using option `runValidators: true`. We also need context in order to enable mongoose-unique-validator too [Source:](//https://es.stackoverflow.com/questions/345025/mongoose-unique-validator-message-cannot-read-property-ownerdocument-of-nu)

```js
    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { new: true, //devuelve el objeto actualizado
            runValidators: true, //aplica las validaciones del esquema del modelo
            context: 'query' //necesario para las disparar las validaciones de mongoose-unique-validator
        }
    )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
```
3. Expand the frontend so that it displays an error message when a validation error occurs: Include this part after then() when in `phoneService.update(...)` and `phoneService.create(...)`
```js
       .catch(error => {
          notifyWith(`Error: ${error.response.data}`,'error')
          console.log(error.response.data)
        })
```

## Exercise 3.21: Deploying the database backend to production
1. Set Heroku environment variables:
```bash
$ heroku config:set MONGODB_URI='mongodb+srv://fullstack:secretpasswordhere@cluster.mongodb.net/phone-app?retryWrites=true'
```
2. Deploy to heroku the build folder using `npm run deploy:full`

## Exercise 3.22: Lint configuration
1. Install ESlint as a development dependency to the backend project with the command:
```bash
npm install eslint --save-dev
```
2. Initialize a default ESlint configuration with the command:
```
node_modules/.bin/eslint --init
```
The initial configuration will be saved in the .eslintrc.js file

3. Create npm script so we can run with `npm run lint`
```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...
    "lint": "eslint ."
  },
  // ...
}
```
4. In order to ignore `build` folder in the previous command, create an .eslintignore file in the project's root with the following contents:
```
build
```

### Changes in the eslint rules
In the .eslintrc.js file, change several items:

1. change the rule concerning indentation, so that the indentation level is two spaces.

```json
"indent": [
    "error",
    2
],
```
2. Add the eqeqeq rule that warns us, if equality is checked with anything but the triple equals operator. 

```json
   'eqeqeq': 'error',
```

3. Prevent unnecessary trailing spaces at the ends of lines.
```json
    'no-trailing-spaces': 'error'
```
4. Require that there is always a space before and after curly braces.
```json
    'object-curly-spacing': [
        'error', 'always'
    ]
```
5. Demand a consistent use of whitespaces in the function parameters of arrow functions.

```json
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ]
```

6. Disable warns about console.log commands. We can enable by defining its "value" as '1'
```
'no-console': 0
```

7. In order to fix the process linting error, we must add `"node": true,` in `env` section.
```json
  {
    "env": {
        "node": true,

        [...]
  }
```
### VSCode EsLint plugin

Install VS Code ESlint plugin (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and allow it access to the workspace.

In order to have the formatter working with eslint we have to edit VSCode configuration file. Following this tutorial: https://daveceddia.com/vscode-use-eslintrc/ 

Added this part to VSCode's configuration file:

```json
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```