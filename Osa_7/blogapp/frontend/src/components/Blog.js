import PropTypes from "prop-types"
import CommentForm from "./CommentForm.js"
import { Button, ListGroup } from "react-bootstrap"

const Blog = ({ blog, likeBlog, removeBlog, addComment, user }) => {
  if (!user || !blog) {
    return null
  }

  const comments = blog.comments.map((comment, index) => (
    <ListGroup.Item key={index}>
      {comment}
    </ListGroup.Item>
  ))
  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous"
  const own = blog.user && user.username === blog.user.username

  return (
    <div>
      <br/>
      <div className="blog">
        <h3>
          {blog.title} by {blog.author}
        </h3>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} Likes{" "}
          <Button size="sm" onClick={() => likeBlog(blog.id)}>Like</Button>
        </div>
        <div>{addedBy}</div>
        <div>
          {own && <Button variant='danger' size="sm" onClick={() => removeBlog(blog.id)}>Remove</Button>}
        </div>
      </div>
      <br/>
      <div className='commenSection'>
        <h4>Comments</h4>
        <CommentForm addComment={addComment} id={blog.id} />
        <br/>
        <ListGroup variant='flush'>{comments}</ListGroup>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
