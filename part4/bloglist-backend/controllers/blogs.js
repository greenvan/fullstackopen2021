const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// add new blog
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