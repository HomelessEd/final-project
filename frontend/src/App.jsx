import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App(){
  return (
    <div className='app-container'>
      <header className='header'>
        <h1>The Final Blog</h1>
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