import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const CommentForm = ({ addComment, id }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    addComment({ comment, id })
    setComment("")
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Comment:</Form.Label>
          <Form.Control
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="havent read this yet..."
          />
          <Button size="sm" type="submit">Add comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm
