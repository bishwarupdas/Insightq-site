import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const FadeInSection = ({ children, delay = 0 }) => {
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
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      ref={domRef}
    >
      {children}
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
    <nav className={`glass ${scrolled ? 'nav-scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '0.85rem 0' : '1.25rem 0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '0.1em' }}>
          InsightQ<span style={{ color: 'var(--secondary)' }}>RAG</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#use-cases" className="nav-link">Use Cases</a>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>Start Building</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="section-padding" style={{ paddingTop: '10rem', paddingBottom: '6rem', backgroundColor: 'var(--white)', overflow: 'hidden' }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative'
      }} className="hero-grid">
        <div style={{ textAlign: 'left', zIndex: 2 }}>
          <FadeInSection>
            <div className="badge">Introducing AskQ Assistant</div>
            <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
              RAG that <span className="text-primary">actually</span> ships.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              InsightQRAG is optimized for Fast, Simple, Cost-Efficient retrieval, so you can ship real features instead of maintaining retrieval plumbing.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started for Free</button>
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Documentation</button>
            </div>
          </FadeInSection>
        </div>
        <div style={{ zIndex: 1 }}>
          <FadeInSection delay={300}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #e2e8f0',
              backgroundColor: '#0f172a'
            }}>
              <img src="/brain.png" alt="InsightQ Brain" style={{ width: '100%', display: 'block' }} />
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { title: 'Fast', desc: 'Millisecond-level retrieval paths for small to medium corpora.', icon: '⚡' },
    { title: 'Simple', desc: 'No mandatory vector database, minimal ops surface, developer-centric APIs.', icon: '🛠️' },
    { title: 'Cost-Efficient', desc: 'Aggressive token control, lean indexing, and infra-light deployment.', icon: '💰' }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((f, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="feature-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ badge, title, subtitle }) => (
  <div style={{ marginBottom: '4rem', maxWidth: '700px' }}>
    <FadeInSection>
      <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        {badge}
      </div>
      <h2 style={{ fontSize: '2.75rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>{subtitle}</p>
    </FadeInSection>
  </div>
);

const About = () => (
  <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <SectionHeader
            badge="What is InsightQRAG"
            title="The retrieval brain for your local assistant."
            subtitle="InsightQRAG is an opinionated, lightweight implementation of Retrieval-Augmented Generation that lets LLMs answer questions using your data without builders building heavyweight retrieval stacks."
          />
          <FadeInSection delay={200}>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              Instead of over-optimizing for massive, web-scale search, InsightQRAG focuses on practical performance, minimal infrastructure, low latency, and rapid iteration loops for teams building real products.
            </p>
            <div style={{
              padding: '1.5rem',
              borderLeft: '4px solid var(--primary)',
              backgroundColor: '#f1f5f9',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0'
            }}>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '1.05rem' }}>
                "For your AskQ assistant, InsightQRAG acts as the retrieval brain: it decides what to read, how much to inject, and how to keep responses grounded."
              </p>
            </div>
          </FadeInSection>
        </div>
        <FadeInSection delay={400}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid #e2e8f0'
          }}>
            <img src="/brain.png" alt="Brain Visualization" style={{ width: '100%', display: 'block' }} />
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

const WhyDifferent = () => (
  <section className="section-padding">
    <div className="container">
      <SectionHeader
        badge="Why we are different"
        title="Designed for product teams, not research labs."
        subtitle="InsightQRAG is designed for teams shipping features, where reliability and speed matter more than paper-perfect recall."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { t: 'Infra-light by design', d: 'No mandatory vector database; works with in-process indices or plug-and-play backends.' },
          { t: 'Fast Setup & Iteration', d: 'Setup in minutes. Retrieval strategy is configuration-driven, no architecture changes needed.' },
          { t: 'Token- and Cost-Aware', d: 'Aggressive context size control and deduplication to avoid paying for irrelevant tokens.' },
          { t: 'Grounding-First', d: 'Focuses on reliability and explainability of answers rather than maximum recall at all costs.' }
        ].map((item, i) => (
          <FadeInSection key={i} delay={i * 100}>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', height: '100%' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{item.t}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.d}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { n: '01', t: 'Lightweight Ingestion', d: 'Supports raw text, markdown, PDFs. Applies pragmatic chunking tuned for LLM context windows.' },
    { n: '02', t: 'Hybrid Representations', d: 'Combines semantic similarity and keyword matching without forcing a heavy indexing layer.' },
    { n: '03', t: 'Relevance-First Retrieval', d: 'Retrieves only high-signal snippets with aggressive filtering to minimize tokens.' },
    { n: '04', t: 'Structured Prompt Injection', d: 'Labels context sources clearly to help the model ground its reasoning and reduce interference.' },
    { n: '05', t: 'Grounded Generation', d: 'Guides the LLM to answer only from retrieved context and acknowledge gaps when necessary.' }
  ];

  return (
    <section id="how-it-works" className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <SectionHeader
          badge="Architecture"
          title="The InsightQRAG Pipeline"
          subtitle="A streamlined workflow that prioritizes precision over noise."
        />
        <div style={{ marginTop: '2rem' }}>
          {steps.map((s, i) => (
            <FadeInSection key={i} delay={i * 50}>
              <div className="step-row">
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.5, width: '40px' }}>{s.n}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{s.t}</h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '700px' }}>{s.d}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhenNotToUse = () => (
  <section className="section-padding" style={{ backgroundColor: '#fff' }}>
    <div className="container">
      <SectionHeader
        badge="Limitations"
        title="When NOT to use InsightQRAG"
        subtitle="We aren't a one-size-fits-all solution. Here is where we might not be the best fit."
      />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {[
          'Corpora with millions of documents or web-scale content.',
          'Enterprise-wide search with strict high-recall requirements.',
          'Advanced ranking needs like Learning-to-Rank or complex graph pipelines.',
          'Regulatory scenarios requiring fully auditable, enterprise data platforms.'
        ].map((item, i) => (
          <FadeInSection key={i} delay={i * 100}>
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#94a3b8' }}>•</span>
              <p style={{ color: 'var(--text-muted)' }}>{item}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const UseCases = () => (
  <section id="use-cases" className="section-padding">
    <div className="container">
      <SectionHeader
        badge="Applications"
        title="Where InsightQRAG Shines"
        subtitle="Best for scenarios where speed, simplicity, and control matter more than scale."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[
          'Internal knowledge assistants',
          'MVPs and product experiments',
          'Documentation and API Q&A',
          'Early-stage SaaS tools',
          'Local / on-device AI setups',
          'Developer utilities and CLI tools'
        ].map((item, i) => (
          <FadeInSection key={i} delay={i * 50}>
            <div className="glass use-case-card">
              <div className="dot"></div>
              <span style={{ fontWeight: 600 }}>{item}</span>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ backgroundColor: 'var(--secondary)', color: 'rgba(255,255,255,0.6)', padding: '5rem 0' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>
          InsightQ<span style={{ color: 'var(--primary)' }}>RAG</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="#" className="footer-link">GitHub</a>
          <a href="#" className="footer-link">Twitter</a>
          <a href="#" className="footer-link">Docs</a>
          <a href="#" className="footer-link">Status</a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 InsightQRAG. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <WhyDifferent />
      <HowItWorks />
      <UseCases />
      <WhenNotToUse />

      <section className="section-padding text-center">
        <div className="container">
          <FadeInSection>
            <div className="glass cta-card">
              <h2 style={{ color: 'var(--white)', fontSize: '3.25rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Ready to ship?</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 3.5rem' }}>
                InsightQRAG is the fastest way to give your LLM applications access to your data without the infra headache.
              </p>
              <button className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--primary)', padding: '1.1rem 3.5rem', fontSize: '1.2rem', borderRadius: 'var(--radius-md)' }}>
                Start for Free
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />

      <style>{`
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.85) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        .nav-link { 
          font-weight: 500; 
          color: var(--text-muted); 
          font-size: 0.95rem;
        }
        .nav-link:hover { color: var(--primary); }
        .footer-link:hover { color: var(--white); }
        html { scroll-behavior: smooth; }
        
        .badge {
          display: inline-block;
          padding: 0.35rem 1rem;
          background-color: #e0e7ff;
          color: var(--primary);
          border-radius: var(--radius-full);
          fontSize: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        
        .feature-card {
           padding: 2.5rem; 
           background: #fff;
           border-radius: var(--radius-lg);
           transition: var(--transition);
           border: 1px solid #e2e8f0;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
        
        .use-case-card {
          padding: 1.5rem 2rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: #fff;
          border: 1px solid #f1f5f9;
        }
        .use-case-card .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary);
        }
        
        .step-row {
          display: flex;
          gap: 3rem;
          padding: 3rem 0;
          border-top: 1px solid #f1f5f9;
          align-items: start;
        }
        
        .cta-card {
          padding: 6rem 2rem;
          border-radius: var(--radius-lg);
          background-color: var(--primary) !important;
          color: var(--white);
          border: none;
        }
        
        /* Animations */
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          visibility: hidden;
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform;
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: none;
          visibility: visible;
        }
        
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-grid > div { text-align: center; }
          .hero-grid div[style*="text-align: left"] { text-align: center !important; }
          .hero-grid .badge { margin-left: auto; margin-right: auto; }
          .hero-grid div[style*="display: flex"] { justify-content: center; }
          
          h1 { font-size: 3.5rem !important; }
        }
        
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .section-padding { padding: 5rem 0; }
          .step-row { gap: 1.5rem; }
          h1 { font-size: 2.75rem !important; }
          h2 { font-size: 2.25rem !important; }
        }
      `}</style>
    </div>
  );
}
