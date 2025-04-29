import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PostCard } from "../../components/features/PostCard/PostCard";
import { PostHero } from "../../components/features/PostHero/PostHero";
import styles from "./HomePage.module.scss";
import { Search } from "../../components/features/Search/Search";
import { fetchPostsThunk } from "../../store/posts/postsThunk";
import { useEffect } from "react";

export const HomePage = ({
  setNewsId,
}: {
  setNewsId: (id: number) => void;
}) => {
  const dispatch = useAppDispatch();
  const { posts, searchResults, loading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (posts.length === 0) {
      setTimeout(() => {
        dispatch(fetchPostsThunk());
      }, 1000);
    }
  }, [dispatch, posts.length]);

  const displayedPosts = searchResults !== null ? searchResults : posts;
  const hasPosts = displayedPosts.length > 0;

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.home_page}>
      <header>
        <h1>Блог</h1>
        <div className={styles.block_main_text}>
          <p className={styles.main_text}>
            Здесь мы делимся интересными кейсами из наших проектов, пишем про
            IT, а также переводим зарубежные статьи
          </p>
        </div>

        <Search />
      </header>

      {loading ? (
        <div className={styles.loading}>Загрузка новостей...</div>
      ) : hasPosts ? (
        <div>
          <PostHero post={displayedPosts[0]} setNewsId={setNewsId} />
          <div className={styles.news_list}>
            {displayedPosts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} setNewsId={setNewsId} />
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
