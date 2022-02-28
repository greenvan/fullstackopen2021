import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
  return (
    <div><h2>Create new Blog</h2>
      <form onSubmit={addBlog} id='newBlogForm'>
        <ul>
          <li>
            <label htmlFor="title">Title:</label>

            <input
              id='title'
              value={title}
              onChange={handleTitleChange}
            />
          </li>
          <li>
            <label htmlFor="author">Author:</label>
            <input
              id='author'
              value={author}
              onChange={handleAuthorChange}
            />
          </li>
          <li>
            <label htmlFor="url">url:</label>
            <input
              id='url'
              value={url}
              onChange={handleUrlChange}
            />
          </li>
          <li className="button">
            <button id='btnNewBlog' type="submit">Create</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
