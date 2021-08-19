/* eslint-disable react/prop-types */
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
