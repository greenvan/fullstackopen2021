/* eslint-disable react/prop-types */

import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, showDeleteButton }) => {
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
    &quot;{blog.title}&quot; - {blog.author}

        <button onClick={() => setBlogVisible(!blogVisible)}>
          { blogVisible ? 'Hide \u2191' : 'Show details \u2193' }
        </button>

        <div style={showWhenVisible}>
          <a href={blog.url}>{blog.url}</a> <br/>
          Like count: {blog.likes}  <button onClick={increaseLikes}>Like &#128077; </button><br/>
          {(blog.user) && <div>Added by: {blog.user.name} </div>}
          {showDeleteButton && <button id={blog.id} name={'"' + (blog.title) + '"' + ' (by ' + (blog.author) + ')'} onClick={deleteBlog}>Remove &#128465; </button>}
        </div>
      </div>
    </div>
  )
}

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => (
  <div>
    <h2>Blog list</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDeleteButton={(blog.user && user === blog.user.username)}/>
    )}
  </div>
)

export default BlogList
