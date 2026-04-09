import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../features/users/userService';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Shield, 
  Mail, 
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers(currentUser.token);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser.token]);

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>Loading user management...</div>;

  return (
    <div className='fade-in'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Team Management</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Control access levels and manage your organization's members.</p>
        </div>
        <button className='btn btn-primary' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={18} />
          Invite Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(229, 57, 53, 0.1)', color: '#E53935' }}>
            <UsersIcon size={24} />
          </div>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Members</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{users.length}</h3>
          </div>
        </div>
        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
            <Shield size={24} />
          </div>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Admins</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{users.filter(u => u.role === 'Admin').length}</h3>
          </div>
        </div>
        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(30, 136, 229, 0.1)', color: '#1E88E5' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>Active Now</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{users.length}</h3>
          </div>
        </div>
      </div>

      <div className='table-container'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>NAME & EMAIL</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>JOINED DATE</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--surface-lowest)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600,
                      color: u.role === 'Admin' ? '#E53935' : '#AAA'
                    }}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{u.name} {u._id === currentUser._id && <span style={{ color: '#E53935', fontSize: '10px' }}>(YOU)</span>}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} /> {u.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={14} color={u.role === 'Admin' ? '#E53935' : '#666'} />
                    <span style={{ fontSize: '13px' }}>{u.role}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td style={{ textAlign: 'right' }}>
                   <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button style={{ border: 'none', background: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
                        <Edit size={16} />
                      </button>
                      <button style={{ border: 'none', background: 'none', color: '#E53935', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
