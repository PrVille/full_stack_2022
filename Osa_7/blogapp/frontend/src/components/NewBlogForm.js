import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor("")
    setTitle("")
    setUrl("")
  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlogForm
