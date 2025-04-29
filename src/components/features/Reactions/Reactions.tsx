import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setReaction } from "../../../store/posts/postsSlice";
import { Button } from "../../common/Button/Button";

import like_image from "/public/like.svg";
import dislike_image from "/public/dislike.svg";

import clsx from "clsx";
import styles from "./Reactions.module.scss";

const DEFAULT_REACTIONS = {
  likes: 0,
  dislikes: 0,
  userReaction: undefined,
};

type ReactionType = "like" | "dislike";

interface ReactionProps {
  postId: number;
  className?: string;
}

export const Reactions = ({ postId, className = "" }: ReactionProps) => {
  const { like, dislike, userReaction } = useAppSelector(
    (state) => state.posts.reactions[postId] || DEFAULT_REACTIONS
  );
  const dispatch = useAppDispatch();

  const toggleReaction = (reaction: ReactionType) => {
    if (userReaction === reaction) {
      dispatch(setReaction({ postId, reaction: undefined }));
    } else {
      dispatch(setReaction({ postId, reaction }));
    }
  };

  const iconClass = (reactionType: ReactionType) =>
    clsx(styles.icon, {
      [styles.likeActive]: userReaction === "like" && reactionType === "like",
      [styles.dislikeActive]:
        userReaction === "dislike" && reactionType === "dislike",
      [styles.iconInactive]:
        userReaction !== "like" &&
        reactionType === "like" &&
        userReaction !== "dislike",
    });

  return (
    <div className={clsx(styles.reactions, className)}>
      <Button
        onClick={() => toggleReaction("like")}
        variant="secondary"
        aria-label="Like"
      >
        <img src={like_image} className={iconClass("like")} />
        {like}
      </Button>
      <Button
        onClick={() => toggleReaction("dislike")}
        variant="secondary"
        aria-label="Dislike"
      >
        <img src={dislike_image} className={iconClass("dislike")} />
        {dislike}
      </Button>
    </div>
  );
};
