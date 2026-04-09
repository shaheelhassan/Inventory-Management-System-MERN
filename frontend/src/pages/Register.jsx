import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px'
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          particles: {
            color: { value: "#E53935" },
            links: { color: "#E53935", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />
      
      <div 
        className='card fade-in' 
        style={{ 
          width: '100%', 
          maxWidth: '480px', 
          padding: '48px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          backgroundColor: '#fff',
          borderRadius: '24px',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: '#666' }}>Start optimizing your inventory today.</p>
        </div>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                className='search-input'
                style={{ height: '52px', paddingLeft: '48px', borderRadius: '12px' }}
                placeholder='John Doe'
                required
              />
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onChange}
                className='search-input'
                style={{ height: '52px', paddingLeft: '48px', borderRadius: '12px' }}
                placeholder='john@example.com'
                required
              />
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={onChange}
                className='search-input'
                style={{ height: '52px', paddingLeft: '48px', paddingRight: '48px', borderRadius: '12px' }}
                placeholder='••••••••'
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={confirmPassword}
                onChange={onChange}
                className='search-input'
                style={{ height: '52px', paddingLeft: '48px', borderRadius: '12px' }}
                placeholder='••••••••'
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            style={{ width: '100%', height: '52px', fontSize: '16px', fontWeight: 600, borderRadius: '12px', marginBottom: '24px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #F0F0F0' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Already have an account? <Link to='/login' style={{ color: '#E53935', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
