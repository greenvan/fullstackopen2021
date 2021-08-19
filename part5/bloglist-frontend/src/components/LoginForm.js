/* eslint-disable react/prop-types */
import React from 'react'

const LoginForm = ({ handleLogin, username, password, onChangeUsernameHandler, onChangePasswordHandler }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
          Username <input
          type="text"
          value={username}
          name="Username"
          onChange={onChangeUsernameHandler}
        />
      </div>
      <div>
          Password <input
          type="password"
          value={password}
          name="Password"
          onChange={onChangePasswordHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
