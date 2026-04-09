import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/dashboard' />} />
          
          <Route
            path='/*'
            element={
              user ? (
                <div className='sidebar-layout'>
                  <Sidebar />
                  <div className='main-content'>
                    <Navbar />
                    <Routes>
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/inventory' element={<Inventory />} />
                      <Route path='/reports' element={<Reports />} />
                      <Route path='/users' element={<Users />} />
                      <Route path='/settings' element={<Settings />} />
                      <Route path='*' element={<Navigate to='/dashboard' />} />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Navigate to='/' />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
