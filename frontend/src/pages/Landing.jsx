import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe,
  ExternalLink,
  Users,
  Moon,
  Sun,
  Layers,
  Cpu,
  MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toggleTheme } from '../features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.ui);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
  const [scrolled, setScrolled] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const theme = {
    bg: isDarkMode ? '#050505' : '#FFFFFF',
    text: isDarkMode ? '#F5F5F5' : '#111111',
    subText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    navBg: isDarkMode ? 'rgba(5,5,5,0.7)' : 'rgba(255,255,255,0.7)',
    primary: '#E53935'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div style={{ 
      backgroundColor: theme.bg, 
      color: theme.text, 
      fontFamily: "'Inter', sans-serif",
      transition: 'background-color 0.5s ease',
      overflowX: 'hidden'
    }}>
      {/* Navbar */}
      <nav style={{ 
        height: scrolled ? '70px' : '90px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: isMobile ? '0 20px' : '0 60px', 
        position: 'fixed', 
        width: '100%', 
        top: 0, 
        backgroundColor: scrolled ? theme.navBg : 'transparent', 
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        zIndex: 1000,
        borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <div style={{ 
            backgroundColor: theme.primary, 
            padding: '10px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(229, 57, 53, 0.35)'
          }}>
            <Package size={22} color='#FFF' />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-1px' }}>InvenTrack</span>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '28px' }}>
              {['Features', 'Solutions', 'Pricing'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="nav-pill"
                  style={{ 
                    fontWeight: 500, 
                    fontSize: '15px', 
                    textDecoration: 'none', 
                    color: theme.subText,
                    padding: '8px 12px',
                    borderRadius: '8px'
                  }}
                >{item}</a>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleTheme())}
              style={{ 
                background: 'none', 
                border: `1px solid ${theme.border}`, 
                borderRadius: '12px', 
                width: '42px',
                height: '42px',
                cursor: 'pointer',
                color: theme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {!isMobile && <Link to="/dashboard" style={{ fontWeight: 600, color: theme.text, fontSize: '15px' }}>Dashboard</Link>}
                <button 
                  onClick={onLogout}
                  className="btn-premium"
                  style={{ 
                    backgroundColor: theme.text, 
                    color: theme.bg, 
                    padding: '12px 24px', 
                    borderRadius: '12px', 
                    fontWeight: 700, 
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link to="/login" style={{ fontWeight: 600, color: theme.text, fontSize: '15px' }}>Login</Link>
                <Link to="/register" 
                  className="btn-premium"
                  style={{ 
                    backgroundColor: theme.primary, 
                    color: '#fff', 
                    padding: isMobile ? '10px 20px' : '14px 32px', 
                    borderRadius: '14px', 
                    fontWeight: 700, 
                    fontSize: '15px'
                  }}
                >{isMobile ? 'Join' : 'Get Started Free'}</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '140px 5% 80px' : '160px 8% 100px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div className="hero-glow" style={{ top: '10%', left: '-10%', opacity: isDarkMode ? 0.6 : 0.2 }} />
        <div className="hero-glow" style={{ bottom: '10%', right: '-10%', background: 'radial-gradient(circle, rgba(229, 57, 53, 0.1) 0%, transparent 70%)', opacity: isDarkMode ? 0.5 : 0.1 }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${theme.border} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          zIndex: 0
        }}></div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', 
          gap: isMobile ? '60px' : '40px', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{ 
                background: 'rgba(229, 57, 53, 0.1)', 
                color: theme.primary, 
                padding: '8px 16px', 
                borderRadius: '100px', 
                fontSize: '12px', 
                fontWeight: 700,
                marginBottom: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: `1px solid rgba(229, 57, 53, 0.2)`,
                letterSpacing: '1px'
              }}
            >
              <Zap size={14} fill={theme.primary} />
              INTRODUCING INVENTRACK v2.0
            </motion.div>
            
            <h1 style={{ 
              fontSize: isMobile ? '48px' : '96px', 
              fontWeight: 900, 
              lineHeight: 0.95, 
              marginBottom: '32px',
              letterSpacing: '-4px' 
            }}>
              Precision <br /> 
              <span className="text-gradient">Inventory.</span> <br />
              Global Scale.
            </h1>
            
            <p style={{ 
              fontSize: isMobile ? '18px' : '22px', 
              color: theme.subText, 
              maxWidth: '580px', 
              marginBottom: '48px', 
              lineHeight: 1.5,
              fontWeight: 400
            }}>
              The intelligent engine for modern supply chains. Streamline operations, eliminate stockouts, and grow your business with data-driven precision.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Link 
                to={user ? "/dashboard" : "/register"} 
                className="btn-premium"
                style={{ 
                  backgroundColor: theme.primary,
                  color: '#FFF',
                  padding: '18px 40px', 
                  fontSize: '18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  borderRadius: '16px',
                  fontWeight: 800
                }}
              >
                {user ? 'Go to Dashboard' : 'Start Free Trial'} <ArrowRight size={20} />
              </Link>
              <button style={{ 
                background: 'rgba(255,255,255,0.05)',
                color: theme.text,
                padding: '18px 40px', 
                fontSize: '18px', 
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}>
                Book a Demo
              </button>
            </div>

            <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', marginLeft: '10px' }}>
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} style={{ width: '40px', height: '40px', borderRadius: '50%', border: `3px solid ${theme.bg}`, marginLeft: '-12px' }} alt="user" />
                ))}
              </div>
              <p style={{ fontSize: '14px', color: theme.subText }}>
                <span style={{ color: theme.text, fontWeight: 700 }}>2,500+</span> companies joined this week
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="animate-float"
            style={{ perspective: '1000px' }}
          >
            <div style={{
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: isDarkMode 
                ? '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 40px rgba(229, 57, 53, 0.1)' 
                : '0 40px 100px -20px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.border}`,
              background: '#0D0D0D',
              padding: '10px'
            }}>
              <img 
                src="/hero-mockup.png" 
                alt="Dashboard Mockup" 
                style={{ width: '100%', height: 'auto', borderRadius: '22px', display: 'block' }} 
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Marquee Social Proof */}
      <div style={{ 
        padding: '30px 0', 
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
        overflow: 'hidden'
      }}>
        <div className="marquee-container" style={{ position: 'relative', width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            gap: '80px', 
            animation: 'marquee 30s linear infinite', 
            width: 'max-content' 
          }}>
            {['LOGISTIC', 'QUANTUM', 'NEXUS', 'PRIME', 'ORBIT', 'FLOW', 'GALAXY', 'APEX', 'ZENITH', 'VELOCITY'].map((brand, i) => (
              <span key={i} style={{ 
                fontSize: '20px', 
                fontWeight: 900, 
                color: theme.subText, 
                opacity: 0.3,
                letterSpacing: '6px'
              }}>{brand}</span>
            ))}
            {/* Repeat for seamless loop */}
            {['LOGISTIC', 'QUANTUM', 'NEXUS', 'PRIME', 'ORBIT', 'FLOW', 'GALAXY', 'APEX', 'ZENITH', 'VELOCITY'].map((brand, i) => (
              <span key={i + 10} style={{ 
                fontSize: '20px', 
                fontWeight: 900, 
                color: theme.subText, 
                opacity: 0.3,
                letterSpacing: '6px'
              }}>{brand}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" style={{ padding: isMobile ? '100px 5%' : '140px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '24px' }}
          >Hyper-Efficient <span className="text-gradient">Control.</span></motion.h2>
          <p style={{ color: theme.subText, fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>Everything you need to manage complex inventory at the speed of thought.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '32px'
        }}>
          {[
            { 
              title: 'Live Sync Engine', 
              desc: 'Sync stock across 100+ channels in real-time. Zero delays, zero errors.', 
              icon: Zap,
              img: '/feature-tracking.png'
            },
            { 
              title: 'Predictive Analytics', 
              desc: 'AI-driven forecasting helps you buy exactly what you need, exactly when you need it.', 
              icon: BarChart3,
              img: '/feature-analytics.png'
            },
            { 
              title: 'Vault Security', 
              desc: 'Enterprise security standards with multi-factor auth and immutable logs.', 
              icon: ShieldCheck,
              img: '/feature-security.png'
            }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-panel"
              style={{ padding: '32px', overflow: 'hidden' }}
            >
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '14px', 
                backgroundColor: 'rgba(229, 57, 53, 0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px', color: theme.primary
              }}>
                <f.icon size={28} />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>{f.title}</h3>
              <p style={{ color: theme.subText, fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>{f.desc}</p>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                <img src={f.img} alt={f.title} style={{ width: '100%', display: 'block' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions / Workflow */}
      <section id="solutions" style={{ py: '100px', background: isDarkMode ? 'rgba(255,50,50,0.02)' : 'rgba(0,0,0,0.01)', padding: isMobile ? '100px 5%' : '140px 8%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel" style={{ padding: '12px', background: '#0D0D0D' }}>
              <img src="/hero-preview.png" alt="Workflow" style={{ width: '100%', borderRadius: '16px', display: 'block' }} />
            </div>
          </motion.div>

          <div>
            <h2 style={{ fontSize: isMobile ? '36px' : '52px', fontWeight: 900, marginBottom: '32px', letterSpacing: '-2px' }}>
              Streamline from <br /> <span className="text-gradient">Source to Sale.</span>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {[
                { title: 'Ingest Data', desc: 'Connect APIs or upload CSVs. Our engine parses 1,000s of rows in seconds.', icon: Cpu },
                { title: 'Manage Assets', desc: 'Powerful filtering and bulk actions make inventory management effortless.', icon: Layers },
                { title: 'Export Insights', desc: 'Download professional PDF reports and share real-time dashboards.', icon: MousePointer2 }
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  style={{ display: 'flex', gap: '24px' }}
                >
                  <div style={{ 
                    flexShrink: 0, width: '48px', height: '48px', borderRadius: '12px', 
                    border: `1px solid ${theme.border}`, display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', color: theme.primary
                  }}>
                    <s.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h4>
                    <p style={{ color: theme.subText, fontSize: '16px' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: isMobile ? '100px 5%' : '140px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-2px' }}>Scalable <span className="text-gradient">Pricing.</span></h2>
          <p style={{ color: theme.subText, fontSize: '18px' }}>No hidden setup fees. Scale your plan as you grow.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { plan: 'Starter', price: '$0', desc: 'For individuals just starting out.', features: ['Up to 100 SKUs', 'Basic Analytics', '1 User Access'] },
            { plan: 'Professional', price: '$49', desc: 'For growing medium businesses.', features: ['Unlimited SKUs', 'PDF Reports', 'Up to 10 Users', 'Priority Support'], popular: true },
            { plan: 'Enterprise', price: 'Custom', desc: 'For high-volume global corporations.', features: ['API Access', 'SSO & Dedicated IP', '24/7 Phone Support', 'Custom Integrations'] }
          ].map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-panel"
              style={{ 
                padding: '48px 40px', 
                display: 'flex', 
                flexDirection: 'column',
                border: p.popular ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
                position: 'relative',
                background: p.popular ? (isDarkMode ? 'rgba(229,57,53,0.03)' : 'rgba(229,57,53,0.01)') : theme.navBg
              }}
            >
              {p.popular && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: theme.primary, color: '#FFF', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>POPULAR</div>
              )}
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{p.plan}</h3>
              <p style={{ color: theme.subText, fontSize: '14px', marginBottom: '32px' }}>{p.desc}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                <span style={{ fontSize: '48px', fontWeight: 900 }}>{p.price}</span>
                {p.price !== 'Custom' && <span style={{ color: theme.subText }}>/mo</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '40px' }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(229, 57, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={10} color={theme.primary} fill={theme.primary} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button 
                className={p.popular ? "btn-premium" : ""}
                style={{ 
                  width: '100%', padding: '16px', borderRadius: '12px', 
                  backgroundColor: p.popular ? theme.primary : 'transparent',
                  border: p.popular ? 'none' : `1px solid ${theme.text}`,
                  color: p.popular ? '#FFF' : theme.text,
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                {p.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '0 8% 100px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, #D32F2F 100%)`,
            borderRadius: '40px',
            padding: isMobile ? '60px 40px' : '100px',
            textAlign: 'center',
            color: '#FFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px -12px rgba(229, 57, 53, 0.5)'
          }}
        >
          {/* Background pattern for CTA */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <h2 style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: 900, marginBottom: '24px', position: 'relative' }}>Ready to Take <span style={{ color: '#000' }}>Full Control?</span></h2>
          <p style={{ fontSize: '20px', maxWidth: '600px', margin: '0 auto 48px', opacity: 0.9, position: 'relative' }}>Join over 10,000+ businesses optimizing their supply chain with InvenTrack.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', position: 'relative' }}>
            <Link to="/register" style={{ backgroundColor: '#000', color: '#FFF', padding: '20px 48px', borderRadius: '16px', fontSize: '18px', fontWeight: 800 }}>Start Free For 14 Days</Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '100px 8% 60px', borderTop: `1px solid ${theme.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr repeat(3, 1fr)', gap: '60px', marginBottom: '80px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Package size={28} color={theme.primary} />
              <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>InvenTrack</span>
            </div>
            <p style={{ color: theme.subText, fontSize: '16px', maxWidth: '300px', marginBottom: '32px' }}>The next generation of inventory management systems. Built for performance.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[Globe, ExternalLink, Users].map((Icon, i) => (
                <div key={i} style={{ width: '40px', height: '40px', borderRadius: '10px', border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <Icon size={18} color={theme.subText} />
                </div>
              ))}
            </div>
          </div>
          
          {['Platform', 'Resources', 'Company'].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>{col}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Overview', 'Features', 'Pricing', 'Docs', 'Help Center'].map((link) => (
                  <a key={link} href="#" style={{ color: theme.subText, fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', color: theme.subText, fontSize: '14px' }}>
          <p>© 2024 InvenTrack. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '32px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        ::selection {
          background: rgba(229, 57, 53, 0.2);
          color: ${theme.primary};
        }
      `}</style>
    </div>
  );
};

export default Landing;
