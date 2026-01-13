import React, { useState, useEffect, useRef } from 'react';
import './index.css';

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
          <a href="#problem" className="nav-link">The Problem</a>
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
          padding: 1.5rem 0;
          transition: var(--transition);
        }
        .nav-scrolled {
          background: rgba(10, 14, 46, 0.82);
          backdrop-filter: blur(20px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.75rem;
          color: white;
        }
        .logo-ai { color: var(--vibrant-orange); }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        .nav-link {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.95rem;
        }
        .nav-link:hover { color: white; }
        .nav-cta {
          padding: 12px 30px;
          font-size: 0.95rem;
        }
      `}</style>
    </nav>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headline = "BEYOND THE BLACK BOX";

  return (
    <section className="hero parallax-container">
      {/* LAYER 1: Background */}
      <div
        className="parallax-layer parallax-bg animate-float"
        style={{
          backgroundImage: 'url("/hero_bg_1768251198637.png")',
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 0.4,
          filter: 'blur(2px)'
        }}
      />

      {/* LAYER 2: Midground */}
      <div
        className="parallax-layer parallax-mid animate-rotate"
        style={{
          backgroundImage: 'url("/hero_mid_1768251213713.png")',
          transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.05}deg)`,
          opacity: 0.6,
          backgroundSize: '60%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />

      {/* LAYER 3: Foreground */}
      <div className="container hero-content">
        <div className="hero-card glass">
          <div className="value-prop-tag animate-slide-up">
            5-7 hop reasoning | Verified provenance | Zero hallucinations
          </div>
          <h1 className="hero-headline">
            {headline.split("").map((char, i) => (
              <span key={i} className="char" style={{ animationDelay: `${i * 50}ms` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="hero-subheadline">
            The Connected Memory Platform That Sees What Traditional AI Cannot
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary">See the Platform in Action</button>
            <button className="btn btn-secondary">Download Technical Brief</button>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow"></div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--hero-gradient);
          color: white;
          text-align: center;
          position: relative;
        }
        .parallax-bg, .parallax-mid {
          background-size: cover;
          background-position: center;
        }
        .hero-content {
          z-index: 10;
          position: relative;
        }
        .hero-card {
          padding: 4rem;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: var(--radius-lg);
        }
        .value-prop-tag {
          color: var(--vibrant-orange);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 2rem;
          font-size: 0.91rem;
        }
        .hero-headline {
          font-size: 6rem;
          line-height: 1;
          margin-bottom: 2rem;
          letter-spacing: -4px;
          text-shadow: 0 4px 60px rgba(255, 107, 53, 0.4);
        }
        .char {
          display: inline-block;
          animation: letter-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          background: var(--navy-orange-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subheadline {
          font-size: 1.75rem;
          color: var(--text-muted);
          max-width: 800px;
          margin: 0 auto 3rem;
          font-weight: 400;
          line-height: 1.4;
        }
        .hero-ctas {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .mouse {
          width: 26px;
          height: 42px;
          border: 2px solid white;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }
        .wheel {
          width: 4px;
          height: 8px;
          background: var(--vibrant-orange);
          border-radius: 2px;
          animation: scroll-wheel 2s infinite;
        }
        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
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
      <style jsx>{`
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

const ActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activities = [
    "Avendus Capital just analyzed a ₹500Cr deal...",
    "Healthcare firm identified 15 at-risk patients...",
    "Logistics giant optimized 6-hop supply chain fragility...",
    "Global law firm verified 23 complex clause dependencies..."
  ];

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
      <style jsx>{`
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

export default function App() {
  return (
    <div className="app">
      <ActivityTicker />
      <Navbar />
      <Hero />
      <TrustBadges />

      {/* SECTION 2: THE PROBLEM */}
      <section id="problem" className="section-padding problem-section">
        <div className="container">
          <div className="problem-grid">
            <div className="problem-visual">
              <FadeInSection>
                <div className="visual-container glass-card">
                  <img src="/problem_viz_1768251234410.png" alt="Strategic Blindness Visualization" className="viz-img" />
                </div>
              </FadeInSection>
            </div>
            <div className="problem-content">
              <FadeInSection delay={200}>
                <h2 className="section-title">The $10 Million Question Traditional AI Can't Answer</h2>
                <div className="problem-cards">
                  <div className="p-card">
                    <span className="p-icon">🔴</span>
                    <div>
                      <h3>Strategic Blindness</h3>
                      <p>Traditional AI treats information as isolated snippets, creating a "black box" that prevents multi-hop reasoning across non-linear dependencies.</p>
                    </div>
                  </div>
                  <div className="p-card">
                    <span className="p-icon">🔴</span>
                    <div>
                      <h3>Trust Gap</h3>
                      <p>No verifiable audit trail for high-stakes decisions. Decision-makers are forced to trust probabilistic guessing in scenarios where being wrong costs millions.</p>
                    </div>
                  </div>
                  <div className="p-card">
                    <span className="p-icon">🔴</span>
                    <div>
                      <h3>Fragmented Reality</h3>
                      <p>Data trapped in silos across departments. The connective tissue between critical business insights simply doesn't exist.</p>
                    </div>
                  </div>
                </div>
                <div className="stats-row">
                  <div className="stat-item">
                    <div className="stat-value">7 hops</div>
                    <div className="stat-label">Max reasoning depth</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">0%</div>
                    <div className="stat-label">Hallucinations</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">85%</div>
                    <div className="stat-label">Faster analysis</div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
        <style jsx>{`
            .problem-section { background: linear-gradient(to bottom, #F5F7FA, #FFFFFF); }
            .problem-grid {
                display: grid;
                grid-template-columns: 1.2fr 1fr;
                gap: 5rem;
                align-items: center;
            }
            .viz-img { width: 100%; border-radius: 12px; }
            .section-title { font-size: 3.5rem; margin-bottom: 3rem; line-height: 1.1; color: var(--deep-navy); }
            .problem-cards { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 4rem; }
            .p-card { display: flex; gap: 1.5rem; }
            .p-card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--vibrant-orange); }
            .p-card p { color: var(--text-main); opacity: 0.8; }
            .stats-row { display: flex; gap: 3rem; border-top: 1px solid #eee; padding-top: 2rem; }
            .stat-value { font-size: 2.5rem; font-weight: 800; color: var(--deep-navy); }
            .stat-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
        `}</style>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section id="solution" className="solution-section parallax-container">
        <div
          className="parallax-layer parallax-bg"
          style={{
            backgroundImage: 'url("/solution_bg_1768251250089.png")',
            opacity: 0.2
          }}
        />
        <div className="container solution-content">
          <FadeInSection className="text-center">
            <h2 className="solution-headline gradient-text">CONNECTED MEMORY</h2>
            <h3 className="solution-subheadline">The Strategic Intelligence Layer</h3>
          </FadeInSection>

          <div className="solution-viz-grid">
            <div className="arch-diag">
              <FadeInSection delay={300}>
                <img src="/arch_diagram_1768251286226.png" alt="Architecture Diagram" className="arch-img" />
              </FadeInSection>
            </div>
            <div className="features-grid">
              <div className="f-card glass-card">
                <div className="f-icon">🌿</div>
                <h3>Multi-Hop Reasoning</h3>
                <p>Navigate 5-7 levels deep through non-linear dependencies. See connections invisible to traditional AI.</p>
              </div>
              <div className="f-card glass-card">
                <div className="f-icon">🔗</div>
                <h3>Deterministic Provenance</h3>
                <p>Every insight traced back to source. Visual audit trail shows the exact logic path.</p>
              </div>
              <div className="f-card glass-card">
                <div className="f-icon">🎯</div>
                <h3>Zero Hallucinations</h3>
                <p>Grounded in explicit facts and verified edges. No probabilistic guessing in high-stakes scenarios.</p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
            .solution-section {
                background: var(--deep-navy);
                color: white;
                padding: 160px 0;
            }
            .solution-headline { font-size: 5rem; margin-bottom: 1rem; }
            .solution-subheadline { font-size: 2rem; color: var(--text-muted); margin-bottom: 6rem; }
            .solution-viz-grid {
                display: grid;
                grid-template-columns: 1.5fr 1fr;
                gap: 4rem;
                align-items: center;
            }
            .arch-img { width: 100%; border-radius: 20px; box-shadow: 0 30px 100px rgba(0,0,0,0.5); }
            .features-grid { display: flex; flex-direction: column; gap: 2rem; }
            .f-card { text-align: left; }
            .f-icon { font-size: 2rem; margin-bottom: 1rem; }
            .f-card h3 { color: var(--vibrant-orange); margin-bottom: 1rem; }
            .f-card p { color: var(--text-muted); }
        `}</style>
      </section>

      {/* SECTION 4: USE CASES */}
      <section id="use-cases" className="use-cases-section">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title white">WHERE THE COST OF BEING WRONG<br />EXCEEDS THE COST OF THE PLATFORM</h2>
          </FadeInSection>

          <div className="use-case-grid">
            {[
              { title: "FINANCIAL SERVICES", badge: "M&A | PE | VC", visual: "/finance_visual_1768251269774.png", headline: "Data Room Audits in Minutes", case: "Analyze target company X. Find if any Board Member is linked through up to 7 levels of offshore holding companies to a sanctioned entity.", output: "✓ Hidden Risk Detected: CEO → LLC A → Trust B → Shell Co C → Sanctioned Entity", metric: "₹2.5Cr ARR per enterprise client" },
              { title: "HEALTHCARE & PHARMA", badge: "Drug Discovery | Clinical Trials", visual: "/healthcare_visual_1768251286226.png", headline: "7-Level Biological Pathways", case: "Find patients taking Drug A who also have Disease B and show Protein B inhibition associated with Disease D in our research notes.", output: "⚠️ 15 High-Risk Patients Identified. 6-hop biological pathway traced.", metric: "Accelerates R&D by 85%" }
            ].map((card, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className="use-case-card glass-card">
                  <div className="uc-visual" style={{ backgroundImage: `url(${card.visual})` }}></div>
                  <div className="uc-badge">{card.badge}</div>
                  <h3>{card.headline}</h3>
                  <div className="uc-case">
                    <code>{card.case}</code>
                  </div>
                  <div className="uc-output">{card.output}</div>
                  <div className="uc-metric">{card.metric}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
        <style jsx>{`
            .use-cases-section { background: var(--deep-navy); padding: 120px 0; color: white; position: relative; }
            .use-cases-section::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
            .white { color: white; text-align: center; }
            .use-case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 3rem; margin-top: 5rem; z-index: 1; position: relative; }
            .use-case-card { height: 650px; display: flex; flex-direction: column; overflow: hidden; position: relative; }
            .use-case-card:hover { transform: perspective(1000px) rotateX(2deg) rotateY(2deg) translateY(-10px); }
            .uc-visual { height: 250px; background-size: cover; background-position: center; border-radius: 12px; margin-bottom: 2rem; }
            .uc-badge { align-self: flex-start; background: var(--accent-gradient); padding: 0.5rem 1.5rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1.5rem; }
            .use-case-card h3 { color: white; margin-bottom: 1.5rem; font-size: 1.75rem; }
            .uc-case { background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
            .uc-case code { color: var(--electric-blue); font-family: monospace; font-size: 0.9rem; }
            .uc-output { color: var(--vibrant-orange); font-weight: 700; margin-bottom: auto; }
            .uc-metric { margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; font-weight: 600; font-size: 1.1rem; }
        `}</style>
      </section>

      {/* SECTION 5: WHY NOT CHATGPT (V1 PATCH) */}
      <section className="comparison-section section-padding">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title">WHY NOT JUST USE CHATGPT?</h2>
            <p className="section-subtitle">The difference between a guess and a proof.</p>
          </FadeInSection>

          <div className="comp-grid">
            <div className="comp-card chatgpt glass-card">
              <div className="comp-header">ChatGPT says:</div>
              <div className="comp-quote">"Based on available information, there may be connections..."</div>
              <ul className="comp-list">
                <li>❌ No sources cited</li>
                <li>❌ Can't verify accuracy</li>
                <li>❌ Risk: $10M bad decision</li>
              </ul>
            </div>
            <div className="comp-vs">VS</div>
            <div className="comp-card insightq glass-card highlighted">
              <div className="comp-header">InsightQ shows:</div>
              <div className="comp-viz">
                {/* Simplified reasoning trail visual */}
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
        <style jsx>{`
            .comparison-section { background: var(--soft-gray); }
            .section-subtitle { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 5rem; font-weight: 500; }
            .comp-grid { display: flex; align-items: center; gap: 2rem; justify-content: center; }
            .comp-card { width: 450px; min-height: 400px; display: flex; flex-direction: column; }
            .highlighted { border: 2px solid var(--vibrant-orange); box-shadow: 0 0 50px rgba(255,107,53,0.2); }
            .comp-header { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; }
            .chatgpt .comp-header { color: #10a37f; }
            .insightq .comp-header { color: var(--deep-navy); }
            .comp-quote { font-style: italic; background: #eee; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; color: #555; }
            .comp-list { list-style: none; padding: 0; }
            .comp-list li { margin-bottom: 1rem; font-weight: 600; font-size: 1.1rem; }
            .comp-vs { font-size: 3rem; font-weight: 900; color: #ddd; }
            .comp-viz { height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
            .trail-nodes { display: flex; gap: 10px; }
            .trail-node { width: 30px; height: 30px; background: var(--vibrant-orange); border-radius: 50%; animation: pulse-node 2s infinite; }
            @keyframes pulse-node { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
            .comp-conclusion { font-size: 2rem; font-weight: 800; margin-top: 5rem; color: var(--deep-navy); }
        `}</style>
      </section>

      {/* SECTION 6: INTERACTIVE DEMO (V1 PATCH) */}
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
        <style jsx>{`
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

      {/* SECTION 7: THE TECHNOLOGY */}
      <section id="technology" className="tech-section section-padding">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title">THE ARCHITECTURE THAT CHANGES EVERYTHING</h2>
          </FadeInSection>

          <div className="tech-blocks">
            <div className="tech-block">
              <div className="tech-visual">
                <FadeInSection>
                  <img src="/tech_graph_cross_section_1768251286226.png" alt="3D Knowledge Graph" className="tech-img" />
                </FadeInSection>
              </div>
              <div className="tech-text">
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
              <div className="tech-text">
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
        <style jsx>{`
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

      {/* SECTION 8: THE FUTURE */}
      <section className="future-section section-padding">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title white">THE FUTURE ISN'T COMING.<br />IT'S ALREADY HERE.</h2>
            <p className="vision-stmt">Imagine an AI that doesn't just assist—it leads your entire product organization.</p>
          </FadeInSection>

          <div className="roadmap-grid">
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
        <style jsx>{`
            .future-section { background: var(--hero-gradient); color: white; position: relative; overflow: hidden; }
            .vision-stmt { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 6rem; max-width: 800px; margin-left: auto; margin-right: auto; }
            .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
            .roadmap-card { text-align: center; }
            .roadmap-card:hover { border-color: var(--vibrant-orange); }
            .r-icon { font-size: 3rem; margin-bottom: 1.5rem; }
            .roadmap-card h3 { color: white; margin-bottom: 1rem; }
            .roadmap-card p { color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem; }
            .r-status { font-weight: 800; color: var(--vibrant-orange); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; }
        `}</style>
      </section>

      {/* SECTION 9: SOCIAL PROOF */}
      <section id="testimonials" className="section-padding testimonials-section">
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
        <style jsx>{`
            .testimonials-section { background: white; }
            .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; margin-top: 5rem; }
            .testi-card { position: relative; padding-top: 4rem; }
            .quote-icon { position: absolute; top: 1rem; left: 2.5rem; font-size: 5rem; color: var(--vibrant-orange); opacity: 0.2; font-family: serif; }
            .testi-quote { font-size: 1.2rem; font-style: italic; margin-bottom: 2rem; color: var(--deep-navy); line-height: 1.6; }
            .testi-author { font-weight: 800; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
            .logo-wall { margin-top: 8rem; text-align: center; }
            .logo-wall-title { font-weight: 700; color: var(--text-muted); margin-bottom: 3rem; letter-spacing: 2px; }
            .logos { display: flex; justify-content: center; gap: 4rem; font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; color: #ccc; opacity: 0.6; flex-wrap: wrap; }
            .logos span:hover { color: var(--deep-navy); opacity: 1; transition: var(--transition); cursor: default; }
        `}</style>
      </section>

      {/* SECTION 10: FOUNDER & TEAM (V1 PATCH) */}
      <section className="team-section section-padding">
        <div className="container">
          <div className="team-layout">
            <div className="founder-card glass-card">
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
            <div className="advisors glass-card">
              <h3>ADVISORY BOARD</h3>
              <ul className="advisor-list">
                <li><span>Ex-CTO</span>, Fintech Giant</li>
                <li><span>Former Partner</span>, Top PE Firm</li>
                <li><span>Chief Data Scientist</span>, global Healthcare Co</li>
              </ul>
            </div>
          </div>
        </div>
        <style jsx>{`
            .team-section { background: #080c26; color: white; }
            .team-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; }
            .founder-card .section-title { color: white; margin-bottom: 3rem; font-size: 2.5rem; }
            .founder-profile { display: flex; gap: 2rem; align-items: center; }
            .founder-img-placeholder { width: 120px; height: 120px; background: var(--accent-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 900; }
            .founder-details h3 { color: white; font-size: 1.8rem; margin-bottom: 0.5rem; }
            .founder-title { color: var(--vibrant-orange); font-weight: 700; margin-bottom: 1rem; }
            .advisors h3 { color: var(--vibrant-orange); margin-bottom: 2rem; font-size: 1.5rem; }
            .advisor-list { list-style: none; padding: 0; }
            .advisor-list li { margin-bottom: 1.5rem; font-size: 1.1rem; border-left: 2px solid var(--electric-blue); padding-left: 1.5rem; }
            .advisor-list span { font-weight: 800; color: white; }
        `}</style>
      </section>

      {/* SECTION 11: FAQ (V1 PATCH) */}
      <section className="faq-section section-padding">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title">ANSWERS TO YOUR BURNING QUESTIONS</h2>
          </FadeInSection>

          <div className="faq-grid">
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
        <style jsx>{`
            .faq-section { background: var(--soft-gray); }
            .faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 5rem; }
            .faq-item h3 { font-size: 1.3rem; margin-bottom: 1rem; color: var(--deep-navy); }
            .faq-item p { color: var(--charcoal); opacity: 0.8; }
        `}</style>
      </section>

      {/* SECTION 12: PRICING (V1 PATCH) */}
      <section id="pricing" className="pricing-section section-padding grid-bg">
        <div className="container">
          <FadeInSection className="text-center">
            <h2 className="section-title white">THE COST OF INACTION IS MEASURABLE</h2>
            <p className="pricing-intro">Select your investment level. All plans include Secured Deployment and Zero-Knowledge Architecture.</p>
          </FadeInSection>

          <div className="pricing-grid">
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
        <style jsx>{`
            .pricing-section { background: var(--deep-navy); color: white; position: relative; }
            .white { color: white !important; }
            .pricing-intro { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 5rem; text-align: center; }
            .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; align-items: stretch; }
            .pricing-card { display: flex; flex-direction: column; text-align: center; padding: 3rem; position: relative; }
            
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

            .roi-calculator { margin-top: 10rem; padding: 5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: white; }
            .roi-header { text-align: center; margin-bottom: 5rem; }
            .roi-header h3 { font-size: 3rem; color: white; margin-bottom: 1rem; }
            .roi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 6rem; align-items: center; }
            .roi-input-group { margin-bottom: 3rem; }
            .roi-input-group label { display: block; margin-bottom: 1.5rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
            .slider { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 5px; appearance: none; outline: none; }
            .slider::-webkit-slider-thumb { appearance: none; width: 24px; height: 24px; background: var(--vibrant-orange); border-radius: 50%; cursor: pointer; border: 4px solid white; }
            .slider-val { margin-top: 1rem; font-size: 1.25rem; font-weight: 800; color: var(--vibrant-orange); }
            .roi-result { background: rgba(255,107,53,0.1); padding: 3rem; border-radius: 20px; text-align: center; border: 1px dashed var(--vibrant-orange); }
            .res-label { font-weight: 700; color: var(--text-muted); margin-bottom: 1rem; }
            .res-value { font-size: 3.5rem; font-weight: 900; color: white; }
            .res-note { margin-top: 1rem; font-size: 0.9rem; opacity: 0.6; }

            @media (max-width: 1024px) {
                .pricing-grid { grid-template-columns: 1fr; gap: 5rem; }
                .enterprise-tier.accented { transform: scale(1); }
            }
          `}</style>
      </section>

      {/* SECTION 13: THE FOOTER & FINAL CTA */}
      <footer className="footer parallax-container">
        <div
          className="parallax-layer parallax-bg"
          style={{
            backgroundImage: 'url("/solution_bg_1768251250089.png")',
            opacity: 0.1
          }}
        />
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
            .footer-cta { text-align: center; padding: 6rem; margin-bottom: 8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); }
            .footer-cta h2 { font-size: 4.5rem; margin-bottom: 1.5rem; font-weight: 900; }
            .footer-cta p { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 3rem; }
            .f-btns { display: flex; gap: 2rem; justify-content: center; }
            .footer-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .footer-brand p { margin-top: 1.5rem; color: var(--text-muted); line-height: 1.6; }
            .footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
            .link-col h4 { color: white; margin-bottom: 2rem; font-size: 1.1rem; }
            .link-col a { display: block; color: var(--text-muted); margin-bottom: 1rem; font-size: 0.95rem; }
            .link-col a:hover { color: var(--vibrant-orange); }
            .footer-bottom { margin-top: 4rem; display: flex; justify-content: space-between; align-items: center; }
            .availability-banner { display: flex; align-items: center; gap: 0.75rem; font-weight: 800; color: var(--vibrant-orange); font-size: 0.85rem; letter-spacing: 1px; }
            .copyright { color: var(--text-muted); font-size: 0.85rem; }
          `}</style>
      </footer>

      <ExitIntentPopup />

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

      <style jsx global>{`
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
