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
  const imageUrl = `https://placehold.co/600x400?text=Post+${post.id}`;

  return (
    <article className={styles.postcard}>
      <img src={imageUrl} alt={post.title} loading="lazy" />
      <div>
        <div>
          <h3>{post.title}</h3>
          <Reactions postId={post.id} className={`${post.id}`} />
          <button onClick={() => setNewsId(post.id)}>Читать далее</button>
        </div>
      </div>
    </article>
  );
};
