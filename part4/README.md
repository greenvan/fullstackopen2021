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

## Exercise 4.3: Helper functions and unit tests, step 1
1. Create `utils/list_helper.js`
2. Create `tests` folder.
3. Install jest in development mode
```bash
npm install --save-dev jest
```
4. In `package.json` define `npm script test` and add `jest` section
```json
{
  "scripts": {
   //...
    "test": "jest --verbose"
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```
5. Add `"jest": true` to 'env' in `.eslintrc.js` file.
6. Add to file `utils/list_helper.js` a `dummy` function that receives an array of blog posts as a parameter and always returns the value 1:
```js
const dummy = (blogs) => {
  // Dummy test always returns 1
  return 1
}

module.exports = {
  dummy
}
```
7. Create `tests/list_helper.test.js` with this content:
```js
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
```
8. Run npm test

## Exercise 4.4: Helper functions and unit tests, step 2
`totalLikes` function in `utils/list_helper.js` file:
```js
const totalLikes = (blogs) => {
  const reducer = (accumulator, current) => accumulator + current.likes
  return blogs.reduce(reducer,0)
}
```
Tests in `tests/list_helper.test.js`:
```js

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Ready-made list',() => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  }
  )

  test('Empty list',() => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  }
  )
})
```

## Exercise 4.5*: Helper functions and unit tests, step 3
`favoriteBlog` function in `utils/list_helper.js`: 
```js
const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return null

  const reducer = (accumulator, current) => current.likes > accumulator.likes ? current : accumulator
  const favorite = blogs.reduce(reducer)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}
```
Test section in `tests/list_helper.test.js`:

```js
describe('Favorite Blog', () => {
  test('Empty list',() => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  }
  )

  const favorite = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('Favorite Blog is Canonical string reduction',() => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favorite)
  }
  )
})
```

## Exercise 4.6*: Helper functions and unit tests, step 4
Lodash library https://lodash.com/ 
1. Install:
```bash
$ npm i -g npm
$ npm i lodash
```
2. Load the full build in `utils/list_helper.js`:
```js
var _ = require('lodash')
```
3. Create mostBlogs function in `utils/list_helper.js`:
```js
const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null

  const numBlogsList = _.countBy(blogs,'author') //groupedBy + mapValues
  const formattedNumBlogsList = _.map(numBlogsList, (value,key) => ({ author:key, blogs:value }))

  return  _.maxBy(formattedNumBlogsList, 'blogs') //Max value of 'blogs' field
}
```
4.Create Test section in `tests/list_helper.test.js`:
```js
describe('mostBlogs', () => {
  test('Empty list',() => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  }
  )

  const mostBlogger = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('Most blogger is Robert C. Martin with 3 blogs',() => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogger)
  }
  )
})
```

## Exercise 4.7*: Helper functions and unit tests, step 5
1. Create `mostLikes` function in `utils/list_helper.js`:
```js
const mostLikes = (blogs) => {
  if(blogs.length === 0) return null

  function sumLikes(blogList){
    return _.sumBy(blogList,'likes')
  }

  const groupedList = _.groupBy(blogs,'author') //Blog list for each author
  const formattedgroupedList = _.map(groupedList,
    (value,key) => ({ author:key, likes:sumLikes(value) }) //With each author, the sum of likes
  )

  return   _.maxBy(formattedgroupedList, 'likes') //Max value of 'likes' field
}
```
2.Create Test section in `tests/list_helper.test.js`:
```js
describe('mostLikes', () => {
  test('Empty list',() => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  }
  )

  const mostLiked = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('Most liked is Edsger W. Dijkstra with 17 Likes',() => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLiked)
  }
  )
})
```

