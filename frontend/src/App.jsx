import React from 'react'
import { usePosts } from './hooks/usePosts'
import { Trash2, Edit3, PlusCircle } from 'lucide-react'

function App() {
  const { posts, loading, refresh } = usePosts();

  return (
    <div className="app-container">
      <header className="header">
        <h1>The Blog ✍️</h1>
        <button className="btn-primary">
          <PlusCircle size={20} /> Make a new post
        </button>
      </header>

      <main>
        
        {loading ? (
          <div className="loading-state">
            <p>Loading ...</p>
          </div>
        ) : 
        
       
        posts.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>The database is empty. Time to write your first post!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post._id} className="post-card">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
                
                <div className="post-footer">
                  <span className="post-author">By {post.author || 'Anonymous'}</span>
                  <div className="post-actions">
                    <button className="btn-icon edit" title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button className="btn-icon delete" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App