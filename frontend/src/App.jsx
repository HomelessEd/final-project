import React, {useState} from 'react'
import { usePosts } from './hooks/usePosts'
import { Trash2, Edit3, Send} from 'lucide-react'

function App() {
  const {posts, loading, addPost, deletePost} =usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) return alert ("You need to complete all fields for a post");

    const success = await addPost({ title, content, author});
    if (success) {
      setTitle('');
      setContent('');
      setAuthor('');
    }
  };

  return (
    <div className="app-container">
      <header className='header'>
        <h1>The Final Blog</h1>
      </header>
      <section className='post-card'>
        <h3>Add your post</h3>
        <form onSubmit={handleSubmit}>
          <input
           type='text'
           placeholder='Title Here'
           value={title}
           onChange={(e) => setTitle(e.target.value)}/>
           <input
             type='text'
             placeholder='Your Name (Author)'
             value={author}
             onChange={(e) => setAuthor(e.target.value)}/>
           <textarea 
             placeholder='So what do you have to say for yourself squire?'
             value={content}
             onChange={(e) => setContent(e.target.value)}/>
             <button type='submit' className='btn-primary'>
              <Send size={20} /> Publish and be damned
             </button>
        </form>
      </section>

       <main>
        {loading ? <p>Loading...</p> : posts.map((post) => (
          <article key={post._id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-footer">
              <span className="post-author">By {post.author || 'Anonymous'}</span>
              <div className="post-actions">
                <button className="btn-icon edit"><Edit3 size={18} /></button>
                <button className="btn-icon delete" onClick={() => {
                  if(window.confirm("Hey be careful, you are going to delete this, you sure?")) {
                      deletePost(post._id);
                  }
                }}>
                  <Trash2 size={18} /></button>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}

export default App