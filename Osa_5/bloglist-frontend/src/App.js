import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  //window.localStorage.clear()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify('Logged in')
    } catch (e) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    notify('Logged out')
  }

  const addBlog = async (blog) => {
    console.log('adding blog', blog)
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      console.log(newBlog)

      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (e) {
      notify('Unable to add blog', 'error')
    }
  }

  const handleBlogRemoval = async (blog) => {
    try {
      setBlogs(blogs.filter(n => n.id !== blog.id))
    } catch (e) {
      notify('Unable to remove blog', 'error')
    }
  }

  const handleBlogLike = async (blog) => {
    try {
      const updatedBlog = {
        user: blog.user.id,
        likes: blog.likes += 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    } catch (e) {
      notify('Unable to like', 'error')
    }
  }


  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  let sortedBlogs = blogs.sort(function(a, b){return b.likes - a.likes})

  return (
    <div>
      <Notification notification={notification} />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          <div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} handleBlogRemoval={handleBlogRemoval} handleBlogLike={handleBlogLike} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
