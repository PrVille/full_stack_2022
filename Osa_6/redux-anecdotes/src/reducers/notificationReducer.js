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

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)
  }
}
export default notificationSlice.reducer
