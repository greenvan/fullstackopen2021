import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Title of my test blog - 1',
    author: 'Author of my test blog - 1',
    url: 'Url of my test blog - 1',
    likes: 5
  }

  const mockHandleUpdate = jest.fn()
  const mockHandleDelete = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandleUpdate} deleteBlog={mockHandleDelete}/>
  )

  component.debug()
  // method 1
  expect(component.container).toHaveTextContent(
    'Title of my test blog - 1'
  )

  // method 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Author of my test blog - 1'
  )

  expect(div).not.toHaveTextContent(
    'Url of my test blog - 1'
  )
})