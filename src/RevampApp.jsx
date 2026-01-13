import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !closed) {
        setShow(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [closed]);

  if (!show) return null;

  return (
    <div className="exit-intent">
      <div className="popup glass-card">
        <button className="close-btn" onClick={() => { setShow(false); setClosed(true); }}>×</button>
        <div className="popup-content">
          <div className="popup-badge">FREE GUIDE</div>
          <h3>"7 Questions Your AI Can't Answer"</h3>
          <p>Learn why traditional RAG systems fail in complex enterprise environments and how "Connected Memory" changes the game.</p>
          <div className="popup-form">
            <input type="email" placeholder="Enter your work email" className="glass-input" />
            <button className="btn btn-primary">Send Me the Guide</button>
          </div>
          <p className="no-spam">No spam. Only high-signal intelligence.</p>
        </div>
      </div>
      <style jsx>{`
        .exit-intent {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(10, 14, 46, 0.8);
          backdrop-filter: blur(5px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .popup {
          max-width: 600px;
          position: relative;
          padding: 4rem !important;
          text-align: center;
          border: 2px solid var(--vibrant-orange) !important;
        }
        .close-btn { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; font-size: 2rem; color: white; cursor: pointer; opacity: 0.5; }
        .close-btn:hover { opacity: 1; }
        .popup-badge { background: var(--vibrant-orange); color: white; padding: 0.4rem 1rem; border-radius: 4px; font-weight: 800; font-size: 0.75rem; display: inline-block; margin-bottom: 2rem; }
        .popup h3 { font-size: 2.5rem; margin-bottom: 1.5rem; color: white; line-height: 1.1; }
        .popup p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 3rem; }
        .popup-form { display: flex; gap: 1rem; flex-direction: column; }
        .glass-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.25rem; border-radius: 8px; color: white; font-size: 1rem; }
        .no-spam { font-size: 0.8rem !important; margin-top: 1.5rem !important; opacity: 0.4 !important; }
      `}</style>
    </div>
  );
};

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      ref={domRef}
    >
      {children}
    </div>
  );
};

const ROICalculator = () => {
  const [dealSize, setDealSize] = useState(100);
  const [riskProb, setRiskProb] = useState(5);
  const [dealsPerYear, setDealsPerYear] = useState(12);

  const lossPrevention = (dealSize * dealsPerYear * (riskProb / 100)).toFixed(1);

  return (
    <div className="roi-calculator glass-card">
      <div className="roi-header">
        <h3>ROI CALCULATOR</h3>
        <p>Quantify the value of preventing a single "Black Box" failure.</p>
      </div>
      <div className="roi-grid">
        <div className="roi-inputs">
          <div className="roi-input-group">
            <label>Average Deal Size (₹ Cr)</label>
            <input
              type="range" min="10" max="1000" step="10"
              value={dealSize}
              onChange={(e) => setDealSize(e.target.value)}
              className="slider"
            />
            <div className="slider-val">₹{dealSize}Cr</div>
          </div>
          <div className="roi-input-group">
            <label>Deals Per Year</label>
            <input
              type="range" min="1" max="100"
              value={dealsPerYear}
              onChange={(e) => setDealsPerYear(e.target.value)}
              className="slider"
            />
            <div className="slider-val">{dealsPerYear}</div>
          </div>
          <div className="roi-input-group">
            <label>Historical Risk Probability (%)</label>
            <input
              type="range" min="1" max="50"
              value={riskProb}
              onChange={(e) => setRiskProb(e.target.value)}
              className="slider"
            />
            <div className="slider-val">{riskProb}%</div>
          </div>
        </div>
        <div className="roi-result">
          <div className="res-label">Estimated Annual Protection</div>
          <div className="res-value">₹{lossPrevention}Cr</div>
          <div className="res-note">Based on prevented high-stakes decision failures.</div>
          <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Download ROI Whitepaper</button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          <span className="logo-main">InsightQ</span>
          <span className="logo-ai">.ai</span>
        </div>
        <div className="nav-links">
          <a href="#problem" className="nav-link">Problem</a>
          <a href="#solution" className="nav-link">Solution</a>
          <a href="#use-cases" className="nav-link">Use Cases</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <button className="btn btn-primary nav-cta">Book Workshop</button>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 2rem 0;
          transition: var(--transition);
        }
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--light-gray);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--charcoal);
        }
        .logo-ai { color: var(--vibrant-orange); }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-link {
          color: var(--soft-gray);
          font-weight: 500;
          font-size: 15px;
        }
        .nav-link:hover { color: var(--charcoal); }
        .nav-cta {
          padding: 10px 24px;
          font-size: 14px;
        }
      `}</style>
    </nav>
  );
};

const Hero = () => {
  const words = ["Your", "AI", "thinks", "it", "knows.", "It's", "just", "guessing."];
  const scrollY = useScrollY();

  return (
    <section className="hero bg-warm parallax-container">
      {/* LAYER 1: Background Grid (Slower) */}
      <div
        className="parallax-layer l1-grid"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      ></div>

      {/* LAYER 2: Floating Tokens (Faster) */}
      <div
        className="parallax-layer l2-tokens"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <div className="token t1"></div>
        <div className="token t2"></div>
        <div className="token t3"></div>
      </div>

      <div className="container hero-content animate-fade-in-up">
        <span className="eyebrow">CONNECTED MEMORY PLATFORM</span>
        <h1 className="huge-headline">
          {words.map((word, i) => (
            <span
              key={i}
              className="word"
              style={{
                animationDelay: `${i * 150}ms`,
                transform: `translateY(${scrollY * (0.02 * (i + 1))}px)`
              }}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <p className="subheadline">
          InsightQ eliminates strategic blindness with verified reasoning that traces 7 levels deep. No hallucinations. Just provable truth.
        </p>
        <button className="btn btn-primary hero-cta">See how it works →</button>

        <div className="trust-line">
          Trusted by M&A teams at Avendus, JM Financial, and ChrysCapital
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding: 160px 0 120px;
          background: white;
          overflow: hidden;
        }
        .l1-grid {
          background-image: radial-gradient(var(--light-gray) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.4;
          z-index: 1;
        }
        .l2-tokens {
          z-index: 2;
          pointer-events: none;
        }
        .token {
          position: absolute;
          background: var(--vibrant-orange);
          filter: blur(40px);
          border-radius: 50%;
          opacity: 0.1;
        }
        .t1 { width: 400px; height: 400px; top: -100px; left: -100px; }
        .t2 { width: 300px; height: 300px; bottom: 10%; right: 10%; background: var(--electric-blue); }
        .t3 { width: 200px; height: 200px; top: 20%; right: 20%; }
        
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .word { display: inline-block; transition: transform 0.1s ease-out; }
        .trust-line { margin-top: 4rem; font-size: 0.9rem; font-weight: 600; color: var(--soft-gray); letter-spacing: 1px; }
      `}</style>
    </section>
  );
};

const TrustBadges = () => {
  const badges = [
    { name: "SOC 2 Type II", detail: "Highest security standards" },
    { name: "ISO 27001", detail: "Global info-sec certification" },
    { name: "GDPR Compliant", detail: "European privacy protection" },
    { name: "Zero-Knowledge", detail: "Your data stays yours" },
    { name: "India/EU/US Residency", detail: "Local data processing" }
  ];

  return (
    <div className="trust-badges">
      <div className="container overflow-hidden">
        <div className="badge-track">
          {[...badges, ...badges].map((badge, i) => (
            <div key={i} className="badge-item glass">
              <span className="badge-name">{badge.name}</span>
              <div className="badge-detail">{badge.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .trust-badges {
          background: #080c26;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 20;
        }
        .overflow-hidden { overflow: hidden; }
        .badge-track {
          display: flex;
          gap: 2.5rem;
          animation: scroll-badges 40s linear infinite;
        }
        .badge-item {
          flex-shrink: 0;
          padding: 1rem 2rem;
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-name {
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 1px;
        }
        .badge-detail {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--vibrant-orange);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 0.85rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .badge-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        .badge-item:hover .badge-detail {
          opacity: 1;
          visibility: visible;
        }
        @keyframes scroll-badges {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const activities = [
  "Avendus Capital just analyzed a ₹500Cr deal...",
  "Healthcare firm identified 15 at-risk patients...",
  "Logistics giant optimized 6-hop supply chain fragility...",
  "Global law firm verified 23 complex clause dependencies..."
];

const ActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="activity-ticker">
      <div className="container">
        <div className="ticker-content">
          <div className="pulse-dot"></div>
          <div className="ticker-wrapper">
            <p key={currentIndex} className="ticker-text animate-slide-up">
              {activities[currentIndex]}
            </p>
          </div>
        </div>
      </div>
      <style>{`
        .activity-ticker {
          background: var(--vibrant-orange);
          color: white;
          padding: 0.6rem 0;
          font-size: 0.88rem;
          font-weight: 700;
          position: relative;
          z-index: 2000;
        }
        .ticker-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px white;
          animation: pulse 1.5s infinite;
        }
        .ticker-wrapper {
          overflow: hidden;
          height: 1.2rem;
          display: flex;
          align-items: center;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Solution = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('solution');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(window.scrollY - section.offsetTop);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="solution" className="solution-parallax parallax-container">
      {/* LAYER 1: Deep background */}
      <div className="parallax-layer l1-bg"></div>

      {/* LAYER 2: Far background (Knowledge Graph) */}
      <div
        className="parallax-layer l2-graph"
        style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.02}deg)` }}
      ></div>

      {/* LAYER 3: Content layer */}
      <div className="container solution-content">
        <FadeInSection className="text-center">
          <span className="eyebrow" style={{ color: '#FF6B35' }}>VERIFIED REASONING</span>
          <h2 className="huge-headline white">The architecture that refuses to guess</h2>
          <p className="subheadline solution-body">
            InsightQ fuses Agentic RAG with Knowledge Graphs to create a deterministic map of truth. Every insight is grounded in explicit facts. Every conclusion traces back through a verifiable chain of reasoning.
          </p>
        </FadeInSection>

        <div className="feature-cards-grid">
          {[
            { icon: "🌐", title: "Multi-Hop Reasoning", desc: "Navigate 5-7 levels deep through non-linear dependencies. See connections invisible to traditional AI." },
            { icon: "🔗", title: "Provenance Trail", desc: "Visual audit trail showing the exact path from question to answer. Every claim, every source, every hop." },
            { icon: "🛡️", title: "Zero Hallucinations", desc: "Grounded in explicit facts and verified edges. If the graph doesn't support it, we don't claim it." }
          ].map((feature, i) => (
            <FadeInSection key={i} delay={i * 150}>
              <div className="feat-card glass-plus">
                <div className="feat-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* LAYER 4: Near foreground (Floating UI Elements) */}
      <div
        className="parallax-layer l4-ui"
        style={{ transform: `translateY(${scrollY * 0.8}px)` }}
      >
        <div className="ui-card-floating c1"></div>
        <div className="ui-card-floating c2"></div>
      </div>

      {/* LAYER 5: Foreground particles */}
      <div className="parallax-layer l5-particles"></div>

      <style>{`
        .solution-parallax {
          background: linear-gradient(180deg, #1a237e 0%, #0d1b3e 100%);
          padding: 160px 0;
          color: white;
          min-height: 120vh;
        }
        .white { color: white; }
        .solution-body {
          margin: 0 auto 80px;
          color: #E5E7EB;
          text-align: center;
        }
        .feature-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
          z-index: 20;
        }
        .feat-card {
          padding: 48px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: transform 0.3s ease;
        }
        .feat-card:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.08); }
        .feat-icon { font-size: 32px; margin-bottom: 24px; }
        .feat-card h4 { color: white; margin-bottom: 16px; font-size: 24px; }
        .feat-card p { color: #D1D5DB; line-height: 1.6; }

        .l1-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
        }
        .l2-graph {
          background: url('/hero_bg_1768251198637.png') no-repeat center;
          background-size: 60%;
          opacity: 0.15;
          z-index: 1;
        }
        .l4-ui { z-index: 30; pointer-events: none; }
        .ui-card-floating {
          position: absolute;
          width: 300px;
          height: 180px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          opacity: 0.6;
        }
        .c1 { top: 20%; left: 5%; transform: rotate(-5deg); }
        .c2 { bottom: 10%; right: 5%; transform: rotate(8deg); }

        @media (max-width: 1024px) {
          .feature-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

const ProductInterface = () => {
  const [activeTab, setActiveTab] = useState('Financial');
  const tabs = ['Financial', 'Healthcare', 'Supply Chain', 'Cybersecurity', 'Legal'];

  return (
    <section id="platform" className="section-padding bg-white">
      <div className="container">
        <FadeInSection className="text-center">
          <span className="eyebrow">THE PLATFORM</span>
          <h2 className="section-title-huge">See the reasoning, <br />not just the answer</h2>
        </FadeInSection>

        <div className="product-showcase">
          <div className="browser-frame">
            <div className="browser-header">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-address">platform.insightq.ai/{activeTab.toLowerCase()}</div>
            </div>
            <div className="browser-content">
              <div className="ui-mockup">
                <div className="sidebar-mock">
                  <div className="sidebar-item active"></div>
                  <div className="sidebar-item"></div>
                  <div className="sidebar-item"></div>
                  <div className="sidebar-bottom"></div>
                </div>
                <div className="main-mock">
                  <div className="search-bar-mock">
                    <span>Ask about your {activeTab} data...</span>
                  </div>
                  <div className="graph-area">
                    <div className="graph-node center-node">
                      <div className="node-label">Entity X</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`graph-line line-${i}`}></div>
                    ))}
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`graph-node sub-node node-${i}`}></div>
                    ))}
                  </div>
                </div>
                <div className="provenance-mock">
                  <div className="prov-header">PROVENANCE TRAIL</div>
                  <div className="prov-list">
                    <div className="prov-item active">
                      <div className="prov-dot"></div>
                      <div className="prov-text">
                        <div className="prov-title">Source: Document A</div>
                        <div className="prov-meta">97% confidence • 7-hop path</div>
                      </div>
                    </div>
                    <div className="prov-item"></div>
                    <div className="prov-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="product-caption">
            "From M&A due diligence to drug discovery, InsightQ adapts to industries where being wrong costs millions."
          </p>
        </div>
      </div>
      <style>{`
        .product-showcase { margin-top: 60px; }
        .browser-frame {
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 40px;
        }
        .browser-header {
          background: #F9FAFB;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #E5E7EB;
        }
        .dots { display: flex; gap: 8px; margin-right: 20px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #FF5F56; }
        .yellow { background: #FFBD2E; }
        .green { background: #27C93F; }
        .browser-address {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 4px 16px;
          font-size: 12px;
          color: #6B7280;
          flex-grow: 1;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
        }
        .ui-mockup { display: grid; grid-template-columns: 200px 1fr 300px; height: 600px; background: #FFFFFF; }
        .sidebar-mock { background: #F3F4F6; padding: 20px; border-right: 1px solid #E5E7EB; display: flex; flex-direction: column; gap: 12px; }
        .sidebar-item { height: 24px; background: #E5E7EB; border-radius: 4px; }
        .sidebar-item.active { background: #FF6B35; opacity: 0.2; }
        .sidebar-bottom { margin-top: auto; height: 40px; background: #E5E7EB; border-radius: 4px; }
        .main-mock { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .search-bar-mock {
          padding: 12px 20px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          color: #9CA3AF;
          font-size: 14px;
        }
        .graph-area { flex-grow: 1; position: relative; display: flex; align-items: center; justify-content: center; }
        .graph-node { width: 60px; height: 60px; background: #FFFFFF; border: 2px solid #FF6B35; border-radius: 50%; z-index: 2; position: relative; }
        .center-node { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #1a1a1a; }
        .sub-node { width: 40px; height: 40px; position: absolute; }
        .node-1 { top: 10%; right: 20%; }
        .node-2 { bottom: 15%; left: 15%; }
        .node-3 { top: 40%; left: 10%; }
        .node-4 { bottom: 30%; right: 5%; }
        .node-5 { top: 15%; left: 30%; }
        .graph-line { position: absolute; background: #FF6B35; opacity: 0.2; height: 2px; transform-origin: left center; z-index: 1; }
        .line-1 { width: 150px; left: 50%; top: 50%; transform: rotate(-30deg); }
        .line-2 { width: 200px; left: 50%; top: 50%; transform: rotate(150deg); }
        .line-3 { width: 180px; left: 50%; top: 50%; transform: rotate(190deg); }
        .line-4 { width: 160px; left: 50%; top: 50%; transform: rotate(15deg); }
        .line-5 { width: 140px; left: 50%; top: 50%; transform: rotate(-120deg); }
        .provenance-mock { background: #FFFFFF; border-left: 1px solid #E5E7EB; padding: 24px; }
        .prov-header { font-size: 12px; font-weight: 800; color: #1a1a1a; margin-bottom: 24px; letter-spacing: 1px; }
        .prov-list { display: flex; flex-direction: column; gap: 16px; }
        .prov-item { height: 60px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; transition: all 0.3s ease; }
        .prov-item.active { border-color: #FF6B35; background: #FFF7F5; display: flex; align-items: center; padding: 0 16px; gap: 12px; }
        .prov-dot { width: 12px; height: 12px; background: #FF6B35; border-radius: 50%; box-shadow: 0 0 10px rgba(255,107,53,0.4); }
        .prov-title { font-size: 12px; font-weight: 700; color: #1a1a1a; }
        .prov-meta { font-size: 10px; color: #6B7280; margin-top: 2px; }
        .product-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 24px; }
        .tab-btn {
          padding: 8px 16px;
          background: #F3F4F6;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #6B7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn.active { background: #1a1a1a; color: #FFFFFF; }
        .product-caption { text-align: center; color: #6B7280; font-size: 16px; font-style: italic; max-width: 600px; margin: 0 auto; }
      `}</style>
    </section>
  );
};

const ProblemSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section id="problem" className="section-padding bg-white parallax-container" ref={sectionRef}>
      {/* LAYER 1: Scanning Beams (Subtle background) */}
      <div
        className="parallax-layer l1-beams"
        style={{ transform: `translateY(${relativeScroll * 0.1}px)` }}
      ></div>

      {/* LAYER 2: Hallucination Markers (Floating) */}
      <div className="parallax-layer l2-hallucinations">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-marker m${i}`}
            style={{ transform: `translateY(${relativeScroll * (0.05 * i)}px)` }}
          >?</div>
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="problem-split">
          <div className="problem-text">
            <FadeInSection>
              <span className="eyebrow">THE $10M PROBLEM</span>
              <h2 className="section-title-huge">Traditional AI is playing telephone <br />with your most critical decisions</h2>
              <div className="problem-body">
                <p>Standard AI treats information as isolated snippets. Ask it to connect the dots 5 steps away, and it starts making things up.</p>
                <p>In M&A due diligence, drug discovery, or supply chain analysis, "probably correct" isn't good enough. The cost of being wrong is measured in tens of millions.</p>
                <p>That's not an AI problem. That's an architecture problem.</p>
              </div>
            </FadeInSection>
          </div>
          <div className="problem-visual">
            <FadeInSection delay={200}>
              <div className="visual-wrapper glass-card">
                <div className="comparison-graphic">
                  <div className="graphic-item standard">
                    <span className="label">Standard AI</span>
                    <div className="nodes-disconnected">
                      <div className="node">?</div>
                      <div className="node">?</div>
                      <div className="node">?</div>
                    </div>
                  </div>
                  <div className="graphic-separator">VS</div>
                  <div className="graphic-item insightq">
                    <span className="label">InsightQ</span>
                    <div className="nodes-connected">
                      <div className="node checked">✓</div>
                      <div className="path"></div>
                      <div className="node checked">✓</div>
                      <div className="path"></div>
                      <div className="node checked">✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        <div className="stats-bar-grid">
          <div className="stat-col">
            <span className="val-red">15-20%</span>
            <p>Hallucination rate</p>
          </div>
          <div className="stat-col">
            <span className="val-red">0 citations</span>
            <p>No source verification</p>
          </div>
          <div className="stat-col">
            <span className="val-red">Black box</span>
            <p>No audit trail for decisions</p>
          </div>
        </div>
      </div>

      <style>{`
        .l1-beams {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 99px,
            rgba(220, 38, 38, 0.03) 100px
          );
          background-size: 100% 100px;
          z-index: 1;
        }
        .h-marker {
          position: absolute;
          font-size: 120px;
          font-weight: 900;
          color: rgba(220, 38, 38, 0.05);
          user-select: none;
        }
        .m1 { top: 10%; left: 5%; }
        .m2 { top: 40%; right: 10%; }
        .m3 { bottom: 20%; left: 15%; }
        .m4 { top: 60%; left: 50%; }

        .problem-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 80px;
        }
        .section-title-huge {
          font-size: 56px;
          margin-bottom: 32px;
        }
        .problem-body p {
          font-size: 20px;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 24px;
          max-width: 560px;
        }
        .visual-wrapper {
          padding: 40px;
          background: rgba(250, 250, 250, 0.5);
        }
        .comparison-graphic { display: flex; flex-direction: column; gap: 32px; }
        .graphic-item { text-align: center; }
        .graphic-item .label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 16px; color: #6B7280; }
        .nodes-disconnected, .nodes-connected { display: flex; justify-content: center; gap: 20px; align-items: center; }
        .node { width: 40px; height: 40px; border-radius: 50%; border: 2px dashed #D1D5DB; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #9CA3AF; }
        .nodes-connected .node { border: 2px solid var(--vibrant-orange); color: var(--vibrant-orange); border-style: solid; background: white; }
        .node.checked { background: rgba(255, 107, 53, 0.1); }
        .path { width: 30px; height: 2px; background: var(--vibrant-orange); }
        .graphic-separator { text-align: center; font-weight: 800; color: #E5E7EB; font-size: 12px; letter-spacing: 2px; }

        .stats-bar-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #E5E7EB;
          padding-top: 48px;
          text-align: center;
        }
        .stat-col span {
          display: block;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .val-red { color: #DC2626; }
        .stat-col p { font-size: 14px; color: #6B7280; line-height: 1.4; }

        @media (max-width: 1024px) {
          .problem-split { grid-template-columns: 1fr; gap: 40px; }
          .section-title-huge { font-size: 42px; }
        }
      `}</style>
    </section >
  );
};

const UseCasesSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section id="use-cases" className="use-cases-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Translucent Industry Icons (Slower) */}
      <div
        className="parallax-layer l1-icons"
        style={{ transform: `translateY(${relativeScroll * -0.15}px)` }}
      >
        <div className="bg-icon i1">💰</div>
        <div className="bg-icon i2">🧬</div>
        <div className="bg-icon i3">🚛</div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeInSection className="text-center">
          <span className="eyebrow">DOMINANCE IN COMPLEXITY</span>
          <h2 className="section-title">WE THRIVE WHERE OTHERS HALLUCINATE</h2>
        </FadeInSection>

        <div className="use-case-list">
          {[
            {
              industry: "FINANCIAL SERVICES",
              scenario: "Analyze target company X. Find if any Board Member is linked through up to 7 levels of offshore holding companies to a sanctioned entity.",
              result: "Hidden Risk Detected: CEO → LLC A → Trust B → Shell Co C → Sanctioned Entity",
              impact: "₹50Cr",
              impactLabel: "LIABILITY AVERTED",
              viz: "finance"
            },
            {
              industry: "HEALTHCARE & PHARMA",
              scenario: "Find patients taking Drug A who also have Disease B and show Protein B inhibition associated with Disease D in our research notes.",
              result: "15 High-Risk Patients Identified. 6-hop biological pathway traced and verified.",
              impact: "85%",
              impactLabel: "FASTER R&D",
              viz: "healthcare"
            },
            {
              industry: "SUPPLY CHAIN",
              scenario: "Identify vulnerability in Tier-4 components sourced from region Y that could be disrupted by specific geopolitical event Z.",
              result: "Alternative path identified 12 weeks before disruption hit competitors.",
              impact: "$10M+",
              impactLabel: "RECOVERY SAVINGS",
              viz: "logistics"
            }
          ].map((item, i) => (
            <FadeInSection key={i} className={`use-case-item ${i % 2 !== 0 ? 'reverse' : ''}`}>
              <div
                className="uc-content"
                style={{ transform: `translateY(${Math.max(0, relativeScroll * 0.03)}px)` }}
              >
                <div className="uc-industry">{item.industry}</div>
                <h3>{item.scenario}</h3>
                <div className="uc-scenario">
                  <code>QUERY: {item.scenario}</code>
                </div>
                <div className="uc-result">
                  <div className="res-tag">RESULT FOUND</div>
                  <div className="res-path">{item.result}</div>
                  <a href="#" className="btn-link">View Provenance Trail →</a>
                </div>
                <div className="uc-impact">
                  <div className="impact-val">{item.impact}</div>
                  <div className="impact-label">{item.impactLabel}</div>
                </div>
              </div>
              <div
                className="uc-viz"
                style={{ transform: `translateY(${Math.max(0, relativeScroll * -0.05)}px)` }}
              >
                <div className={`viz-placeholder ${item.viz}-viz glass-card`}>
                  <div className="viz-node">Entity X</div>
                  <div className="viz-line"></div>
                  <div className="viz-node">Entity Y</div>
                  <div className="viz-line"></div>
                  <div className="viz-node highlight">INSIGHT</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <style>{`
        .use-cases-section { background: white; overflow: hidden; }
        .l1-icons { display: flex; justify-content: space-around; opacity: 0.03; font-size: 15rem; z-index: 1; }
        .use-case-list { margin-top: 80px; display: flex; flex-direction: column; gap: 160px; }
        .use-case-item { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .use-case-item.reverse .uc-content { order: 2; }
        .use-case-item.reverse .uc-viz { order: 1; }
        .uc-industry { color: var(--vibrant-orange); font-weight: 800; font-size: 14px; letter-spacing: 2px; margin-bottom: 24px; }
        .uc-content h3 { font-size: 32px; color: var(--deep-navy); margin-bottom: 32px; line-height: 1.3; }
        .uc-scenario { background: #f9fafb; padding: 24px; border-radius: 8px; margin-bottom: 32px; font-family: monospace; font-size: 14px; border: 1px solid #eee; }
        .res-tag { color: #059669; font-weight: 800; font-size: 12px; margin-bottom: 8px; }
        .res-path { font-size: 18px; margin-bottom: 16px; font-weight: 600; }
        .uc-impact { margin-top: 40px; display: flex; align-items: baseline; gap: 16px; }
        .impact-val { font-size: 48px; font-weight: 900; color: var(--vibrant-orange); }
        .impact-label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .viz-placeholder { background: #080c26; border-radius: 20px; height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; border: none !important; }
        .viz-node { border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 4px; font-size: 12px; }
        .viz-line { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
        .viz-node.highlight { border-color: var(--vibrant-orange); color: var(--vibrant-orange); box-shadow: 0 0 20px rgba(255,107,53,0.3); }
        @media (max-width: 1024px) { .use-case-item { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
};

const WhyWinsSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section className="why-wins section-padding bg-warm parallax-container" ref={sectionRef}>
      <div className="parallax-layer l1-grid-floor" style={{ transform: `perspective(1000px) rotateX(60deg) translateY(${relativeScroll * 0.1}px)` }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeInSection className="text-center">
          <h2 className="section-title">WHY INSIGHTQ WINS</h2>
          <p className="section-subtitle">For $10M+ decisions, proximity to truth is the only metric that matters.</p>
        </FadeInSection>

        <div className="comparison-table glass-card" style={{ transform: `translateY(${relativeScroll * 0.02}px)` }}>
          <div className="table-header">
            <div className="table-col">FEATURE</div>
            <div className="table-col">TRADITIONAL RAG</div>
            <div className="table-col highlight">INSIGHTQ</div>
          </div>
          {[
            { f: "Architecture", t: "Probabilistic (Similarity)", i: "Deterministic (Connected Memory)" },
            { f: "Reasoning Depth", t: "1-2 hops (Snippets)", i: "7+ hops (Deep Graph)" },
            { f: "Hallucination", t: "Frequent (Black Box)", i: "Zero (Verifiable Provenance)" },
            { f: "Auditability", t: "Opaque", i: "Full Reasoning Trail" }
          ].map((row, i) => (
            <div key={i} className="table-row">
              <div className="table-col f-col">{row.f}</div>
              <div className="table-col t-col">{row.t}</div>
              <div className="table-col i-col">{row.i}</div>
            </div>
          ))}
        </div>

        <div className="why-quote" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
          <blockquote>"The difference between a guess and a proof is the difference between a deal closed and a liability incurred."</blockquote>
        </div>
      </div>
      <style>{`
        .why-wins { background: #f9fafb; overflow: hidden; }
        .l1-grid-floor {
          background-image: 
            linear-gradient(rgba(26, 35, 126, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 35, 126, 0.05) 1px, transparent 1px);
          background-size: 100px 100px;
          height: 200%;
          top: -50%;
          z-index: 1;
        }
        .section-subtitle { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 5rem; }
        .comparison-table { overflow: hidden; margin-top: 4rem; background: white; z-index: 10; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .table-header { display: grid; grid-template-columns: 1fr 1fr 1.2fr; background: #080c26; color: white; font-weight: 800; padding: 1.5rem 2rem; font-size: 0.8rem; letter-spacing: 2px; }
        .table-row { display: grid; grid-template-columns: 1fr 1fr 1.2fr; border-bottom: 1px solid #eee; padding: 2rem; transition: var(--transition); }
        .table-row:hover { background: rgba(255,107,53,0.02); }
        .table-col.highlight { color: var(--vibrant-orange); }
        .f-col { font-weight: 700; color: var(--deep-navy); }
        .t-col { color: #999; }
        .i-col { font-weight: 800; color: var(--deep-navy); }
        .why-quote { margin-top: 6rem; text-align: center; }
        .why-quote blockquote { font-size: 2rem; font-style: italic; color: var(--text-muted); max-width: 900px; margin: 0 auto; line-height: 1.4; }
      `}</style>
    </section>
  );
};


{/* SECTION 5: WHY NOT CHATGPT (V1 PATCH) */ }
const ComparisonSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section className="comparison-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Large Comparison Icons (Floating) */}
      <div
        className="parallax-layer l1-vs"
        style={{ transform: `translateY(${relativeScroll * -0.1}px)` }}
      >VS</div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <FadeInSection className="text-center">
          <h2 className="section-title">WHY NOT JUST USE CHATGPT?</h2>
          <p className="section-subtitle">The difference between a guess and a proof.</p>
        </FadeInSection>

        <div className="comp-grid">
          <div className="comp-card chatgpt glass-card" style={{ transform: `translateY(${relativeScroll * 0.05}px)` }}>
            <div className="comp-header">ChatGPT says:</div>
            <div className="comp-quote">"Based on available information, there may be connections..."</div>
            <ul className="comp-list">
              <li>❌ No sources cited</li>
              <li>❌ Can't verify accuracy</li>
              <li>❌ Risk: $10M bad decision</li>
            </ul>
          </div>
          <div className="comp-vs">VS</div>
          <div className="comp-card insightq glass-card highlighted" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
            <div className="comp-header">InsightQ shows:</div>
            <div className="comp-viz">
              <div className="trail-nodes">
                {[1, 2, 3, 4, 5, 6, 7].map(n => <div key={n} className="trail-node"></div>)}
              </div>
            </div>
            <ul className="comp-list">
              <li>✅ 23 source documents linked</li>
              <li>✅ 97% confidence score</li>
              <li>✅ Exportable audit report</li>
            </ul>
          </div>
        </div>
        <p className="text-center comp-conclusion">The difference? One is a guess. One is proof.</p>
      </div>
      <style>{`
        .comparison-section { background: #fcfcfc; overflow: hidden; }
        .l1-vs { position: absolute; font-size: 40rem; font-weight: 900; color: rgba(0,0,0,0.02); left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1; pointer-events: none; }
        .section-subtitle { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 5rem; font-weight: 500; }
        .comp-grid { display: flex; align-items: center; gap: 2rem; justify-content: center; position: relative; z-index: 10; }
        .comp-card { width: 450px; min-height: 400px; display: flex; flex-direction: column; background: white; }
        .highlighted { border: 2px solid var(--vibrant-orange) !important; box-shadow: 0 20px 60px rgba(255,107,53,0.15); }
        .comp-header { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; }
        .chatgpt .comp-header { color: #10a37f; }
        .insightq .comp-header { color: var(--deep-navy); }
        .comp-quote { font-style: italic; background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; color: #555; border: 1px solid #eee; }
        .comp-list { list-style: none; padding: 0; }
        .comp-list li { margin-bottom: 1rem; font-weight: 600; font-size: 1.1rem; color: #374151; }
        .comp-vs { font-size: 3rem; font-weight: 900; color: #eee; }
        .comp-viz { height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
        .trail-nodes { display: flex; gap: 10px; }
        .trail-node { width: 30px; height: 30px; background: var(--vibrant-orange); border-radius: 50%; animation: pulse-node 2s infinite; }
        @keyframes pulse-node { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
        .comp-conclusion { font-size: 2rem; font-weight: 800; margin-top: 5rem; color: var(--deep-navy); }
        @media (max-width: 1024px) { .comp-grid { flex-direction: column; } .comp-vs { display: none; } }
      `}</style>
    </section>
  );
};

{/* SECTION 6: INTERACTIVE DEMO (V1 PATCH) */ }
const InteractiveDemoSection = () => {
  return (
    <section className="demo-section section-padding">
      <div className="container">
        <div className="demo-layout">
          <div className="demo-text">
            <FadeInSection>
              <h2 className="section-title">WATCH THE PLATFORM THINK</h2>
              <p>Experience the "Wow" moment in 30 seconds. See how our Connected Memory Platform navigates 7-hop paths to find insights buried deep in your data.</p>
              <ul className="demo-features">
                <li>✓ Active graph node tracking</li>
                <li>✓ Real-time provenance rendering</li>
                <li>✓ Sub-100ms reasoning</li>
              </ul>
              <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Book Strategic Workshop</button>
            </FadeInSection>
          </div>
          <div className="demo-visual">
            <div className="demo-window glass-card">
              <div className="window-header">
                <div className="dots"><span className="red"></span><span className="yellow"></span><span className="green"></span></div>
                <div className="address">analytics.insightq.ai</div>
              </div>
              <div className="window-body">
                {/* Simulated Graph Animation */}
                <div className="sim-graph">
                  <div className="query-input">Query: "Is Board Member X linked to sanctioned Entity Y?"</div>
                  <div className="sim-steps">
                    <div className="sim-step active">1. RAG retrieved 15 documents...</div>
                    <div className="sim-step">2. Analyzing 7-hop relationship path...</div>
                    <div className="sim-step">3. Verified provenance found via Shell Co C.</div>
                    <div className="sim-step highlight">✓ CONFLICT DETECTED (97% Confidence)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .demo-section { background: white; overflow: hidden; }
        .demo-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: center; }
        .demo-features { list-style: none; padding: 0; margin-top: 2rem; }
        .demo-features li { padding: 0.5rem 0; font-weight: 600; color: var(--deep-navy); }
        .demo-window { padding: 0; border: 1px solid #ddd; box-shadow: 0 40px 100px rgba(0,0,0,0.1); overflow: hidden; }
        .window-header { background: #f1f5f9; padding: 1rem; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
        .dots { display: flex; gap: 8px; margin-right: 2rem; }
        .dots span { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        .address { background: white; padding: 0.25rem 2rem; border-radius: 4px; font-size: 0.8rem; color: #999; flex: 1; text-align: center; }
        .window-body { height: 400px; padding: 2rem; background: #0a0e2e; color: #fff; font-family: monospace; }
        .sim-graph { display: flex; flex-direction: column; gap: 1.5rem; }
        .query-input { color: var(--electric-blue); font-size: 1.1rem; }
        .sim-step { opacity: 0.4; transition: var(--transition); }
        .sim-step.active { opacity: 1; color: var(--vibrant-orange); }
        .sim-step.highlight { color: #27c93f; font-weight: 800; font-size: 1.2rem; margin-top: 1rem; }
      `}</style>
    </section>
  );
};

const TechnologySection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section id="technology" className="tech-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Background Scanning Grid */}
      <div
        className="parallax-layer l1-grid"
        style={{ transform: `translateY(${relativeScroll * 0.1}px)` }}
      ></div>
      <div className="container">
        <FadeInSection className="text-center">
          <h2 className="section-title">THE ARCHITECTURE THAT CHANGES EVERYTHING</h2>
        </FadeInSection>

        <div className="tech-blocks">
          <div className="tech-block">
            <div className="tech-visual">
              <FadeInSection>
                <div
                  className="tech-visual-wrapper"
                  style={{ transform: `translateY(${relativeScroll * 0.05}px)` }}
                >
                  <img src="/tech_graph_cross_section_1768251286226.png" alt="3D Knowledge Graph" className="tech-img" />
                  {/* Overlaying floating elements */}
                  <div className="tech-node-pop" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}></div>
                </div>
              </FadeInSection>
            </div>
            <div className="tech-text" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
              <FadeInSection delay={200}>
                <h3>The Graph That Thinks</h3>
                <p>Unlike traditional vector databases that measure "similarity," our Knowledge Graph creates explicit, deterministic relationships between entities.</p>
                <ul>
                  <li>Multi-dimensional edge types (causal, temporal, hierarchical)</li>
                  <li>Real-time graph updates as new data flows in</li>
                  <li>Bi-directional relationship traversal</li>
                </ul>
                <div className="tech-stats">
                  <div className="t-stat"><span>10M+</span> Nodes</div>
                  <div className="t-stat"><span>&lt;100ms</span> Query</div>
                </div>
              </FadeInSection>
            </div>
          </div>

          <div className="tech-block reverse">
            <div className="tech-visual">
              <FadeInSection>
                <div className="provenance-viz glass-card">
                  <h4>PROVENANCE TRAIL</h4>
                  <div className="trail-steps">
                    <div className="t-step">Document A → Entity X</div>
                    <div className="t-connector"></div>
                    <div className="t-step">Entity X → Relationship Y</div>
                    <div className="t-connector"></div>
                    <div className="t-step highlighted">✓ Verified Logic Path</div>
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="tech-text" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
              <FadeInSection delay={200}>
                <h3>RAG That Refuses to Hallucinate</h3>
                <p>Our Agentic RAG goes beyond simple document retrieval. It actively verifies every claim against the Knowledge Graph before presenting results.</p>
                <ol>
                  <li>Query decomposition into sub-questions</li>
                  <li>Multi-source document retrieval</li>
                  <li>Cross-reference with Knowledge Graph</li>
                  <li>Human-verifiable output</li>
                </ol>
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .tech-section { background: white; position: relative; }
        .tech-section::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(rgba(26, 35, 126, 0.05) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
        .tech-blocks { display: flex; flex-direction: column; gap: 8rem; margin-top: 6rem; z-index: 1; position: relative; }
        .tech-block { display: grid; grid-template-columns: 1.2fr 1fr; gap: 6rem; align-items: center; }
        .tech-block.reverse { grid-template-columns: 1fr 1.2fr; }
        .tech-block.reverse .tech-visual { order: 2; }
        .tech-block.reverse .tech-text { order: 1; }
        .tech-img { width: 100%; border-radius: 20px; box-shadow: var(--shadow-glass); }
        .tech-text h3 { font-size: 2.5rem; margin-bottom: 2rem; color: var(--deep-navy); }
        .tech-text p { font-size: 1.2rem; margin-bottom: 2rem; color: var(--charcoal); opacity: 0.8; }
        .tech-text ul, .tech-text ol { padding-left: 1.5rem; margin-bottom: 2rem; }
        .tech-text li { margin-bottom: 1rem; font-weight: 500; }
        .tech-stats { display: flex; gap: 3rem; }
        .t-stat { font-weight: 700; color: var(--text-muted); }
        .t-stat span { display: block; font-size: 2rem; color: var(--vibrant-orange); }
        .provenance-viz { background: var(--deep-navy); color: white; padding: 3rem; text-align: center; }
        .trail-steps { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-top: 2rem; }
        .t-step { padding: 1rem 2rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; width: 100%; }
        .t-step.highlighted { background: var(--accent-gradient); border: none; font-weight: 800; }
        .t-connector { width: 2px; height: 30px; background: rgba(255,255,255,0.1); }
      `}</style>
    </section>
  );
};

const FutureSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section className="future-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Abstract Data Flows */}
      <div
        className="parallax-layer l1-data-flow"
        style={{ transform: `translateY(${relativeScroll * 0.15}px)` }}
      ></div>
      <div className="container">
        <FadeInSection className="text-center">
          <h2 className="section-title white">THE FUTURE ISN'T COMING.<br />IT'S ALREADY HERE.</h2>
          <p className="vision-stmt">Imagine an AI that doesn't just assist—it leads your entire product organization.</p>
        </FadeInSection>

        <div className="roadmap-grid" style={{ transform: `translateY(${relativeScroll * 0.03}px)` }}>
          {[
            { title: "Dynamic Roadmaps", desc: "Talk to Your Roadmap. AI-powered risk analysis updates priorities in real-time.", date: "Coming Q2 2025", icon: "🗺️" },
            { title: "Dynamic Presentations", desc: "Avatar-Led Pitch Decks. Choose audience, AI generates and presents automatically.", date: "Coming Q3 2025", icon: "🎙️" },
            { title: "Research & Funnels", desc: "Automated Market Strategy. AI sculpts sales/marketing funnels from market intelligence.", date: "Coming Q4 2025", icon: "🌪️" },
            { title: "No-Code Widgets", desc: "Build AI Features Without Code. Empower product teams to innovate effortlessly.", date: "2026", icon: "🏗️" }
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 200}>
              <div className="roadmap-card glass-card">
                <div className="r-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="r-status">{item.date}</div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <style>{`
        .future-section { background: var(--hero-gradient); color: white; position: relative; overflow: hidden; }
        .l1-data-flow {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          background-size: 80px 80px;
          height: 200%;
          top: -50%;
          z-index: 1;
        }
        .vision-stmt { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 6rem; max-width: 800px; margin-left: auto; margin-right: auto; position: relative; z-index: 10; }
        .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; position: relative; z-index: 10; }
        .roadmap-card { text-align: center; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
        .roadmap-card:hover { border-color: var(--vibrant-orange); }
        .r-icon { font-size: 3rem; margin-bottom: 1.5rem; }
        .roadmap-card h3 { color: white; margin-bottom: 1rem; }
        .roadmap-card p { color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem; }
        .r-status { font-weight: 800; color: var(--vibrant-orange); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; }
      `}</style>
    </section>
  );
};

const TestimonialsSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section id="testimonials" className="section-padding testimonials-section parallax-container" ref={sectionRef}>
      {/* LAYER 1: Large Quote Mark Drift */}
      <div
        className="parallax-layer l1-quotes"
        style={{ transform: `translateY(${relativeScroll * -0.1}px)` }}
      >“</div>
      <div className="container">
        <FadeInSection className="text-center">
          <h2 className="section-title">TRUSTED BY DECISION-MAKERS<br />WHERE MILLIONS ARE AT STAKE</h2>
        </FadeInSection>

        <div className="testimonial-grid">
          {[
            { quote: "InsightQ found a 7-hop conflict of interest our entire M&A team missed. That single discovery saved us from a ₹50 crore liability.", author: "Managing Director, Leading PE Firm, Mumbai" },
            { quote: "In drug discovery, hallucinations aren't just wrong—they're deadly. InsightQ's provenance gives us the confidence to move fast.", author: "Chief Clinical Officer, Biotech Unicorn" },
            { quote: "We identified supply chain fragility 6 hops deep that would have cost us €10M in delays. InsightQ paid for itself in week one.", author: "VP Supply Chain, Global Logistics Giant" }
          ].map((t, i) => (
            <FadeInSection key={i} delay={i * 200}>
              <div className="testi-card glass-card">
                <div className="quote-icon">“</div>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-author">{t.author}</div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <div className="logo-wall">
          <p className="logo-wall-title">LEADING FIRMS TRUST OUR INTELLIGENCE</p>
          <div className="logos">
            <span>Maersk</span><span>Deloitte</span><span>PwC India</span><span>FedEx</span><span>Avendus</span>
          </div>
        </div>
      </div>
      <style>{`
        .testimonials-section { background: white; overflow: hidden; }
        .l1-quotes { position: absolute; font-size: 50rem; font-family: serif; color: rgba(255,107,53,0.02); left: -10%; top: -10%; z-index: 1; pointer-events: none; }
        .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; margin-top: 5rem; position: relative; z-index: 10; }
        .testi-card { position: relative; padding-top: 4rem; background: white; }
        .quote-icon { position: absolute; top: 1rem; left: 2.5rem; font-size: 5rem; color: var(--vibrant-orange); opacity: 0.2; font-family: serif; }
        .testi-quote { font-size: 1.2rem; font-style: italic; margin-bottom: 2rem; color: var(--deep-navy); line-height: 1.6; }
        .testi-author { font-weight: 800; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .logo-wall { margin-top: 8rem; text-align: center; position: relative; z-index: 10; }
        .logo-wall-title { font-weight: 700; color: var(--text-muted); margin-bottom: 3rem; letter-spacing: 2px; }
        .logos { display: flex; justify-content: center; gap: 4rem; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; color: #ccc; opacity: 0.6; flex-wrap: wrap; }
        .logos span:hover { color: var(--deep-navy); opacity: 1; transition: var(--transition); cursor: default; }
      `}</style>
    </section>
  );
};

const TeamSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section className="team-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Navy Grid Background */}
      <div
        className="parallax-layer l1-navy-grid"
        style={{ transform: `translateY(${relativeScroll * 0.1}px)` }}
      ></div>
      <div className="container">
        <div className="team-layout">
          <div className="founder-card glass-card" style={{ transform: `translateY(${relativeScroll * 0.05}px)` }}>
            <div className="founder-info">
              <h2 className="section-title">BUILT BY PEOPLE WHO'VE BEEN IN YOUR SHOES</h2>
              <div className="founder-profile">
                <div className="founder-img-placeholder">BD</div>
                <div className="founder-details">
                  <h3>Bishwarup Das</h3>
                  <p className="founder-title">Founder & Visionary</p>
                  <p>Ex-[Company], 10+ Years in Product Intelligence. Patents pending on Connected Memory architecture.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="advisors glass-card" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
            <h3>ADVISORY BOARD</h3>
            <ul className="advisor-list">
              <li><span>Ex-CTO</span>, Fintech Giant</li>
              <li><span>Former Partner</span>, Top PE Firm</li>
              <li><span>Chief Data Scientist</span>, global Healthcare Co</li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .team-section { background: #080c26; color: white; overflow: hidden; }
        .l1-navy-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          height: 150%;
          top: -25%;
          z-index: 1;
        }
        .team-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; position: relative; z-index: 10; }
        .founder-card .section-title { color: white; margin-bottom: 3rem; font-size: 2.5rem; }
        .founder-profile { display: flex; gap: 2rem; align-items: center; }
        .founder-img-placeholder { width: 120px; height: 120px; background: var(--accent-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 900; }
        .founder-details h3 { color: white; font-size: 1.8rem; margin-bottom: 0.5rem; }
        .founder-title { color: var(--vibrant-orange); font-weight: 700; margin-bottom: 1rem; }
        .advisors h3 { color: var(--vibrant-orange); margin-bottom: 2rem; font-size: 1.5rem; }
        .advisor-list { list-style: none; padding: 0; }
        .advisor-list li { margin-bottom: 1.5rem; font-size: 1.1rem; border-left: 2px solid var(--electric-blue); padding-left: 1.5rem; }
        .advisor-list span { font-weight: 800; color: white; }
        @media (max-width: 1024px) { .team-layout { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

const FAQSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section className="faq-section section-padding parallax-container" ref={sectionRef}>
      {/* LAYER 1: Subtle Grid Background */}
      <div
        className="parallax-layer l1-grid-light"
        style={{ transform: `translateY(${relativeScroll * 0.05}px)` }}
      ></div>
      <div className="container">
        <FadeInSection className="text-center">
          <h2 className="section-title">ANSWERS TO YOUR BURNING QUESTIONS</h2>
        </FadeInSection>

        <div className="faq-grid" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
          {[
            { q: "How long does implementation take?", a: "2-4 weeks pilot. Our integration team handles the heavy lifting to ensure zero disruption to your workflow." },
            { q: "Do we need to migrate existing data?", a: "No, we connect via secure APIs. Our platform sits on top of your existing data infrastructure." },
            { q: "What if our data is highly sensitive?", a: "We offer on-premise deployment and zero-knowledge architecture. Your raw data never leaves your VPC." },
            { q: "How does pricing scale?", a: "Unlike seat-based software, we scale based on protected revenue and deal volume. Aligned incentives." }
          ].map((faq, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="faq-item glass-card">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <style>{`
        .faq-section { background: var(--soft-gray); overflow: hidden; }
        .l1-grid-light {
          background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
          background-size: 60px 60px;
          height: 150%;
          top: -25%;
          z-index: 1;
        }
        .faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 5rem; position: relative; z-index: 10; }
        .faq-item h3 { font-size: 1.3rem; margin-bottom: 1rem; color: var(--deep-navy); }
        .faq-item p { color: var(--charcoal); opacity: 0.8; }
        @media (max-width: 768px) { .faq-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

const PricingSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <section id="pricing" className="pricing-section section-padding grid-bg parallax-container" ref={sectionRef}>
      {/* LAYER 1: Navy Flow Background */}
      <div
        className="parallax-layer l1-navy-flow"
        style={{ transform: `translateY(${relativeScroll * 0.1}px)` }}
      ></div>
      <div className="container">
        <FadeInSection className="text-center">
          <h2 className="section-title white">THE COST OF INACTION IS MEASURABLE</h2>
          <p className="pricing-intro">Select your investment level. All plans include Secured Deployment and Zero-Knowledge Architecture.</p>
        </FadeInSection>

        <div className="pricing-grid" style={{ transform: `translateY(${relativeScroll * -0.05}px)` }}>
          <FadeInSection delay={200}>
            <div className="pricing-card glass-card poc-tier">
              <div className="p-header">
                <h3>PROOF OF CONCEPT</h3>
                <div className="p-price">₹15L - ₹60L</div>
                <div className="p-period">($20k - $75k)</div>
              </div>
              <p className="p-desc">Perfect for single high-impact deal validation or 3-month limited deployment.</p>
              <ul className="p-features">
                <li>✓ 1 Enterprise Entity</li>
                <li>✓ Up to 5 reasoning hops</li>
                <li>✓ Standard RAG integration</li>
                <li>✓ Dedicated integration support</li>
              </ul>
              <button className="btn btn-secondary white-border">Start Pilot Program</button>
            </div>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="pricing-card glass-card enterprise-tier accented">
              <div className="popular-badge">MOST POPULAR</div>
              <div className="p-header">
                <h3>ENTERPRISE PLATFORM</h3>
                <div className="p-price">₹1Cr - ₹2.5Cr+</div>
                <div className="p-period">ARR ($120k - $300k+)</div>
              </div>
              <p className="p-desc">Full platform access with unlimited users and custom integrations.</p>
              <ul className="p-features">
                <li>✓ Unlimited Entities</li>
                <li>✓ 7+ reasoning hops</li>
                <li>✓ Agentic RAG Engine</li>
                <li>✓ 24/7 Priority Support</li>
              </ul>
              <button className="btn btn-primary">Schedule Enterprise Demo</button>
            </div>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="pricing-card success-tier">
              <div className="p-header">
                <h3>SUCCESS FEES</h3>
                <div className="p-price">Tied to ROI</div>
                <div className="p-period">Performance-based</div>
              </div>
              <p className="p-desc">Aligned incentives for multi-million dollar high-stakes deal closures.</p>
              <ul className="p-features">
                <li>✓ One-time payouts</li>
                <li>✓ Risk-sharing model</li>
                <li>✓ Custom arrangements</li>
                <li>✓ Deal-specific logic</li>
              </ul>
              <button className="btn btn-secondary white-border">Discuss Custom Terms</button>
            </div>
          </FadeInSection>
        </div>

        <ROICalculator />
      </div>
      <style>{`
        .pricing-section { background: var(--deep-navy); color: white; position: relative; overflow: hidden; }
        .l1-navy-flow {
          background-image: linear-gradient(rgba(33, 150, 243, 0.05) 1px, transparent 1px);
          background-size: 100% 40px;
          height: 200%;
          top: -50%;
          z-index: 1;
        }
        .white { color: white !important; }
        .pricing-intro { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 5rem; text-align: center; position: relative; z-index: 10; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; align-items: stretch; position: relative; z-index: 10; }
        .pricing-card { display: flex; flex-direction: column; text-align: center; padding: 3rem; position: relative; background: rgba(255,255,255,0.02); }
        
        .poc-tier { border: 1px solid var(--vibrant-orange) !important; }
        
        .enterprise-tier.accented { 
            background: rgba(255,255,255,0.08);
            border: 2px solid var(--electric-blue) !important;
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 0 50px rgba(33, 150, 243, 0.3);
        }
        .popular-badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--electric-blue);
            color: white;
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 1px;
        }
        
        .success-tier {
            background: var(--accent-gradient);
            border-radius: var(--radius-lg);
            color: white;
        }
        .success-tier h3, .success-tier .p-price, .success-tier .p-period, .success-tier .p-desc, .success-tier .p-features li {
            color: white !important;
        }
        .success-tier .p-features li { border-bottom-color: rgba(255,255,255,0.2); }
        .success-tier .btn-secondary { border-color: white; color: white; }
        .success-tier .btn-secondary:hover { background: white; color: var(--vibrant-orange); }

        .p-header { margin-bottom: 2rem; }
        .p-header h3 { font-size: 1.1rem; font-weight: 800; color: var(--vibrant-orange); margin-bottom: 1rem; }
        .p-price { font-size: 2.8rem; font-weight: 900; color: white; margin-bottom: 0.5rem; }
        .p-period { font-weight: 600; color: var(--text-muted); }
        .p-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2rem; min-height: 3rem; }
        .p-features { list-style: none; padding: 0; margin-bottom: auto; text-align: left; }
        .p-features li { padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 500; font-size: 0.9rem; color: var(--text-muted); }
        
        .btn-secondary.white-border { border-color: rgba(255,255,255,0.3); color: white; }
        .btn-secondary.white-border:hover { border-color: white; background: white; color: var(--deep-navy); }

        @media (max-width: 1024px) {
            .pricing-grid { grid-template-columns: 1fr; gap: 5rem; }
            .enterprise-tier.accented { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

const FooterSection = () => {
  const scrollY = useScrollY();
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const relativeScroll = scrollY - offset;

  return (
    <footer className="footer parallax-container" ref={sectionRef}>
      <div
        className="parallax-layer parallax-bg"
        style={{
          backgroundImage: 'url("/solution_bg_1768251250089.png")',
          opacity: 0.05,
          transform: `translateY(${relativeScroll * 0.1}px)`
        }}
      />
      {/* LAYER 2: Abstract Particles */}
      <div
        className="parallax-layer l2-particles"
        style={{ transform: `translateY(${relativeScroll * -0.15}px)` }}
      ></div>
      <div className="container footer-content">
        <div className="footer-cta glass-card">
          <h2>READY TO SEE WHAT YOU'VE BEEN MISSING?</h2>
          <p>Join the 15+ Enterprise Pilots currently deploying Connected Memory.</p>
          <div className="f-btns">
            <button className="btn btn-primary">Apply for Pilot Program</button>
            <button className="btn btn-secondary">Talk to an Architect</button>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-main">InsightQ</span>
              <span className="logo-ai">.ai</span>
            </div>
            <p>The Strategic Intelligence Layer for the Connected Enterprise.</p>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4>Platform</h4>
              <a href="#solution">Solution</a>
              <a href="#technology">Technology</a>
              <a href="#use-cases">Use Cases</a>
            </div>
            <div className="link-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="availability-banner">
            <span className="pulse-dot"></span>
            PILOT PROGRAM: 4 SLOTS REMAINING FOR Q1 2025
          </div>
          <div className="copyright">© 2025 InsightQ.ai. All rights reserved.</div>
        </div>
      </div>
      <style jsx>{`
        .footer { background: #080c26; color: white; padding: 120px 0 60px; position: relative; overflow: hidden; }
        .footer::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }
        .l2-particles {
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 100px 100px;
          height: 150%;
          top: -25%;
          opacity: 0.1;
          z-index: 2;
        }
        .footer-cta { text-align: center; padding: 6rem; margin-bottom: 8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); position: relative; z-index: 10; }
        .footer-cta h2 { font-size: 4.5rem; margin-bottom: 1.5rem; font-weight: 900; }
        .footer-cta p { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 3rem; }
        .f-btns { display: flex; gap: 2rem; justify-content: center; }
        .footer-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 10; }
        .footer-brand p { margin-top: 1.5rem; color: var(--text-muted); line-height: 1.6; }
        .footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .link-col h4 { color: white; margin-bottom: 2rem; font-size: 1.1rem; }
        .link-col a { display: block; color: var(--text-muted); margin-bottom: 1rem; font-size: 0.95rem; }
        .link-col a:hover { color: var(--vibrant-orange); }
        .footer-bottom { margin-top: 4rem; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 10; }
        .availability-banner { display: flex; align-items: center; gap: 0.75rem; font-weight: 800; color: var(--vibrant-orange); font-size: 0.85rem; letter-spacing: 1px; }
        .copyright { color: var(--text-muted); font-size: 0.85rem; }
      `}</style>
    </footer>
  );
};


const MobileStickyCTA = () => {
  return (
    <div className="mobile-sticky-cta">
      <button className="btn btn-primary">Book Workshop</button>
      <style jsx>{`
        .mobile-sticky-cta {
          position: fixed;
          bottom: 0;
          width: 100%;
          padding: 1rem 2rem;
          background: rgba(10, 14, 46, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: none;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-sticky-cta button { width: 100%; border-radius: 8px; font-size: 1rem; }
        @media (max-width: 768px) { .mobile-sticky-cta { display: block; } }
      `}</style>
    </div>
  );
};

export default function RevampApp() {
  return (
    <div className="app">
      <ActivityTicker />
      <Navbar />
      <Hero />
      <TrustBadges />
      <ProblemSection />
      <Solution />
      <ProductInterface />
      <UseCasesSection />
      <ComparisonSection />
      <InteractiveDemoSection />
      <WhyWinsSection />
      <TechnologySection />
      <FutureSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <PricingSection />
      <FooterSection />

      <ExitIntentPopup />
      <MobileStickyCTA />

      <style>{`
        .animate-slide-up {
          animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes letter-reveal {
          from { opacity: 0; transform: translateY(30px) scale(0.9); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
