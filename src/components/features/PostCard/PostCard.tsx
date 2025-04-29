import { Reactions } from "../Reactions/Reactions";
import styles from "./PostCard.module.scss";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export const PostCard = ({
  post,
  setNewsId,
}: PostCardProps & { setNewsId: (id: number) => void }) => {
  const imageUrl = `https://placehold.co/580x300?text=Post+${post.id}`;

  return (
    <article className={styles.postcard}>
      <img
        src={imageUrl}
        alt={post.title}
        loading="lazy"
        className={styles.postcard_image}
      />
      <div className={styles.postcard_block}>
        <h3>{post.title}</h3>
        <div className={styles.foonter_postcard}>
          <Reactions postId={post.id} className={`${post.id}`} />
          <button
            className={styles.button_more}
            onClick={() => setNewsId(post.id)}
          >
            Читать далее
          </button>
        </div>
      </div>
    </article>
  );
};
