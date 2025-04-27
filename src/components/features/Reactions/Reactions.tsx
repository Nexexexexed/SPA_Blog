import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setReaction } from "../../../store/slices/postsSlice";
import { Button } from "../../common/Button/Button";

import like from "/public/like.svg";
import dislike from "/public/dislike.svg";

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
  const { likes, dislikes, userReaction } = useAppSelector(
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
        <svg>{like}</svg>
        {likes}
      </Button>
      <Button
        onClick={handleDislike}
        variant={userReaction === "dislike" ? "primary" : "secondary"}
        aria-label="Dislike"
      >
        <svg>{dislike}</svg>
        {dislikes}
      </Button>
    </div>
  );
};
