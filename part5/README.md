# Part 5: Testing React apps
**Full Stack Course at th University of Helsinky (2021)**

This is a compilation of the exercises of Part 5.



## Exercise 5.1: Blog list frontend , step1
1. Clone the application from Github with the command: 

    ```bash 
    git clone https://github.com/fullstack-hy/bloglist-frontend
    ``` 

2. Remove the git configuration of the cloned application (dir .git)
3. Install dependencies: `npm install`
4. Start application: `npm start`

5. Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user. If a user is not logged-in, only the login form is visible. If user is logged-in, the name of the user and a list of blogs is shown. User details of the logged-in user do not have to be saved to the local storage yet.

  5.1 Add some components in order to do the page prettier: `components/Footer.js`, `components/Header.js` and `index.css`.
  5.2 Add `components/Notification.js` in order to show errors and other notifications in the future.
  5.3 Add `services/login.js` as suggested:
    ```js
    import axios from 'axios'
    const baseUrl = '/api/login'

    const login = async credentials => {
      const response = await axios.post(baseUrl, credentials)
      return response.data
    }

    const loginService = { login }
    export default loginService
    ``` 
  5.4 Modify `App.js`:
    - state handling of username, password and user.
    - handleLogin function
    - Conditional return


```js
    
const App = () => {
  const [blogs, setBlogs] = useState([])

  
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
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


  if (user === null) {
    return (
      <div>
      <Header />      
      <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          Username <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Footer/>
    </div>
  )
}
```

## Exercise 5.2: Blog list frontend , step2
Make the login 'permanent' by using the local storage and implement a way to log out.

In the `handlelogin` function we store in the value `loggedBlogappUser` in local storage :
```js
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
```

The application checks if user details of a logged-in user can already be found on the local storage using an effect hook:
```js
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
```

Created the `handlelogout` function:
```js
  const handleLogout =  (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
```

Added this line before bloglist to show user and the logout button:
```html
 <div>User {user.name} logged in. <button onClick={handleLogout}>Log out</button></div>

```

At this point, some refactoring has been done: 
1. Created BlogList Component
2. Created LoginForm Component

The `return` statement in `App.js` :

```js
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
```
