import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchPosts as apiSearchPosts } from "../../api/jsonplaceholder/posts";

export const searchPostsThunk = createAsyncThunk(
  "posts/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const results = await apiSearchPosts(query);
      return results;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Неизвестная ошибка"
      );
    }
  }
);
