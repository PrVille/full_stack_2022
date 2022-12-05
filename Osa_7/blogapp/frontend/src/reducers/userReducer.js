import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.js";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initUser = () => {
  return async (dispatch) => {
    const userFromStorage = await userService.getUser();
    if (userFromStorage) dispatch(setUser(userFromStorage));
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    await userService.setUser(user);
    dispatch(setUser(user));
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    await userService.clearUser();
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
