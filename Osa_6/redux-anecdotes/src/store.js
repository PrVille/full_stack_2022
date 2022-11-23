import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer.js"
import notificationReducer from "./reducers/notificationReducer.js"
import filterReducer from "./reducers/filterReducer.js"

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
})

console.log(store.getState())

export default store
