import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let component
  const mockHandleUpdate = jest.fn()
  const mockHandleDelete = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Title of my test blog - 1',
      author: 'Author of my test blog - 1',
      url: 'Url of my test blog - 1',
      likes: 5
    }
    component = render(
      <Blog blog={blog} updateBlog={mockHandleUpdate} deleteBlog={mockHandleDelete}/>
    )
  })

  test('5.13 renders title and author, but no url or likes by default', () => {

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
    expect(div).not.toHaveTextContent(
      'Like count'
    )
  })

  test('5.14 clicking the button shows url and likes', () => {

    const showButton = component.getByText('Show details \u2193')
    fireEvent.click(showButton)

    component.debug()

    const hideButton = component.getByText('Hide \u2191')
    expect(hideButton).toBeDefined()

    const div = component.container.querySelector('.blogDetails')
    expect(div).toBeDefined()

    expect(div).toHaveTextContent(
      'Url of my test blog - 1'
    )
    expect(div).toHaveTextContent(
      'Like count'
    )
  })


  test('5.15 Clicking like button twice calls twice the event handler', () => {

    const showButton = component.getByText('Show details \u2193')
    fireEvent.click(showButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleUpdate.mock.calls).toHaveLength(2)
  })
})