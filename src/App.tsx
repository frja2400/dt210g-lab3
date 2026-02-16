import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Huvudkomponenten som sätter upp navigeringen och skyddar admin-sidan med ProtectedRoute, samt inkluderar Navbar på alla sidor
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App