import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    author: 'Author',
    title: 'Title',
    url: 'Url',
    likes: 0,
    user: {
      name: 'User'
    }
  }

  const testUser = {
    username: 'User'
  }

  test('blog renders the blog title and author, but does not render its url or number of likes by default.', () => {

    render(<Blog blog={blog} user={testUser} />)

    const title = screen.getByText('Title', { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Author', { exact: false })
    expect(author).toBeDefined()

    const url = screen.queryByText('Url', { exact: false })
    expect(url).toBeNull()

    const likes = screen.queryByText('0', { exact: false })
    expect(likes).toBeNull()

  })

  test('blog url and number of likes are shown when the button controlling the shown details has been clicked', async () => {

    render(<Blog blog={blog} user={testUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const title = screen.getByText('Title', { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Author', { exact: false })
    expect(author).toBeDefined()

    const url = screen.getByText('Url', { exact: false })
    expect(url).toBeDefined()

    const likes = screen.getByText('0', { exact: false })
    expect(likes).toBeDefined()

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const likePost = jest.fn()
    render(<Blog blog={blog} user={testUser} handleBlogLike={likePost} />)

    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    let likes = screen.getByText('0', { exact: false })
    expect(likes).toBeDefined()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likePost.mock.calls).toHaveLength(2)
  })
})



