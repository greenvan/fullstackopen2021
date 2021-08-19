/* eslint-disable react/prop-types */
import React from 'react'
const Blog = ({ blog }) => (
  <div>
    &quot;{blog.title}&quot; - {blog.author}
  </div>
)

export default Blog
