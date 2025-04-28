import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PostCard } from "../../components/features/PostCard/PostCard";
import { PostHero } from "../../components/features/PostHero/PostHero";
import styles from "./HomePage.module.scss";
import { Search } from "../../components/features/Search/Search";
import { fetchPosts } from "../../store/fetchPosts";
import { useEffect } from "react";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { posts, searchResults, loading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (posts.length === 0) {
      setTimeout(() => {
        dispatch(fetchPosts());
      }, 1000);
    }
  }, [dispatch, posts.length]);

  const displayedPosts = searchResults !== null ? searchResults : posts;
  const hasPosts = displayedPosts.length > 0;

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.home_page}>
      <h1>Блог</h1>
      <Search />

      {loading ? (
        <div>Загрузка новостей...</div>
      ) : hasPosts ? (
        <div>
          <PostHero post={displayedPosts[0]} />
          <div className={styles.news_list}>
            {displayedPosts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.no_results}>
          {searchResults !== null
            ? `По вашему запросу ничего не найдено`
            : "Нет доступных постов"}
        </div>
      )}
    </div>
  );
};
