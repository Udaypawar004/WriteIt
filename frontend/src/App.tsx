import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Blog from './Pages/Blog'
import Blogs from './Pages/Blogs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
