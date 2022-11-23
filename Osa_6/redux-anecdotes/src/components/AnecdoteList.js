import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer.js"
import { setNotification } from "../reducers/notificationReducer.js"

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
    [...state.anecdotes].sort(function (a, b) {
      return b.votes - a.votes
    }).filter(anecdote => anecdote.content.includes(state.filter.filter))
  )
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            dispatch(voteFor(anecdote.id))
            dispatch(setNotification("Voted for: " + anecdote.content, 3))
          }}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
