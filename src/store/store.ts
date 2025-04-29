import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";
import singlePostReducer from "./posts/singlePostSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    singlePost: singlePostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
