/* eslint-disable react/prop-types */

import React from 'react'
const Blog = ({ blog }) => (
  <div>
    &quot;{blog.title}&quot; - {blog.author}
  </div>
)

const BlogList = ({ blogs }) => (
  <div>
    <h2>Blog list</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogList
