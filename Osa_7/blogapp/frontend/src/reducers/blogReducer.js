import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const initialState = [];
const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(byLikes);
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return action.payload;
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
        .sort(byLikes);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload).sort(byLikes);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const updateBlogById = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
