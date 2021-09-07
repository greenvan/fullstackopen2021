import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

import loginService from './services/login'

import Footer from './components/Footer'
import Header from './components/Header'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const sortingByLikes = (a, b) => (b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortingByLikes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const notifyWith = (message, type = 'notification') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      notifyWith(`Error: ${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog).sort(sortingByLikes))
      notifyWith(`Added new blog: "${returnedBlog.title}" (by ${returnedBlog.author})`, 'notification')
    } catch (error) {
      notifyWith(`Unable to create new Blog. Error: ${error.response.data.error}`, 'error')
    }
    newBlogFormRef.current.toggleVisibility()
  }
  const updateBlog = async (blogObject) => {
    const blogToUpdate = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes
    }

    if (blogObject.user != null) blogToUpdate.user = blogObject.user.id
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogToUpdate)
      // Actualizar en el estado de la lista de Blogs el blog actualizado
      setBlogs(
        blogs
          .map(blog => blog.id === blogObject.id ? blogObject : blog)
          .sort(sortingByLikes)
      )
      console.log(`Updated: "${returnedBlog.title} (by ${returnedBlog.author})`)
    } catch (error) {
      notifyWith(`Unable to update Blog. Error: ${error.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (event) => {
    try {
      const id = event.target.id
      if (window.confirm(`Delete '${event.target.name}'?`)) {
        const response = await blogService.del(id)
        notifyWith('Blog has beed deleted', 'notification')
        console.log(response)

        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      notifyWith(`Unable to delete Blog. Error: ${error.response.data.error}`, 'error')
    }
  }

  if (user === null) { // TODO: or user token invalid
    return (
      <div>
        <Header />
        <Notification notification={notification}/>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div>User {user.name} logged in. <button onClick={handleLogout}>Log out</button></div>
      <Notification notification={notification}/>
      <Togglable buttonLabel="Create new blog" ref={newBlogFormRef}>
        <NewBlogForm createNewBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user.username}/>
      <Footer/>
    </div>
  )
}

export default App
