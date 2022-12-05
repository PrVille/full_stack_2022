import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
