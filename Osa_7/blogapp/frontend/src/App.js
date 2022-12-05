import { useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Blogs from "./components/Blogs"
import User from "./components/User.js"
import Users from "./components/Users.js"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Menu from "./components/Menu.js"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from "react-router-dom"

import loginService from "./services/login"

import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer.js"
import {
  initBlogs,
  addBlog,
  deleteBlog,
  updateBlogById,
} from "./reducers/blogReducer.js"
import { initUser, addUser, removeUser } from "./reducers/userReducer"
import { initUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const user = useSelector(({ user }) => {
    return user
  })

  const users = useSelector(({ users }) => {
    return users
  })

  const notification = useSelector(({ notification }) => {
    return notification
  })

  const useUserMatch = useMatch("/users/:id")
  const userMatch = useUserMatch
    ? users.find((user) => user.id === useUserMatch.params.id)
    : null

  const useBlogMatch = useMatch("/blogs/:id")

  const blogMatch = useBlogMatch
    ? blogs.find((blog) => blog.id === useBlogMatch.params.id)
    : null

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(addUser(user))
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify("wrong username/password", "alert")
      })
  }

  const logout = () => {
    dispatch(removeUser())
    notify("good bye!")
  }

  const createBlog = async (blog) => {
    dispatch(addBlog(blog))
      .then((createdBlog) => {
        notify(
          `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
        )
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {       
        notify("creating a blog failed: " + error, "alert")
      })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id)).then(() => {
      notify(`removed '${toRemove.title}' by ${toRemove.author}`)
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }

    dispatch(updateBlogById(liked)).then(() => {
      notify(`you liked '${toLike.title}' by ${toLike.author}`)
    })
  }

  const commentBlog = async ({ id, comment }) => {
    const toComment = blogs.find((b) => b.id === id)
    const commented = {
      ...toComment,
      comments: toComment.comments.concat(comment),
      user: toComment.user.id,
    }

    dispatch(updateBlogById(commented)).then(() => {
      notify(`comment added`)
    })
  }

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }, 5))
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <Menu user={user} logout={logout} />

      <h2>blog app</h2>

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<div>Welcome</div>} />
        <Route path="/users/:id" element={<User user={userMatch} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blogMatch}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              addComment={commentBlog}
              user={user}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/blogs"
          element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlogForm onCreate={createBlog} />
              </Togglable>

              <Blogs blogs={blogs} />
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
