const mongoose = require('mongoose')
const supertest = require('supertest')


const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require ('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('With initial values', () => {
  test('Ex 4.8: All blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Ex 4.9: The unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Addition of a new blog', () => {

  let token = ''

  beforeAll(async () => {
    await User.deleteMany({})
    //Create new user to add blogs
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('Ex 4.10: A new blog can be added and is saved correctly to the database', async () => {
    const newBlog =  {
      title: 'My new title',
      author: 'New blog\'s author',
      url: 'https://newblogfakeurl.com/'
    }

    //Add new
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

  test('Ex 4.11: A blog with no likes takes 0 value as default', async () => {
    const newBlog =  {
      title: 'My blog at 4.11',
      author: 'New blog\'s author',
      url: 'https://newblogfakeurl.com/'
    }
    //Add new
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201) //Created
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoTitle)
      .expect(400) //Bad Request
    //Add new with no url
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoUrl)
      .expect(400) //Bad Request

  })

  test('Ex 4.23a: A new blog cannot be added if no proper token provided', async () => {
    const newBlog =  {
      title: 'My new title',
      author: 'New blog\'s author',
      url: 'https://newblogfakeurl.com/'
    }

    //Add new
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401) //Unauthorized

  })
})

describe('Deletion of a blog',() => {

  let token = ''
  let token2 = ''
  let blogToDelete = ''

  beforeEach(async () => {
    await User.deleteMany({})
    //Create new user to add blogs and then delete
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
    const user2 = new User({ username: 'second', passwordHash })
    await user2.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const user2ForToken = {
      username: user2.username,
      id: user2._id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)
    token2 = jwt.sign(user2ForToken, process.env.SECRET)

    //Create new blog by user root:
    blogToDelete = new Blog({
      title:  'My title to delete',
      author: 'my author',
      url: 'my url',
      user: user._id
    })
    await blogToDelete.save()



  })

  test('Ex 4.13a: Deletion of an existing blog, succeeds with status code 204', async() => {

    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('Ex 4.13b: Deletion of a non existing blog, also succeeds with status code 204, but no deletion occurred',async() => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${deletedId}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('Ex 4.23b: Deletion of an existing blog with no proper token returns 401 unauthorized', async() => {

    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer 0d0_faketoken_0d0')
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('Ex 4.23c: Deletion of an existing blog with proper token but from other user returns 403 Forbidden', async() => {

    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

})

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


afterAll(() => {
  mongoose.connection.close()
})