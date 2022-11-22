import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer.js"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
