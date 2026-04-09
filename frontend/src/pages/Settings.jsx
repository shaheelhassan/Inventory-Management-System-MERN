import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Settings as SettingsIcon, 
  Database, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  HelpCircle,
  Save,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Cloud
} from 'lucide-react';

const Settings = () => {
  const [activeSubTab, setActiveSubTab] = useState('Profile');
  const { user } = useSelector((state) => state.auth);

  const subTabs = [
    { name: 'Profile', icon: User },
    { name: 'Account Settings', icon: Globe },
    { name: 'Security', icon: Lock },
    { name: 'Integrations', icon: Cloud },
    { name: 'Appearance', icon: Palette },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'Profile':
        return (
          <div className='fade-in'>
            <div className='card' style={{ marginBottom: '32px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '24px' }}>Public Information</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--surface-lowest)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '40px',
                    fontWeight: 700,
                    color: '#E53935',
                    border: '4px solid var(--border)'
                  }}>
                    {user?.name?.charAt(0)}
                  </div>
                  <div style={{ 
                    position: 'absolute', bottom: '0', right: '0', 
                    backgroundColor: '#E53935', color: 'white', 
                    padding: '8px', borderRadius: '50%', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)', cursor: 'pointer' 
                  }}>
                    <Save size={14} />
                  </div>
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '18px' }}>{user?.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{user?.role} since Dec 2023</p>
                  <button className='btn btn-outline' style={{ marginTop: '12px', fontSize: '13px', padding: '6px 12px' }}>Upload New Photo</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className='form-group'>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>FULL NAME</label>
                  <input type='text' className='search-input' defaultValue={user?.name} style={{ width: '100%' }} />
                </div>
                <div className='form-group'>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>EMAIL ADDRESS</label>
                  <input type='email' className='search-input' defaultValue={user?.email} style={{ width: '100%' }} />
                </div>
                <div className='form-group' style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>BIO (OPTIONAL)</label>
                  <textarea 
                    className='search-input' 
                    placeholder='Briefly describe your role or department...' 
                    style={{ width: '100%', height: '100px', resize: 'none', padding: '12px' }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button className='btn btn-outline'>Discard Changes</button>
              <button className='btn btn-primary'>Save Profile Changes</button>
            </div>
          </div>
        );

      case 'Account Settings':
          return (
            <div className='fade-in'>
                 <div className='card'>
                    <h4 style={{ fontWeight: 600, marginBottom: '24px' }}>General Preferences</h4>
                    {[
                      { title: 'Timezone', value: 'GMT +5:00 (Karachi)', icon: Globe },
                      { title: 'Primary Language', value: 'English (US)', icon: Globe },
                      { title: 'Data Retention', value: '365 Days', icon: Database },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i === 2 ? 'none' : '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                           <item.icon size={20} color='var(--text-secondary)' />
                           <div>
                              <p style={{ fontWeight: 500, fontSize: '14px' }}>{item.title}</p>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.value}</p>
                           </div>
                        </div>
                        <ChevronRight size={18} color='var(--text-secondary)' />
                      </div>
                    ))}
                 </div>
            </div>
          );

      case 'Security':
        return (
          <div className='fade-in'>
            <div className='card' style={{ borderLeft: '4px solid #E53935' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <ShieldCheck size={32} color='#E53935' />
                  <div>
                    <h4 style={{ fontWeight: 700 }}>Critical Security Update</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Your current session is encrypted with SHA-256 for maximum safety.</p>
                  </div>
               </div>
               <button className='btn btn-primary' style={{ width: '100%' }}>Update Password Now</button>
            </div>
          </div>
        )

      default:
        return (
          <div className='card fade-in'>
             <div style={{ textAlign: 'center', padding: '40px' }}>
                <Palette size={48} color='var(--text-secondary)' style={{ marginBottom: '16px', opacity: 0.5 }} />
                <h4 style={{ fontWeight: 600 }}>Appearance Management</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '300px', margin: 'auto' }}>Individual theme overrides and visual accessibility options coming soon.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className='fade-in'>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Fine-tune your experience and manage system-wide integrations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {subTabs.map(tab => (
            <button 
              key={tab.name}
              onClick={() => setActiveSubTab(tab.name)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '12px 18px', borderRadius: '10px', 
                border: 'none', cursor: 'pointer',
                backgroundColor: activeSubTab === tab.name ? 'rgba(229, 57, 53, 0.1)' : 'transparent',
                color: activeSubTab === tab.name ? '#E53935' : 'var(--text-secondary)',
                fontWeight: activeSubTab === tab.name ? 700 : 500,
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <tab.icon size={18} />
              {tab.name}
              {activeSubTab === tab.name && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '16px', paddingTop: '16px' }}>
             <button style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                padding: '12px 18px', borderRadius: '10px', 
                border: 'none', cursor: 'pointer',
                backgroundColor: 'transparent', color: '#E53935', fontSize: '14px', fontWeight: 600
             }}>
                <LogOut size={18} />
                Logout Session
             </button>
          </div>
        </div>

        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
