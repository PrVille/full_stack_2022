import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, handleBlogRemoval, user }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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
    try {
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes += 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
      setLikes(updatedBlog.likes)
      console.log(updatedBlog)

    } catch (e) {
      console.log(e)

    }

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
    <>
      <div>{blog.url}</div>
      <div>{likes} <button onClick={addLike}>like</button></div>
      {console.log(blog.user.name, user.username)}
      <div>{blog.user.name || user.username}</div>
      {user !== null && user.username === blog.user.username && removeButton()}
    </>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{showAll? 'hide' : 'show'}</button>
        {showAll && details()}
      </div>
    </div>

  )
}

export default Blog