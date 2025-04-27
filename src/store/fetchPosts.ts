import { AppDispatch } from "./store";
import { fetchPosts as fetchPostsApi } from "../api/jsonplaceholder/index";
import {
  setPostsLoading,
  setPostsSuccess,
  setPostsFailure,
} from "./slices/postsSlice";

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPostsLoading());
    const posts = await fetchPostsApi();
    dispatch(setPostsSuccess(posts));
  } catch (error) {
    dispatch(
      setPostsFailure(
        error instanceof Error ? error.message : "Непредвиденная ошибка"
      )
    );
  }
};
