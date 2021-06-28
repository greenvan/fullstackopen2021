const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// add new blog
blogsRouter.post('/', async (request, response) => {

  const blog = new Blog(request.body)
  const result = await blog.save()

  response.status(201).json(result)
})

// delete a blog
blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end() // If it doesn't exist the result is the same (blog deleted)
})

// update a blog
blogsRouter.put('/:id', async(request, response) => {
  const blog = {
    title: request.body.title,
    author:  request.body.author,
    url: request.body.url,
    likes:  request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })

  if (result !== null)
    response.status(201).json(result)
  else
    response.status(404).end()
})
module.exports = blogsRouter