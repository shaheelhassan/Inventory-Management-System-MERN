import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='sidebar'>
      <div className='logo-container'>
        <h1 className='logo-text'>InvenTrack</h1>
      </div>
      
      <div className='nav-menu'>
        <NavLink to='/dashboard' className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to='/inventory' className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Package size={20} />
          <span>Inventory</span>
        </NavLink>
        
        <NavLink to='/reports' className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BarChart3 size={20} />
          <span>Reports</span>
        </NavLink>
        
        <NavLink to='/users' className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>
        
        <NavLink to='/settings' className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
      
      <div className='nav-footer' onClick={onLogout}>
        <div className='nav-item'>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
