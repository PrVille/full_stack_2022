import { connect } from 'react-redux' 
import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { setNotification } from "../reducers/notificationReducer.js"

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ""
    props.createAnecdote(anecdote)
    props.setNotification("Added new anecdote: " + anecdote, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
