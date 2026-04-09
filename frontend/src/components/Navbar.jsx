import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '../features/ui/uiSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <nav className='navbar' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
      <div className='search-container' style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-variant)' }} />
        <input 
          type='text' 
          placeholder='Search inventory...' 
          className='search-input' 
          style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-low)', color: 'var(--on-surface)' }}
        />
      </div>
      
      <div className='user-profile' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          onClick={() => dispatch(toggleTheme())}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: 'var(--on-surface-variant)',
            display: 'flex',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'var(--surface-lowest)'
          }}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button style={{ background: 'none', border: 'none', padding: '8px', color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
          <Bell size={20} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className='avatar' style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E53935', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--on-surface)' }}>{user?.name}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user?.role}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
