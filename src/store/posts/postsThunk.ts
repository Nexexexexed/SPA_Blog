import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPosts,
  searchPosts,
  fetchPostById,
} from "../../api/jsonplaceholder/posts";

export const fetchSinglePostThunk = createAsyncThunk(
  "singlePost/fetchById",
  async (id: number, thunkAPI) => {
    try {
      return await fetchPostById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Ошибка загрузки поста"
      );
    }
  }
);

export const fetchPostsThunk = createAsyncThunk(
  "posts/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchPosts();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Ошибка загрузки постов"
      );
    }
  }
);

export const searchPostsThunk = createAsyncThunk(
  "posts/search",
  async (query: string, thunkAPI) => {
    try {
      return await searchPosts(query);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Ошибка поиска"
      );
    }
  }
);
