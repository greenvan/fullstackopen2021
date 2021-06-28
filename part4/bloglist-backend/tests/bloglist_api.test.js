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

  test('Ex 4.11: A blog with no likes takes 0 value as default', async () => {
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
})

describe('Deletion of a blog',() => {

  test('Ex 4.13a: Deletion of an existing blog, succeeds with status code 204',async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('Ex 4.13b: Deletion of a non existing blog, also succeeds with status code 204, but no deletion occurred',async() => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${deletedId}`)
      .expect(204)

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