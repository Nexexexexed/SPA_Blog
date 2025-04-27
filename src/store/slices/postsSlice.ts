import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { Post } from "../../api/jsonplaceholder/posts";
import { searchPostsThunk } from "../thunks/searchPosts";

type ReactionType = "like" | "dislike";
type UserReaction = ReactionType | undefined;

interface Reactions {
  likes: number;
  dislikes: number;
  userReaction: UserReaction;
}

interface PostsState {
  posts: Post[];
  searchResults: Post[] | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  reactions: Record<number, Reactions>;
}

const initialState: PostsState = {
  posts: [],
  searchResults: null,
  searchQuery: "",
  loading: false,
  error: null,
  reactions: {},
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostsLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.posts = action.payload;

      action.payload.forEach((post) => {
        if (!state.reactions[post.id]) {
          state.reactions[post.id] = {
            likes: Math.floor(Math.random() * 50),
            dislikes: Math.floor(Math.random() * 50),
            userReaction: undefined,
          };
        }
      });
    },
    setPostsFailure(state, acion: PayloadAction<string>) {
      state.loading = false;
      state.error = acion.payload;
    },
    setSearchResults(
      state,
      action: PayloadAction<{ results: Post[]; query: string }>
    ) {
      state.searchResults = action.payload.results ?? [];
      state.searchQuery = action.payload.query;
    },
    clearSearchResults(state) {
      state.searchResults = null;
      state.searchQuery = "";
    },
    setReaction(
      state,
      action: PayloadAction<{ postId: number; reaction: ReactionType }>
    ) {
      const { postId, reaction } = action.payload;
      if (!state.reactions[postId]) {
        state.reactions[postId] = {
          likes: reaction === "like" ? 1 : 0,
          dislikes: reaction === "dislike" ? 1 : 0,
          userReaction: reaction,
        };
        return;
      }

      const current = state.reactions[postId];

      if (current.userReaction === reaction) {
        current[reaction === "like" ? "likes" : "dislikes"] -= 1;
        current.userReaction = undefined;
      } else if (current.userReaction) {
        current[current.userReaction === "like" ? "likes" : "dislikes"] -= 1;
        current[reaction === "like" ? "likes" : "dislikes"] += 1;
        current.userReaction = reaction;
      } else {
        current[reaction === "like" ? "likes" : "dislikes"] += 1;
        current.userReaction = reaction;
      }
    },
    extraReducers: (builder: ActionReducerMapBuilder<PostsState>) => {
      builder
        .addCase(searchPostsThunk.pending, (state: PostsState) => {
          state.loading = true;
        })
        .addCase(
          searchPostsThunk.fulfilled,
          (
            state: PostsState,
            action: PayloadAction<Post[], string, { arg: string }>
          ) => {
            state.loading = false;
            state.searchResults = action.payload;
            state.searchQuery = action.meta.arg;
          }
        )
        .addCase(
          searchPostsThunk.rejected,
          (state: PostsState, action: { error: { message: string } }) => {
            state.loading = false;
            state.error = action.error.message || "Ошибка поиска";
          }
        );
    },
  },
});

export const {
  setPostsLoading,
  setPostsSuccess,
  setPostsFailure,
  setReaction,
  setSearchResults,
  clearSearchResults,
} = postsSlice.actions;
export default postsSlice.reducer;
