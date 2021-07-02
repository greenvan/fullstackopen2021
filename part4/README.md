# Part 4: Testing Express servers, user administration
**Full Stack Course at th University of Helsinky (2021)**

This is a compilation of the exercises of Part 4.


- [Exercise 4.1: Blog list, step1](#exercise-41-blog-list-step1)
- [Exercise 4.2: Blog list, step2](#exercise-42-blog-list-step2)
- [Exercise 4.3: Helper functions and unit tests, step 1](#exercise-43-helper-functions-and-unit-tests-step-1)
- [Exercise 4.4: Helper functions and unit tests, step 2](#exercise-44-helper-functions-and-unit-tests-step-2)
- [Exercise 4.5*: Helper functions and unit tests, step 3](#exercise-45-helper-functions-and-unit-tests-step-3)
- [Exercise 4.6*: Helper functions and unit tests, step 4](#exercise-46-helper-functions-and-unit-tests-step-4)
- [Exercise 4.7*: Helper functions and unit tests, step 5](#exercise-47-helper-functions-and-unit-tests-step-5)
- [Exercise 4.8: Blog list tests, step 1](#exercise-48-blog-list-tests-step-1)
- [Exercise 4.9*: Blog list tests, step 2](#exercise-49-blog-list-tests-step-2)
- [Exercise 4.10: Blog list tests, step 3](#exercise-410-blog-list-tests-step-3)
- [Exercise 4.11*: Blog list tests, step 4](#exercise-411-blog-list-tests-step-4)
- [Exercise 4.12*: Blog list tests, step 5](#exercise-412-blog-list-tests-step-5)
- [Exercise 4.13: Blog list expansions, step 1](#exercise-413-blog-list-expansions-step-1)
- [Exercise 4.14: Blog list expansions, step 2](#exercise-414-blog-list-expansions-step-2)
- [Exercise 4.15: Blog list expansions, step 3](#exercise-415-blog-list-expansions-step-3)
- [Exercise 4.16*: Blog list expansions, step 4](#exercise-416-blog-list-expansions-step-4)
- [Exercise 4.17: Blog list expansions, step 5](#exercise-417-blog-list-expansions-step-5)
- [Exercise 4.18: Blog list expansions, step 6](#exercise-418-blog-list-expansions-step-6)
- [Exercise 4.19: Blog list expansions, step 7](#exercise-419-blog-list-expansions-step-7)



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

## Exercise 4.8: Blog list tests, step 1

1. Test environment
  
    1.1  As I am using windows it is neccessry to install cross-env:
    `npm install --save-dev cross-env`

    1.2 Edit scripts area in `package.json` by adding NODE_ENV and runInBand in 'test'

    ```json
      {
        // ...
        "scripts": {
          "start": "cross-env NODE_ENV=production node index.js",
          "dev": "cross-env NODE_ENV=development nodemon index.js",
          // ...
          "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
        },
        // ...
      }
      ```

   1.3 Changes to the module that defines the application's configuration
`utils/config.js`

     ```js
     const MONGODB_URI = process.env.NODE_ENV === 'test' 
       ? process.env.TEST_MONGODB_URI
       : process.env.MONGODB_URI
     ```

   1.4. Add separate variables for the database addresses of the development and test databases in `.env` file

2. Install supertest `npm install --save-dev supertest`

3. Initialize the database before every test with the beforeEach function

    3.1 Create `test/test_helper.js` with a list of the initial Blog list

    3.2 Create `test/bloglist_api.test.js` file with the `beforeEach()` function in order to populate the database with the initial data.

    ```js
    const mongoose = require('mongoose')
    const supertest = require('supertest')

    const helper = require('./test_helper')

    const app = require('../app')
    const api = supertest(app)

    const Blog = require('../models/blog')

    beforeEach(async () => {
      await Blog.deleteMany({})

      const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    })

    // Tests go in this part [...]

    afterAll(() => {
      mongoose.connection.close()
    })
  
    ```
4. Write test for this exercise in  `test/bloglist_api.test.js` file

    ```js
    test('Ex 4.8: All blogs are returned as json', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    ```

5. Run test with command `npm test -- tests/bloglist_api.test.js`

6. Change logger so that it does not print to console in test mode

    ```js
    const info = (...params) => {
      if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
      }
    }

    const error = (...params) => {
      if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
      }
    }
  
    module.exports = {
      info, error
    }
    ```

7. Refactor the route handler to use the async/await syntax instead of promises

    ```js
      blogsRouter.get('/', async (request, response) => {
        const blogs = await Blog.find({})
        response.json(blogs)
      })
    ```
8. Test again `npm test -- tests/bloglist_api.test.js` and see if everything works fine

## Exercise 4.9*: Blog list tests, step 2

1. Add a new test to `tests/bloglist_api.test.js`:
    ```js
    test('Ex 4.9: The unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
    ```
2. Add toJSON method in `models/blog.js`
    ```js
    blogSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    })
    ```

## Exercise 4.10: Blog list tests, step 3
1. Add new test to `tests/bloglist_api.test.js` an run it:
    ```js 
    test('Ex 4.10: A new blog can be added and is saved correctly to the database', async () => {
      const newBlog =  {
        title: 'My new title',
        author: 'New blog\'s author',
        url: 'https://newblogfakeurl.com/'
      }
      //Add new
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201) //Created
        .expect('Content-Type', /application\/json/)

      //Recover entries and check lenght has increased
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      //see if the new one is amongst them
      const titles = response.body.map(b => b.title)
      expect(titles).toContain(
        'My new title'
      )
    })
    ```

2. Refactor route in `controllers/blogs.js`:
    ```js
    blogsRouter.post('/', async (request, response) => {
      const blog = new Blog(request.body)
      const result = await blog.save()

      response.status(201).json(result)
    })
    ```

3. Run tests again

## Exercise 4.11*: Blog list tests, step 4

1. Write the test that checks that if the likes property is missing from the request, it will default to the value 0
    ```js
    test('Ex 4.11: A bog with no likes takes 0 value as default', async () => {
      const newBlog =  {
        title: 'My blog at 4.11',
        author: 'New blog\'s author',
        url: 'https://newblogfakeurl.com/'
      }
      //Add new
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201) //Created
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })
    ```

2. Redefine blogSchema in `models/blog.js`:

    ```js
    const blogSchema = new mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes:  { type: Number, default: 0 }
    })
    ```

## Exercise 4.12*: Blog list tests, step 5

1. At this point if an error occurs there's no response, so it is neccesary to add error handling. In file `controllers/blogs.js` modify the route with try-catch:
    ```js
    blogsRouter.post('/', async (request, response,next) => {
      try{
        const blog = new Blog(request.body)
        const result = await blog.save()

        response.status(201).json(result)
      } catch (error){
        next(error)
      }
    })
    ```
    Or as an alternative, install https://github.com/davidbanham/express-async-errors with `npm install express-async-errors` and in `app.js` add the following line:

    ```js
      require('express-async-errors')
    ```
    in order to pass the error handling to the middleware.

2. Add errorHandler in file `utils/middleware.js`. (Unknown endpoint is not yet asked): 
    ```js
      const logger = require('./logger')

      const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
      }

      const errorHandler = (error, request, response, next) => {
        logger.error(error.message)

        if (error.name === 'CastError') {
          return response.status(400).send({ error: 'malformatted id' })
        } else if (error.name === 'ValidationError') {
          return response.status(400).json({ error: error.message }) 
        }

        next(error)
      }

      module.exports = {
        unknownEndpoint,
        errorHandler
      }
      ```
3. In file `app.js` add the following:
    ```js
    const middleware = require('./utils/middleware')
    //...
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)
    ```
4. Write test in `tests/bloglist_api.test.js`
    ```js
    test('Ex 4.12: A blog with no title or no url returns status code 400 Bad Request', async () => {

      const newBlogNoTitle =  {
        author: 'Author of the blog at 4.12 with no title',
        url: 'https://newblogfakeurl.com/'
      }
      const newBlogNoUrl =  {
        title: 'My blog at 4.12 with no url'
      }

      //Add new with no title
      await api
        .post('/api/blogs')
        .send(newBlogNoTitle)
        .expect(400) //Bad Request
      //Add new with no url
      await api
        .post('/api/blogs')
        .send(newBlogNoUrl)
        .expect(400) //Bad Request
    })
    ```


## Exercise 4.13: Blog list expansions, step 1
Implement functionality for deleting a single blog post resource.

1. In `controllers/blogs.js` add new route:

    ```js
    blogsRouter.delete('/:id', async(request, response) => {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end() // If it doesn't exist the result is the same (blog deleted)
    })
    ```
2. Write function helpers in `tests/test_helper.js`:
    ```js
    const nonExistingId = async () => {
      const blog = new Blog({ title: 'willremovethissoon', url: 'nonexistingurl' })
      await blog.save()
      await blog.remove()

      return blog._id.toString()
    }

    const blogsInDb = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }
    ```
3. Write test section in `tests/bloglist_api.test.js`:
    ```js    
    describe('Deletion of a blog',() => {

      test('Ex 4.13a: Deletion of an existing blog, succeeds with status code 204', 
        async() => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]
          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

          const blogsAtEnd = await helper.blogsInDb()
          expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
      })

      test('Ex 4.13b: Deletion of a non existing blog, also succeeds with status code 204, but no deletion occurred', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const deletedId = await helper.nonExistingId()
        await api
          .delete(`/api/blogs/${deletedId}`)
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      })

    })
    ```
## Exercise 4.14: Blog list expansions, step 2
Implement functionality for updating the information of an individual blog post.

1. In `controllers/blogs.js` add new route: On update operation validation is not enabled by default, must include `runValidators: true` option.
    ```js
    blogsRouter.put('/:id', async(request, response) => {
      const blog = new Blog(request.body)
      const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })

      response.status(201).json(result)
    })
    ```
2. Write test section in `tests/bloglist_api.test.js`:
    ```js
    describe('Updating a blog',() => {

      test('Ex 4.14a: Updating an existing blog well formatted, succeeds with status code 201',async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = {
          title:  'My updated title',
          author: blogsAtStart[0].author,
          likes: blogsAtStart[0].likes + 1,
          url: blogsAtStart[0].url
        }
        await api
          .put(`/api/blogs/${blogsAtStart[0].id}`)
          .send(blogToUpdate)
          .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain(
          'My updated title'
        )
      })

      test('Ex 4.14b: Updating a non existing blog returns status code 404',async() => {
        const nonExistingId = await helper.nonExistingId()
        const blogToUpdate =  {
          title: 'My blog at 4.14',
          author: 'New blog\'s author',
          url: 'https://newblogfakeurl.com/'
        }
        await api
          .put(`/api/blogs/${nonExistingId}`)
          .send(blogToUpdate)
          .expect(404)

      })

      test('Ex 4.14c: Updating an existing blog not well formatted, must not succed: status 400',async() => {
        const blogsAtStart = await helper.blogsInDb()

        const newBlogNoTitle =  {
          author: 'Author of the blog at 4.14 with no title',
          url: 'https://newblogfakeurl.com/'
        }
        await api
          .put(`/api/blogs/${blogsAtStart[0].id}`)
          .send(newBlogNoTitle)
          .expect(400)

      })

    })
    ```
##  Exercise 4.15: Blog list expansions, step 3
Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have username, password and name.
1. Create a Mongoose schema in the `models/user.js` file:
    ```js
    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
      username: String,
      name: String,
      passwordHash: String
    })

    userSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
      }
    })

    const User = mongoose.model('User', userSchema)

    module.exports = User
    ```
2. Implement a route for creating new users

     2.1 Install bcrypt package (or bcryptjs if problems found on windows)
     ```bash
     npm install bcrypt
     ``` 
    2.2  Define a separate router for dealing with users in a new `controllers/users.js` file.
    ```js
    const bcrypt = require('bcrypt')
    const usersRouter = require('express').Router()
    const User = require('../models/user')

    usersRouter.post('/', async (request, response) => {
      const body = request.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    })

    module.exports = usersRouter
    ```
    2.3 Take the router into use in the `app.js` file, so that it handles requests made to the /api/users url
    ```js
    const usersRouter = require('./controllers/users')
    // ...
    app.use('/api/users', usersRouter)
    ```
3. Write test:
    
    3.1 Add new test area to `tsts/bloglist_api.test.js`:
    ```js
    const bcrypt = require('bcrypt')
    const User = require('../models/user')

    //...

    describe('when there is initially one user in db', () => {
      beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
      })

      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'greenvan',
          name: 'ROCIO CARRILLO',
          password: 'mypass',
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
      })
    })
    ```
    3.2 Implement `usersInDb()` function in `tests/test_helper.js`:
    ```js
    const User = require('../models/user')

    // ...

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(u => u.toJSON())
    }
    ```

4. Add an initial route handler that returns all of the users in the database:

    ```js
    usersRouter.get('/', async (request, response) => {
      const users = await User.find({})
      response.json(users)
    })
    ```

##  Exercise 4.16*: Blog list expansions, step 4
    
Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.

1. Username validation: required and must be at least 3 characters long.
```js
   const userSchema = new mongoose.Schema({
      username: {
        type:String,
        minlength: [3, 'Username \'{VALUE}\' is too short. Username must have minimum lenght of 3 characters'],
        required: true
      },
      name: String,
      passwordHash: String
    })
```
2. Username: Add uniqueness validation

    2.1 Write the new test first although it will not yet pass:
    ```js
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'mypass',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    ```
    2.2 Install mongoose-unique-validator npm package: `npm install mongoose-unique-validator`
    2.3 Change the schema:
    ```js
    const uniqueValidator = require('mongoose-unique-validator')
    //[...]
    const userSchema = new mongoose.Schema({
      username: {
        type:String,
        minlength: [3, 'Username \'{VALUE}\' is too short. Username must have minimum lenght of 3 characters'],
        required: true,
        unique: true
      },
      name: String,
      passwordHash: String
    })
    //[...]
    userSchema.plugin(uniqueValidator)
    ```

3. Optional username validation: Add validator for permitted characters.
   
   This extra rules had been taken into account:
   
   * Allowed characters: alphanumeric and underscore
   * Username must start and end with alphanumeric
   * Each underscore must be between two alphanumeric characters. No more than one underscore in a row

    The regular expression that fulfills all the above is the following:
    
    `^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*$`

    Added the following option to the username at user Mongoose schema:
   
    ```js
    match: [/^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*$/, 'Username must contain only alphanumeric characters or underscore, but no at the beggining or end']
    ```
    Added some extra parameters in order to trim extra spaces at the beginning or end and keep only lowercase characters in database. So the Mongoose schema is at this point:

    ```js
    const userSchema = new mongoose.Schema({
      username: {
        type:String,
        minlength: 
        [
          3,
          'Username \'{VALUE}\' is too short. Username must have minimum lenght of 3 characters'
        ],
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
          /^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*$/,
          'Username must contain only alphanumeric characters or underscore, but no at the beggining or end'
        ]
      },
      name: String,
      passwordHash: String
    })
    ```

    
4. Password validation: Add the following to the route to add a new user in the controller at `controllers/users.js` file:

    ```js
    if (!body.password || body.password['length'] < 3) {
      //!body.password --> If no password provided
      response
        .status(400)
        .json({ error: 'Password must have minimum lenght of 3 characters' })
    }
    ```
    That`s the usersRouter.post() function stays at the moment: 

    ```js
    usersRouter.post('/', async (request, response) => {
      const body = request.body

      if (!body.password || body.password['length'] < 3) {
        response
          .status(400)
          .json({ error: 'Password must have minimum lenght of 3 characters' })
      } else {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
          username: body.username,
          name: body.name,
          passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
      }
    })
    ```

Write tests:

```js

  test('4.16a creation fails with no username provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'mypass',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('4.16b creation fails with username of 2 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hu',
      name: 'Superuser',
      password: 'mypass',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must have minimum lenght of 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})
test('4.16d creation fails with password of 2 characters', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'user2pass',
    name: 'Superuser',
    password: 'my',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('Password must have minimum lenght of 3 characters')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('4.16e creation fails with no password', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'usernopass',
    name: 'Superuser'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('Password must have minimum lenght of 3 characters')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('4.16f creation fails with forbidden characters of username', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'username with spaces',
    name: 'Superuser',
    password: 'mypass',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('Username must contain only alphanumeric')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
```

## Exercise 4.17: Blog list expansions, step 5
Expand blogs so that each blog contains information on the creator of the blog. Modify listing all blogs so that the creator's user information is displayed with the blog, and listing all users also displays the blogs created by each user.

1. Store the ids of the blogs added by the user in an array of Mongo ids at the user document in `models/user.js` file by adding this field:
    ```js 
      blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ],
    ```
2. Expand the schema of the blog in order to contain information about the user who added it.
    ```js
    const blogSchema = new mongoose.Schema({
      title:  { type: String, required: true, },
      author: String,
      url:  { type: String, required: true, },
      likes:  { type: Number, default: 0 },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    })
    ```
3. Update th code for creating a new Blog in `controllers/blogs.js`
    ```js
    const User = require('../models/user')
    //[...]
    blogsRouter.post('/', async (request, response) => {

      const user = await User.findById(request.body.userId) //Search user

      const blog = new Blog({
        title: request.body.title,
        author:  request.body.author,
        url: request.body.url,
        likes:  request.body.likes,
        user: user._id //Add user id
      })

      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id) //Add blog to user's blog list
      await user.save()

      response.status(201).json(savedBlog)
    })
    ```
4. Test by REST client in VSCode:
    ```json
    POST http://localhost:3003/api/blogs
    Content-Type: application/json

    {
      "title": "My saved blog",
      "author": "Green Van",
      "url": "url del blog",
      "likes": 7,
      "userId": "60db14dca06c694a9871f806"
    }
    ```
5. Populate
    
    5.1 Modify listing all blogs so that the creator's user information is displayed with the blog. In `controllers/blogs.js` file:
    ```js
    blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      response.json(blogs)
    })
    ```
    5.2 Modify listing all users so that it displays the blogs created by each user. In `controllers/users.js` file:
    ```js
    usersRouter.get('/', async (request, response) => {
      const users = await User.find({}).populate('blogs', { url: 1, title: 1, author:1 })
      response.json(users)
    })
    ```

## Exercise 4.18: Blog list expansions, step 6
Implement token-based authentication.
1. Install the jsonwebtoken library, which allows us to generate JSON web tokens: 
`npm install jsonwebtoken`
2. Add `controllers/login.js` file, with the content provided in the lesson for notes app.
    ```js
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const loginRouter = require('express').Router()
    const User = require('../models/user')

    loginRouter.post('/', async (request, response) => {
      const body = request.body

      const user = await User.findOne({ username: body.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      response
        .status(200)
        .send({ token, username: user.username, name: user.name })
    })

    module.exports = loginRouter
    ```
3. Add the environment variable SECRET to the `.env` file.
4. Add the login Router to `app.js`:
    ```js
    const loginRouter = require('./controllers/login')
    //[...]
    app.use('/api/login', loginRouter)
    ```
5. Try logging using REST client in VSCode:
    ```json
    POST http://localhost:3003/api/login
    Content-Type: application/json

    {
        "username": "greenvan",
        "password": "mypassword"
    }
    ```
## Exercise 4.19: Blog list expansions, step 7
Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.

1. Add token validation to new blog route at `controllers/blogs.js` file:
    ```js
    const jwt = require('jsonwebtoken')

    // ...
    const getTokenFrom = request => {
      const authorization = request.get('authorization')
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
      }
      return null
    }

    blogsRouter.post('/', async (request, response) => {

      const token = getTokenFrom(request)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id) //Search user

      const blog = new Blog({
        title: request.body.title,
        author:  request.body.author,
        url: request.body.url,
        likes:  request.body.likes,
        user: user._id //Add user id
      })

      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id) //Add blog to user's blog list
      await user.save()

      response.status(201).json(savedBlog)
    })
    ```
2. Use VSCode REST client to test:
    2.1 Use login.rest to get a valid token
    2.2 Use the returned token in a post request
    ```json
    POST http://localhost:3003/api/blogs/
    Content-Type: application/json
    Authorization: bearer eyJhbGciOiJIUzI1...bE2KRKA

    {
      "title": "My saved blog",
      "author": "Green Van",
      "url": "url del blog",
      "likes": 7
    }
    ```
3. Add error handling to our errorHandler middleware:
    ```js
     else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
     }
    ```