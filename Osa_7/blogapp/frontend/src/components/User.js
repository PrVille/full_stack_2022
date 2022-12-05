import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';

const User = ({ user }) => {
  if (!user) {
    return null
  }
  const blogs = user.blogs.map((blog) => (
    <ListGroup.Item key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </ListGroup.Item>
  ))

  return (
    <div>
      <br/>
      <h2>{user.name}</h2>
      <br/>
      <h3>Added blogs</h3>
      <br/>
      <ListGroup variant='flush'>{blogs}</ListGroup>
    </div>
  )
}

export default User
