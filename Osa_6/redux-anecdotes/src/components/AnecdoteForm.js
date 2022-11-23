import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { setMessage, clearMessage } from "../reducers/notificationReducer.js"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
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
