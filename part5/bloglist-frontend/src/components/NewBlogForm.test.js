import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'



test('5.16 New blog created with right details', () => {

  const createNewBlog = jest.fn()

  const component = render(<NewBlogForm createNewBlog={createNewBlog} />)

  component.debug()

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#newBlogForm')

  fireEvent.change(title, {
    target: { value: 'Title of my test blog - 2' },
  })
  fireEvent.change(author, {
    target: { value: 'Author of my test blog - 2' },
  })
  fireEvent.change(url, {
    target: { value: 'Url of my test blog - 2' },
  })
  fireEvent.submit(form)

  // The form calls the event handler it received as props once
  expect(createNewBlog.mock.calls).toHaveLength(1)

  // Right details
  expect(createNewBlog.mock.calls[0][0].title).toBe('Title of my test blog - 2')
  expect(createNewBlog.mock.calls[0][0].author).toBe('Author of my test blog - 2')
  expect(createNewBlog.mock.calls[0][0].url).toBe('Url of my test blog - 2')
})

