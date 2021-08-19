import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

import loginService from './services/login'

import Footer from './components/Footer'
import Header from './components/Header'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Header />
        <Notification message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          onChangeUsernameHandler={({ target }) => setUsername(target.value)}
          onChangePasswordHandler={({ target }) => setPassword(target.value)}/>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div>User {user.name} logged in. <button onClick={handleLogout}>Log out</button></div>
      <BlogList blogs={blogs}/>
      <Footer/>
    </div>
  )
}

export default App
