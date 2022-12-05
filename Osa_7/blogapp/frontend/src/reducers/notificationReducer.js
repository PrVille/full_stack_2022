import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage(state, action) {
      state.message = null;
      state.type = null;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

let timeoutID = undefined;
export const setNotification = (notification, duration) => {
  return (dispatch) => {
    clearTimeout(timeoutID);
    dispatch(setMessage(notification));
    timeoutID = setTimeout(() => {
      dispatch(clearMessage());
    }, duration * 1000);
  };
};
export default notificationSlice.reducer;
