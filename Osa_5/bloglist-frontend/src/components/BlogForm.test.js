import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing title')
  await user.type(author, 'testing author')
  await user.type(url, 'testing url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})