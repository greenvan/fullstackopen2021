import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog,  update, del, showDeleteButton }) => {
  const increaseLikes = async () => {//const increaseLikes = async (event) => {
    blog.likes++
    update(blog)
  }
  return (
    <div className='blogDetails'>
      <a href={blog.url}>{blog.url}</a> <br/>
          Like count: {blog.likes}  <button onClick={increaseLikes}>Like &#128077; </button><br/>
      {(blog.user) && <div>Added by: {blog.user.name} </div>}
      {showDeleteButton && <button id={blog.id} name={'"' + (blog.title) + '"' + ' (by ' + (blog.author) + ')'} onClick={del}>Remove &#128465; </button>}
    </div>
  )
}



const Blog = ({ blog, updateBlog, deleteBlog, showDeleteButton }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
    &quot;{blog.title}&quot; - {blog.author}

        <button onClick={() => setBlogVisible(!blogVisible)}>
          { blogVisible ? 'Hide \u2191' : 'Show details \u2193' }
        </button>
        {blogVisible && <BlogDetails blog={blog} update={updateBlog} del={deleteBlog} showDeleteButton={showDeleteButton}/>}

      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired, // TODO: must have specific fields (build a model)
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}


export default Blog