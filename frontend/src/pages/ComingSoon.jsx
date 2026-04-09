import React from 'react';
import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div style={{ 
      height: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#fff',
      textAlign: 'center',
      padding: '40px'
    }}>
      <div style={{ 
        width: '80px', 
        height: '80px', 
        backgroundColor: '#FFEBEE', 
        borderRadius: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <Construction size={40} color='#E53935' />
      </div>
      <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>{title} Module</h2>
      <p style={{ color: '#666', fontSize: '18px', maxWidth: '500px', marginBottom: '32px' }}>
        We're currently building this feature to help you manage your inventory even better. Stay tuned for updates!
      </p>
      <Link to="/dashboard" className="btn btn-primary" style={{ padding: '12px 32px' }}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ComingSoon;
