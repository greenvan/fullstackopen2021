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



afterAll(() => {
  mongoose.connection.close()
})