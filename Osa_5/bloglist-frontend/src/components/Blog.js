import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, handleBlogRemoval, handleBlogLike, user }) => {
  const [showAll, setShowAll] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowAll(!showAll)
  }

  const addLike = async () => {
    handleBlogLike(blog)
    //setLikes(blog.likes)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      handleBlogRemoval(blog)
    }
  }

  const removeButton = () => (
    <button onClick={removeBlog}>remove</button>
  )

  const details = () => (
    <div className='details'>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={addLike}>like</button></div>
      <div>{blog.user.name || user.username}</div>
      {user !== null && user.username === blog.user.username && removeButton()}
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{showAll? 'hide' : 'show'}</button>
        {showAll && details()}
      </div>
    </div>

  )
}

export default Blog