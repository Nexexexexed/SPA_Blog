import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSinglePostThunk } from "../../store/posts/postsThunk";
import { Reactions } from "../../components/features/Reactions/Reactions";

import styles from "./PostPage.module.scss";

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

  if (!post) return <div className={styles.loading}>Загрузка...</div>;

  const imageUrl = `https://placehold.co/848x477?text=Post+${post.id}`;
  return (
    <main className={styles.main_post}>
      <header className={styles.header_page}>
        <button className={styles.button_back} onClick={() => setNewsId(-1)}>
          Вернуться к статьям
        </button>
        <Reactions postId={post.id} className={`${post.id}`} />
      </header>

      <h2>{post.title}</h2>
      <div className={styles.body}>
        <img src={imageUrl}></img>
        <p className={styles.text_post}>{post.body}</p>
      </div>
    </main>
  );
};
