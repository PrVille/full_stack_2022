import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    clearMessage(state, action) {
      state.message = ""
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

let timeoutID = undefined
export const setNotification = (message, duration) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(setMessage(message))
    timeoutID = setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}
export default notificationSlice.reducer
