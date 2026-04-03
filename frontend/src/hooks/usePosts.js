import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_URL}/api/posts`;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        setPosts([response.data,...posts]);
        return true;
    } catch (err) {
        console.error("Show error:", err);
        return false;
    }
  };

  const updatePost = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    setPosts(posts.map(post => post._id === id ? response.data : post));
    return true;
  } catch (err) {
    console.error("Update error:", err);
    return false;
  }
};

  const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        setPosts(posts.filter(post => post._id !== id));
        return true;
    } catch (err) {
        console.error("Error with delete", err);
        alert("Err, we couldn´t delete that");
        return false;
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  
  return { posts, loading, addPost, updatePost, deletePost, refresh: fetchPosts };
}