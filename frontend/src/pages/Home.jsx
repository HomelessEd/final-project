import { useState, useEffect } from 'react'
import { usePosts } from '../hooks/usePosts' 
import { Trash2, Edit3 } from 'lucide-react'

function Home() {
  const { posts, loading, updatePost, deletePost } = usePosts();
  
  
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleUpdate = async (id) => {
    if(!editTitle.trim() || !editContent.trim()) {
      alert ("No empty messages squire");
      return;
    }
    const success = await updatePost(id, { title: editTitle, content: editContent });
    if (success) {
      setEditingId(null); 
    }
  };

  return (
    <main>
      {loading ? (
        <div className="loading-state">
    <div className="spinner"></div> 
    <h2>Oye! Render, wake up mate...</h2>
    <p>Sorry, give him a few seconds but no more than thirty</p>
  </div>
      ) : (
        posts.length === 0 ? (
          <p className="empty-msg">It´s kind of empty here. Let´s get started</p>
        ) : (
        posts.map((post) => (
          <article key={post._id} className="post-card">
            {editingId === post._id ? (
              <div className='edit-container'>
                <input 
                  className='edit-input'
                  value={editTitle}
                  required
                  minLength="3"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea 
                  className='edit-textarea'
                  value={editContent}
                  required
                  minLength="10"
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className='edit-action'>
                  <button className='btn-save' onClick={() => handleUpdate(post._id)}>Save your post</button>
                  <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <div className="post-footer">
                  <span className="post-author">By {post.author || 'Anonymous'}</span>
                  <div className="post-actions">
                    <button className="btn-icon edit" onClick={() => {
                      setEditingId(post._id);    
                      setEditTitle(post.title);  
                      setEditContent(post.content); 
                    }}>
                      <Edit3 size={18} />
                    </button>
                    <button className="btn-icon delete" onClick={() => {
                      if(window.confirm("Hey be careful, you are going to delete this, you sure?")) {
                          deletePost(post._id);
                      }
                    }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </article>
        ))
      )
      )}
    </main>
  );
}

export default Home;