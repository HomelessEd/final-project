import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/posts', postData);
        setPosts([response.data,...posts]);
        return true;
    } catch (err) {
        console.error("Show error:", err);
        return false;
    }
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);

  
  return { posts, loading, addPost, refresh: fetchPosts };
}