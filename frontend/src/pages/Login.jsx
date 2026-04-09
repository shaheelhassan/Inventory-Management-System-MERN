import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { Eye, EyeOff, Package, LayoutDashboard, BarChart3, Users } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

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
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#E53935",
            },
            links: {
              color: "#E53935",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
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
          borderRadius: '16px',
          border: 'none'
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 700, textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ color: '#666', marginBottom: '40px', textAlign: 'center', fontSize: '14px' }}>Please enter your credentials to login</p>
        
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              className='search-input'
              style={{ height: '52px', paddingLeft: '16px', borderRadius: '12px', border: '1px solid #E0E0E0' }}
              placeholder='admin@inventrack.com'
              required
            />
          </div>
          
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#333' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={onChange}
                className='search-input'
                style={{ height: '52px', paddingLeft: '16px', borderRadius: '12px', border: '1px solid #E0E0E0', width: '100%' }}
                placeholder='••••••••'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', color: '#666' }}>
              <input type='checkbox' style={{ width: '16px', height: '16px', accentColor: '#E53935' }} /> Remember me
            </label>
            <a href='#' style={{ fontSize: '14px', color: '#E53935', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
          </div>
          
          <button
            type='submit'
            className='btn btn-primary'
            style={{ width: '100%', height: '52px', fontSize: '16px', fontWeight: 600, borderRadius: '12px', marginBottom: '24px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #F0F0F0' }}>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
            New to InvenTrack? <Link to='/register' style={{ color: '#E53935', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
          </p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Access issues? <a href='#' style={{ color: '#E53935', fontWeight: 600, textDecoration: 'none' }}>Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
