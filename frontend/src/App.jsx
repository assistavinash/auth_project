import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import RefreshHandler from './refreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ PrivateRoute component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {/* ✅ Token Refresh / Auto Login Check */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
 
      <Routes>
        {/* ✅ Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Private Route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
