import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSinglePostThunk } from "../../store/posts/postsThunk";
import { Reactions } from "../../components/features/Reactions/Reactions";

export const PostPage = ({
  newsId,
  setNewsId,
}: {
  newsId: number;
  setNewsId: (id: number) => void;
}) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.singlePost.selectedPost);

  useEffect(() => {
    dispatch(fetchSinglePostThunk(newsId));
  }, [dispatch, newsId]);

  if (!post) return <div>Загрузка...</div>;

  const imageUrl = `https://placehold.co/1200x600?text=Post+${post.id}`;
  return (
    <div>
      <button onClick={() => setNewsId(-1)}>Вернуться к статьям</button>
      <img src={imageUrl}></img>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Reactions postId={post.id} className={`${post.id}`} />
    </div>
  );
};
