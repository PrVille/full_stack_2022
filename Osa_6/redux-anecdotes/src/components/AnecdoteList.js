import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer.js"

const Anecdote = ({ anecdote, handleVote }) => {
  const AnecdoteStyle = {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={AnecdoteStyle}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort(function (a, b) {
      return b.votes - a.votes
    })
  )
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(voteFor(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
