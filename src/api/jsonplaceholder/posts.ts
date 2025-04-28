import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

//здесь реализовал частично серверную фильтрацию, так как JSONPlaceholder не имеет GET запроса для полного совпадения, поэтому используется title_like для частичной и дополнительный фильтр для жесткой фильтрации
export const searchPosts = async (query: string): Promise<Post[]> => {
  if (!query.trim()) return [];
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?title_like=${encodeURIComponent(
      query
    )}`
  );
  return response.data.filter((post: Post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};
