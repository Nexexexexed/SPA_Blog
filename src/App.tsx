import { useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage";
import { PostPage } from "./pages/PostPage/PostPage";
function App() {
  const [newsId, setNewsId] = useState(-1);
  return (
    <div>
      {newsId >= 0 ? (
        <PostPage newsId={newsId} setNewsId={setNewsId} />
      ) : (
        <HomePage setNewsId={setNewsId} />
      )}
    </div>
  );
}

export default App;
