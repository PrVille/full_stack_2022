import PropTypes from "prop-types"
import CommentForm from "./CommentForm.js"

const Blog = ({ blog, likeBlog, removeBlog, addComment, user }) => {
  if (!user || !blog) {
    return null
  }

  const comments = blog.comments.map((comment, index) => (
    <li key={index}>
      {comment}
    </li>
  ))
  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous"
  const own = blog.user && user.username === blog.user.username

  return (
    <div>
      <div className="blog">
        <h3>
          {blog.title} by {blog.author}
        </h3>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{" "}
          <button onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        <div>{addedBy}</div>
        <div>
          {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
        </div>
      </div>
      <div className='commenSection'>
        <h4>comments</h4>
        <CommentForm addComment={addComment} id={blog.id} />
        <ul>{comments}</ul>
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
