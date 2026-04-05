import { useState, useEffect } from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App(){
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
 const toggleTheme = () => setIsDarkMode(!isDarkMode);
   return (
    <div className='app-container'>
      <header className='header'>
        <h1>The Final Blog</h1>
        <nav>
          <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '🌙' : '☀️'}
          </button>
      </nav>
        <nav className='nav-links'>
          <Link to= "/" className='nav-item'>Blog Feed</Link>
          <Link to= "/create" className='nav-item btn-nav'>Add new post</Link>
        </nav>
      </header>
  
    <div className='content-area'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/create' element={<CreatePost />} />
      </Routes>
    </div>
    </div>
  )
}

export default App