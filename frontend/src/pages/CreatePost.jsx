import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const { addPost } = usePosts();
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) return alert("You need to complete all fields for a post");

    const success = await addPost({ title, content, author });
    if (success) {
      setTitle('');
      setContent('');
      setAuthor('');
      navigate('/'); 
    }
  };

  return (
    <section className='form-section'>
      <h3>Add your post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title Here'
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input
          type='text'
          placeholder='Your Name (Author)'
          value={author}
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <textarea 
          placeholder='So what do you have to say for yourself squire?'
          value={content}
          onChange={(e) => setContent(e.target.value)} 
        />
        <button type='submit' className='btn-primary'>
          <Send size={20} /> Publish and be damned
        </button>
      </form>
    </section>
  );
}

export default CreatePost;