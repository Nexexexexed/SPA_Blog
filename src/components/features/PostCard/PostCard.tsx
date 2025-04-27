import { Reactions } from "../Reactions/Reactions";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const imageUrl = `https://placehold.co/600x400?text=Post+${post.id}`;

  return (
    <article>
      <img src={imageUrl} alt={post.title} loading="lazy" />
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Reactions postId={post.id} className={`${post.id}`} />
      </div>
    </article>
  );
};
