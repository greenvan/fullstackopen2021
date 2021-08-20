import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

import loginService from './services/login'

import Footer from './components/Footer'
import Header from './components/Header'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notifyWith(`Error: ${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      notifyWith(`Added new blog: "${returnedBlog.title}" (by ${returnedBlog.author})`, 'notification')
    } catch (error) {
      notifyWith(`Unable to create new Blog. Error: ${error.response.data.error}`, 'error')
    }
  }

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  if (user === null) {
    return (
      <div>
        <Header />
        <Notification notification={notification}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUserChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}/>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div>User {user.name} logged in. <button onClick={handleLogout}>Log out</button></div>
      <Notification notification={notification}/>
      <NewBlogForm
        onSubmitHandler={addBlog}
        title={newBlogTitle}
        handleTitleChange={handleTitleChange}
        author={newBlogAuthor}
        handleAuthorChange={handleAuthorChange}
        url={newBlogUrl}
        handleUrlChange={handleUrlChange}
      />
      <BlogList blogs={blogs}/>
      <Footer/>
    </div>
  )
}

export default App
