/* eslint-disable react/prop-types */

import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async (event) => {
    blog.likes++
    updateBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
    &quot;{blog.title}&quot;

        <button onClick={() => setBlogVisible(!blogVisible)}>
          { blogVisible ? 'Hide \u2191' : 'Show details \u2193' }
        </button>

        <div style={showWhenVisible}>
          Author: {blog.author} <br />
          Url: <a href={blog.url}>{blog.url}</a> <br/>
          Like count: {blog.likes}  <br/>
          <button onClick={increaseLikes}>Like &#128077; </button>
        </div>
      </div>
    </div>
  )
}

const BlogList = ({ blogs, updateBlog }) => (
  <div>
    <h2>Blog list</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
    )}
  </div>
)

export default BlogList
