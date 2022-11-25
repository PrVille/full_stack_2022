import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes.js"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (id) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addLike(id)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
