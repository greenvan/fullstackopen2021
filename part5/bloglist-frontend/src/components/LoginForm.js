/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const login = async (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form className='login' onSubmit={login}>
        <ul>
          <li>
            <label htmlFor="username">Username: </label>
            <input className='login'
              type="text"
              value={username}
              name="Username"
              onChange={handleUserChange}
            />
          </li>
          <li>
            <label htmlFor="password">Password: </label>
            <input className='login'
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </li>
          <li className="button">
            <button type="submit">login</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default LoginForm
