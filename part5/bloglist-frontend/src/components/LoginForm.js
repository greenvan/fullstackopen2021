/* eslint-disable react/prop-types */
import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUserChange, handlePasswordChange }) => (
  <div>
    <h2>Log in to application</h2>
    <form className='login' onSubmit={handleLogin}>
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

export default LoginForm
