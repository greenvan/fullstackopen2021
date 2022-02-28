import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => (
  <div>
    <h2>Blog list</h2>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDeleteButton={(blog.user && user === blog.user.username)}/>
    )}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired // Maybe it is not necessary
}

export default BlogList
