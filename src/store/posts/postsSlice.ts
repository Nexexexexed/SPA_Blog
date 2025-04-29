import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../api/jsonplaceholder/posts";
import { fetchPostsThunk, searchPostsThunk } from "./postsThunk";

type ReactionType = "like" | "dislike";
type UserReaction = ReactionType | undefined;

interface Reactions {
  like: number;
  dislike: number;
  userReaction: UserReaction;
}

interface PostsState {
  posts: Post[];
  searchResults: Post[] | null;
  loading: boolean;
  error: string | null;
  reactions: Record<number, Reactions>;
}

const initialState: PostsState = {
  posts: [],
  searchResults: null,
  loading: false,
  error: null,
  reactions: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.searchResults = null;
    },
    setReaction(
      state,
      action: PayloadAction<{ postId: number; reaction: ReactionType }>
    ) {
      const { postId, reaction } = action.payload;
      const current = state.reactions[postId] ?? {
        like: 0,
        dislike: 0,
        userReaction: undefined,
      };

      if (current.userReaction === reaction) {
        current[reaction] -= 1;
        current.userReaction = undefined;
      } else {
        if (current.userReaction) {
          current[current.userReaction] -= 1;
        }
        current[reaction] += 1;
        current.userReaction = reaction;
      }

      state.reactions[postId] = current;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        action.payload.forEach((post) => {
          if (!state.reactions[post.id]) {
            state.reactions[post.id] = {
              like: Math.floor(Math.random() * 50),
              dislike: Math.floor(Math.random() * 50),
              userReaction: undefined,
            };
          }
        });
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResults, setReaction } = postsSlice.actions;
export default postsSlice.reducer;
