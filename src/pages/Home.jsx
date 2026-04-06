import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: '🛡️', title: 'Bank-Grade Security', desc: 'Military-level encryption protecting every transaction and personal detail.' },
    { icon: '🤖', title: 'AI-Powered Insights', desc: 'Machine learning analyzes your spending patterns and predicts future trends.' },
    { icon: '⚡', title: 'Instant Transfers', desc: 'Send money globally in seconds with zero hidden fees.' },
    { icon: '📊', title: 'Smart Analytics', desc: 'Real-time charts and insights to keep your finances on track.' },
    { icon: '💳', title: 'Virtual Cards', desc: 'Generate virtual cards for safer online shopping instantly.' },
    { icon: '🌍', title: 'Global Access', desc: 'Access your account from anywhere, anytime, on any device.' },
  ];

  const stats = [
    { value: '2M+', label: 'Active Users' },
    { value: '$50B+', label: 'Transactions Processed' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '150+', label: 'Countries Supported' },
  ];

  return (
    <div className="home-page">
      {/* Animated background grid */}
      <div className="home-grid-bg" style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
      }} />

      {/* Floating orbs */}
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />
      <div className="home-orb home-orb-3" />

      {/* Navbar */}
      <nav className={`home-nav ${isVisible ? 'home-nav--visible' : ''}`}>
        <div className="home-nav__logo">
          <div className="home-nav__logo-icon">
            <span>💳</span>
          </div>
          <span className="home-nav__logo-text">NexaBank</span>
        </div>
        <div className="home-nav__links">
          <a href="#features" className="home-nav__link">Features</a>
          <a href="#stats" className="home-nav__link">About</a>
          <Link to="/login" className="home-nav__btn home-nav__btn--outline">Sign In</Link>
          <Link to="/register" className="home-nav__btn home-nav__btn--solid">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`home-hero ${isVisible ? 'home-hero--visible' : ''}`}>
        <div className="home-hero__badge">
          <span className="home-hero__badge-dot" />
          AI-Powered Banking for the Future
        </div>
        <h1 className="home-hero__title">
          Your Money,<br />
          <span className="home-hero__title-gradient">Smarter Than Ever</span>
        </h1>
        <p className="home-hero__subtitle">
          Experience next-generation banking powered by artificial intelligence. 
          Manage, grow, and protect your wealth with precision and ease.
        </p>
        <div className="home-hero__actions">
          <Link to="/register" className="home-hero__cta home-hero__cta--primary">
            <span>Open Free Account</span>
            <span className="home-hero__cta-arrow">→</span>
          </Link>
          <Link to="/login" className="home-hero__cta home-hero__cta--secondary">
            Sign In to Dashboard
          </Link>
        </div>

        {/* Hero card mockup */}
        <div className="home-hero__mockup">
          <div className="home-mockup-card">
            <div className="home-mockup-card__chip" />
            <div className="home-mockup-card__brand">NEXA</div>
            <div className="home-mockup-card__number">**** **** **** 4821</div>
            <div className="home-mockup-card__info">
              <div>
                <div className="home-mockup-card__label">Card Holder</div>
                <div className="home-mockup-card__value">John Nexus</div>
              </div>
              <div>
                <div className="home-mockup-card__label">Expires</div>
                <div className="home-mockup-card__value">12/28</div>
              </div>
            </div>
          </div>
          {/* Floating stats on mockup */}
          <div className="home-mockup-stat home-mockup-stat--1">
            <span className="home-mockup-stat__icon">💰</span>
            <div>
              <div className="home-mockup-stat__label">Balance</div>
              <div className="home-mockup-stat__value">$84,250</div>
            </div>
          </div>
          <div className="home-mockup-stat home-mockup-stat--2">
            <span className="home-mockup-stat__icon">📈</span>
            <div>
              <div className="home-mockup-stat__label">Monthly Growth</div>
              <div className="home-mockup-stat__value">+12.4%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="home-stats">
        <div className="home-stats__grid">
          {stats.map((s, i) => (
            <div key={i} className="home-stats__item">
              <div className="home-stats__value">{s.value}</div>
              <div className="home-stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="home-features">
        <div className="home-section-header">
          <div className="home-section-badge">Why NexaBank</div>
          <h2 className="home-section-title">Everything You Need,<br />Nothing You Don't</h2>
          <p className="home-section-subtitle">Built for people who take their finances seriously.</p>
        </div>
        <div className="home-features__grid">
          {features.map((f, i) => (
            <div key={i} className="home-feature-card" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="home-feature-card__icon">{f.icon}</div>
              <h3 className="home-feature-card__title">{f.title}</h3>
              <p className="home-feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="home-cta-section__inner">
          <h2 className="home-cta-section__title">Ready to Transform Your Finances?</h2>
          <p className="home-cta-section__subtitle">Join over 2 million people who trust NexaBank with their financial future.</p>
          <Link to="/register" className="home-hero__cta home-hero__cta--primary" style={{ margin: '0 auto', display: 'inline-flex' }}>
            <span>Get Started — It's Free</span>
            <span className="home-hero__cta-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-nav__logo">
          <div className="home-nav__logo-icon"><span>💳</span></div>
          <span className="home-nav__logo-text">NexaBank</span>
        </div>
        <p className="home-footer__copy">© 2025 NexaBank. All rights reserved. Your money is protected.</p>
      </footer>
    </div>
  );
};

export default Home;
