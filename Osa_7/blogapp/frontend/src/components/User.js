import { Link } from "react-router-dom"

const User = ({ user }) => {
  if (!user) {
    return null
  }
  const blogs = user.blogs.map((blog) => (
    <li key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li>
  ))

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{blogs}</ul>
    </div>
  )
}

export default User
