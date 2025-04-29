import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../api/jsonplaceholder/posts";
import { fetchSinglePostThunk } from "./postsThunk";

interface SinglePostState {
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: SinglePostState = {
  selectedPost: null,
  loading: false,
  error: null,
};

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePostThunk.pending, (state) => {
        state.loading = true;
        state.selectedPost = null;
        state.error = null;
      })
      .addCase(fetchSinglePostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchSinglePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default singlePostSlice.reducer;
