import { Reactions } from "../Reactions/Reactions";
import styles from "./PostHero.module.scss";

interface PostHeroProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export const PostHero = ({
  post,
  setNewsId,
}: PostHeroProps & { setNewsId: (id: number) => void }) => {
  const imageUrl = `https://placehold.co/1200x600?text=Post+${post.id}`;

  return (
    <article className={styles.hero}>
      <img
        src={imageUrl}
        alt={post.title}
        loading="lazy"
        className={styles.heroImage}
      />
      <div className={styles.heroContent}>
        <div className={styles.title_block}>
          <h3 className={styles.heroTitle}>{post.title}</h3>
          <Reactions postId={post.id} className={`${post.id}`} />
          <button onClick={() => setNewsId(post.id)}>Читать далее</button>
        </div>
        <p>{post.body}</p>
      </div>
    </article>
  );
};
