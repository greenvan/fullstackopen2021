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

## Exercise 5.3 Bloglist frontend, step3
Expand your application to allow a logged-in user to add new blogs

1. Add `setToken` and `create` to `services\blogs.js`:

  ```js
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  ```

2. Set token at `handleLogin()` in `App.js`:

  ```js
  blogService.setToken(user.token)
  ```
3. Create `components/NewBlogForm.js` with the new component.
  ```js
  import React from 'react'
  
  const NewBlogForm = ({ onSubmitHandler, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => (
    <div><h2>Create new</h2>
      <form onSubmit={onSubmitHandler}>
        <ul>
          <li>
            <label htmlFor="title">Title:</label>

            <input
              value={title}
              onChange={handleTitleChange}
            />
          </li>
          <li>
            <label htmlFor="author">Author:</label>
            <input
              value={author}
              onChange={handleAuthorChange}
            />
          </li>
          <li>
            <label htmlFor="url">url:</label>
            <input
              value={url}
              onChange={handleUrlChange}
            />
          </li>
          <li className="button">
            <button type="submit">Create</button>
          </li>
        </ul>
      </form>
    </div>
  )

  export default NewBlogForm
  ```

4. Add Field component to `App.js` under the return statement.
  ```html
        <NewBlogForm
        onSubmitHandler={addBlog}
        title={newBlogTitle}
        handleTitleChange={handleTitleChange}
        author={newBlogAuthor}
        handleAuthorChange={handleAuthorChange}
        url={newBlogUrl}
        handleUrlChange={handleUrlChange}
      />
  ```
5. Added state for input fields and handlers in `App.js`:
  ```js
  [...]
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  [...]
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      })
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
  ```

6. Added some css styles in `index.css` in order to make the forms more attractive.


At this point the app does add a new Blog if no validation error occurs. User is not informed about successful and unsuccessful operations.

## 5.4 bloglist frontend, step4
Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. 

1. In `App.js`, instead of "errorMessage" we will use "notification" for a more general purpose. It will contain the message and the type of notification (error or notification)
  ```js
  const [notification, setNotification] = useState(null)
  ```
2. Created notifyWith method in `App.js`
  ```js
  const notifyWith = (message, type = 'notification') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  ```
3. In `handleLogin` and `addBlog` methods we add a try catch block to capture error and display it:
  ```js
  catch (error) {
    notifyWith(`Error: ${error.response.data.error}`, 'error')
  }
  ```
4. In `addBlog` we add also a notification after the blog is created. Await syntax has replace the .then() syntax used before.
  ```js
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
  ```
5. Also in `App.js`: `Notification` component has been added after the `Header` under the return clause in both cases: when user is logged in and when is not.
  ```xml
    <Notification notification={notification}/>
  ```
6. `components/Notification.js` has been changed in order to support error and notification cases:
  ```js
  const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }

    return (
      <div className={notification.type}>
        {notification.message}
      </div>
    )
  }
  export default Notification
  ```
7. CSS styles have been added to `index.css`:
  ```css
    .error {
    color: red;
    background: lightgrey;
    width: 500px;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
    
  .notification {
    color: green;
    background: lightgrey;
    width: 500px;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  ```

  
## Exercise 5.5 Bloglist frontend, step5
Change the form for creating blog posts so that it is only displayed when appropriate. 
- By default the form is not visible.
- The form closes when a new blog is created.


1. Create `Toggable.js` as shown in the [course material](https://fullstackopen.com/en/part5/props_children_and_proptypes#displaying-the-login-form-only-when-appropriate).
2. Wrap the new blog form component inside the Togglable component.
  ```xml 
      <Togglable buttonLabel="Create new blog">
        <NewBlogForm
          onSubmitHandler={addBlog}
          title={newBlogTitle}
          handleTitleChange={handleTitleChange}
          author={newBlogAuthor}
          handleAuthorChange={handleAuthorChange}
          url={newBlogUrl}
          handleUrlChange={handleUrlChange}
        />
      </Togglable>
  ```
3. Create reference to newBlogForm:
  ```js
  import React, { useState, useEffect, useRef } from 'react'

  const App = () => {
  // ...
  const newBlogFormRef = useRef()
  //...
    <Togglable buttonLabel="Create new blog" ref={newBlogFormRef}>
    //...
    </Togglable>
  )
  ```

4. Change the Togglable component as shown in the course material:

  ```js
  import React, { useState, useImperativeHandle } from 'react'

  const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility
      }
    })

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  })

  export default Togglable
  ```

5. Hide the form by calling newBlogFormRef.current.toggleVisibility() after a new blog is created.
  ```js
    newBlogFormRef.current.toggleVisibility()
  ```

## Exercise 5.6 Bloglist frontend, step6
Separate the form for creating a new blog into its own component, and move all the states required for creating a new blog to this component.
The component must work like the NoteForm component from the [material](https://fullstackopen.com/en/part5/props_children_and_proptypes) of this part.
1. Modify `NewBlogForm.js` to include all this state part:
```js 
const NewBlogForm = ({
  createNewBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  ```

  2. Simplify at App.js:
  ```js
    const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`Added new blog: "${returnedBlog.title}" (by ${returnedBlog.author})`, 'notification')
    } catch (error) {
      notifyWith(`Unable to create new Blog. Error: ${error.response.data.error}`, 'error')
    }
    newBlogFormRef.current.toggleVisibility()
  }

  //...
  
        <NewBlogForm createNewBlog={addBlog} />
  ```