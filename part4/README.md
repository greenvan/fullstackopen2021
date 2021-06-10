# Part 4: Testing Express servers, user administration
**Full Stack Course at th University of Helsinky (2021)**

This is a compilation of the exercises of Part 4.

## Exercise 4.1: Blog list, step1
1. Create backend with `npm init`
2. Install express with `npm install express`
3. Install nodemon `npm install --save-dev nodemon` as development dependency.
4. Add to scripts area of `package.json` start and dev lines:
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
5. Create index.js file with the received content.
```js
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
6. I've used same MongoDB Atlas DB from Part 3. Define environment variables:

    6.1 Install dotenv library: `npm install dotenv`

    6.2 Create .env file.
    ```js
    MONGODB_URI='mongodb+srv://fullstack:XPASSWORDX@XXclusterdb.mongodb.netXXX/bloglist?retryWrites=true&w=majority'
    ```
    6.3 In index.js, add this line before  the note model is imported
    ```js
    require('dotenv').config()
    ``` 
    6.4 And Change `const mongoUrl` declaration
    ```js
    const mongoUrl = process.env.MONGODB_URI
    ```
7. Install the required libraries: cors and mongoose
    ```
    npm install cors
    npm install mongoose
    ```
8. Start server with `npm run debug`


## Exercise 4.2: Blog list, step2
Refactor the application in order to have this structure:

```bash
├── index.js
├── app.js
├── controllers
│   └── blogs.js
├── models
│   └── blog.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
```

`index.js` file content (same as provided in notes app example):
```js
const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
```

`app.js` file content:
```js
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
  
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
```

`controllers/blogs.js` file content:
```js
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter
```

`models/blog.js` file content:
```js
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
module.exports = mongoose.model('Blog', blogSchema)
```

`utils/config.js` file content (same as provided in notes app example):
```js
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
```

`utils/logger.js` file content (same as provided in notes app example):
```js
const info = (...params) => {
    console.log(...params)
  }
  
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }
```
