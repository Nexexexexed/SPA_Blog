import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setReaction } from "../../../store/posts/postsSlice";
import { Button } from "../../common/Button/Button";

import like_image from "/public/like.svg";
import dislike_image from "/public/dislike.svg";

const DEFAULT_REACTIONS = {
  likes: 0,
  dislikes: 0,
  userReaction: undefined,
};

interface ReactionProps {
  postId: number;
  className: string;
}

export const Reactions = ({ postId, className }: ReactionProps) => {
  const { like, dislike, userReaction } = useAppSelector(
    (state) => state.posts.reactions[postId] || DEFAULT_REACTIONS
  );
  const dispatch = useAppDispatch();

  const handleLike = () => {
    dispatch(setReaction({ postId, reaction: "like" }));
  };

  const handleDislike = () => {
    dispatch(setReaction({ postId, reaction: "dislike" }));
  };

  return (
    <div className={`reactions_${className}`}>
      <Button
        onClick={handleLike}
        variant={userReaction === "like" ? "primary" : "secondary"}
        aria-label="Like"
      >
        <img src={like_image}></img>
        {like}
      </Button>
      <Button
        onClick={handleDislike}
        variant={userReaction === "dislike" ? "primary" : "secondary"}
        aria-label="Dislike"
      >
        <img src={dislike_image}></img>
        {dislike}
      </Button>
    </div>
  );
};
