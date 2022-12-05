import { useState } from "react"

const CommentForm = ({ addComment, id }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    addComment({ comment, id })
    setComment("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="havent read this yet..."
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
