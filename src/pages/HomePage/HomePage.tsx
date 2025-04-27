import { useAppSelector } from "../../store/hooks";
import { PostCard } from "../../components/features/PostCard/PostCard";
import { PostHero } from "../../components/features/PostHero/PostHero";
import styles from "./HomePage.module.scss";
import { Search } from "../../components/features/Search/Search";

export const HomePage = () => {
  const { posts, searchResults, searchQuery } = useAppSelector(
    (state) => state.posts
  );

  const showSearchResults = searchQuery && searchResults !== null;
  const displayedPosts = showSearchResults ? searchResults : posts;
  const hasPosts = displayedPosts && displayedPosts.length > 0;

  return (
    <div className={styles.home_page}>
      <h1>Блог</h1>
      <Search />
      {hasPosts ? (
        <div>
          <PostHero post={posts[0]} />
          <div className={styles.news_list}>
            {posts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.no_results}>
          {searchQuery
            ? `По запросу "${searchQuery}" ничего не найдено`
            : "Нет доступных постов"}
        </div>
      )}
    </div>
  );
};
