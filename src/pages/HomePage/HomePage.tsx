import { useEffect } from "react";
import { fetchPosts } from "../../store/fetchPosts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PostCard } from "../../components/features/PostCard/PostCard";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Блог</h1>
      {posts.length > 0 && (
        <>
          <PostCard post={posts[0]} />
          <div>
            {posts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
