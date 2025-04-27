import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { searchPostsThunk } from "../../../store/thunks/searchPosts";
import { clearSearchResults } from "../../../store/slices/postsSlice";

import shape from "/public/shape.svg";

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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        placeholder="Поиск по названию статьи "
        aria-label="Поиск постов"
      ></input>
      <span>
        <img src={shape}></img>
      </span>
    </div>
  );
};
