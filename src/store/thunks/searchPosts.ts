import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchPosts } from "../../api/jsonplaceholder/posts";

export const searchPostsThunk = createAsyncThunk(
  "posts/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await searchPosts(query);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Неизвестная ошибка"
      );
    }
  }
);
