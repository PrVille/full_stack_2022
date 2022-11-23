import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { setMessage, clearMessage } from "../reducers/notificationReducer.js"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
    dispatch(setMessage("Added new anecdote: " + anecdote))
    setTimeout(() =>{ dispatch(clearMessage()) }
    , 5000)
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
