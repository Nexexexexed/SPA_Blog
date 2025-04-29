import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { searchPostsThunk } from "../../../store/posts/postsThunk";
import { clearSearchResults } from "../../../store/posts/postsSlice";

import shape from "/public/shape.svg";

import styles from "./Search.module.scss";

export const Search = () => {
  const [inputValue, setinputValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        dispatch(searchPostsThunk(inputValue.trim()));
      } else {
        dispatch(clearSearchResults());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch]);

  return (
    <div className={styles.input_block}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        placeholder="Поиск по названию статьи "
        aria-label="Поиск постов"
        className={styles.input_search}
      ></input>
      <span className={styles.image_shape}>
        <img src={shape}></img>
      </span>
    </div>
  );
};
