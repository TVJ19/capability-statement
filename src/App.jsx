import React, { useRef, useState, useEffect } from 'react';

import Lenis from 'lenis';
import AuroraBackground from './components/AuroraBackground';
import CustomCursor from './components/CustomCursor';
import BrandLogo from './components/BrandLogo';
import { motion, useScroll, useTransform, useSpring, useTime, useInView, useMotionValue } from 'framer-motion';
import {
  Shield, Key, Network, Cpu, Lock, Terminal, Globe,
  Smartphone, Database, Server, Layers, Command, Zap, Cloud, CloudLightning,
  Workflow, Check, AlertTriangle, Play, ChevronDown, Rocket, Users, Activity,
  Briefcase, FileText, LayoutGrid, Search, Smartphone as Phone, RefreshCw,
  Scan
} from 'lucide-react';
import './index.css';

// --- VISUAL COMPONENTS ---

const TacticalGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleMouseMove = (e) => {
      // Performance: Only update if not mobile to save resources
      if (window.innerWidth >= 768) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* 1. Base Grid (Static) */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.4
      }} />

      {/* 2. Tactical Crosshairs (Corners) */}
      {/* Hidden on mobile to reduce visual noise */}
      {!isMobile && (
        <>
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', width: '20px', height: '20px', borderTop: '1px solid rgba(11,29,54,0.3)', borderLeft: '1px solid rgba(11,29,54,0.3)' }} />
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', width: '20px', height: '20px', borderTop: '1px solid rgba(11,29,54,0.3)', borderRight: '1px solid rgba(11,29,54,0.3)' }} />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '20px', height: '20px', borderBottom: '1px solid rgba(11,29,54,0.3)', borderLeft: '1px solid rgba(11,29,54,0.3)' }} />
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', width: '20px', height: '20px', borderBottom: '1px solid rgba(11,29,54,0.3)', borderRight: '1px solid rgba(11,29,54,0.3)' }} />
        </>
      )}

      {/* 3. Parallax Noise Overlay (Subtle) - DISABLED ON MOBILE */}
      {!isMobile && (
        <motion.div
          animate={{ x: -mousePos.x / 50, y: -mousePos.y / 50 }}
          transition={{ type: "tween", ease: "linear", duration: 0 }}
          style={{
            position: 'absolute', inset: '-10%', width: '120%', height: '120%',
            backgroundImage: 'linear-gradient(45deg, rgba(8,145,178,0.03) 25%, transparent 25%, transparent 50%, rgba(8,145,178,0.03) 50%, rgba(8,145,178,0.03) 75%, transparent 75%, transparent)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
            willChange: 'transform' // Performance optimization
          }}
        />
      )}
    </div>
  );
};

// --- REVOLUTIONARY VECTORS: CIPHER TEXT ---
const CipherReveal = ({ text, delay = 0, className, style }) => {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  useEffect(() => {
    if (!started) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Speed of decipher
    }, 30);

    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <motion.div
      className={className}
      style={style}
      whileInView={() => {
        setTimeout(() => setStarted(true), delay * 1000);
      }}
      viewport={{ once: true }}
    >
      {display || text.split('').map(() => characters[Math.floor(Math.random() * characters.length)]).join('')}
    </motion.div>
  );
};

// --- REVOLUTIONARY VECTORS: HOLO GLOBE (WebGL) ---
// Using R3F + Points for a "Threat Map" aesthetic
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const HoloGlobe = (props) => {
  const ref = useRef();
  // Generate 2000 random points on a sphere
  const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#22D3EE"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ThreatMap = () => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative', margin: '0 auto 2rem' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <HoloGlobe />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--accent-cyan)',
        fontSize: '0.7rem',
        fontFamily: 'JetBrains Mono',
        textAlign: 'center',
        textShadow: '0 0 10px var(--accent-cyan)'
      }}>
                /// LIVE THREAT INTEL: ACTIVE
      </div>
    </div>
  )
}


/* OLD VECTOR GLOBE REPLACED BY THREAT MAP
const VectorGlobe = () => {
  const time = useTime();
  const rotateX = useTransform(time, [0, 10000], [0, 360], { clamp: false });
  const rotateY = useTransform(time, [0, 20000], [0, 360], { clamp: false });

  return (
    <div style={{ perspective: '800px', width: '100%', maxWidth: '300px', height: '300px', position: 'relative', margin: '0 auto 2rem' }}>
      <motion.div
        style={{
          width: '100%', height: '100%',
          rotateX, rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={`lat-${i}`} style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            transform: `rotateX(${i * 36}deg)`
          }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={`long-${i}`} style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            transform: `rotateY(${i * 36}deg)`
          }} />
        ))}
        <div style={{ position: 'absolute', inset: '20%', background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(20px)' }} />
      </motion.div>
    </div>
  );
};
*/

const StatsGrid = () => {
  const stats = [
    { label: "Years of Excellence", value: "15+" },
    { label: "Enterprise Clients", value: "500+" },
    { label: "Uptime Guarantee", value: "99.9%" },
    { label: "Expert Support", value: "24/7" },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto 8rem', padding: '0 2rem' }}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.05, type: "tween", ease: "easeOut", duration: 0.5 }}
          className="glass-card shimmer-border"
          style={{ textAlign: 'center', padding: '2rem', background: 'rgba(2, 6, 23, 0.6)', border: '1px solid rgba(34, 211, 238, 0.2)', boxShadow: '0 0 20px rgba(34, 211, 238, 0.05)' }}
        >
          <div className="hero-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '0.5rem', textShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}>{stat.value}</div>
          <div className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const SwissHub = ({ phase }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* 1. THE REACTIVE CORE */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 0 20px rgba(6,182,212,0.1)',
            '0 0 50px rgba(6,182,212,0.3)',
            '0 0 20px rgba(6,182,212,0.1)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(2,6,23, 0.8)', // Dark Void
          border: '1px solid rgba(34, 211, 238, 0.3)', // Cyan Border
          boxShadow: '0 0 40px rgba(34, 211, 238, 0.1)', // Internal Glow
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>UNIFIED CORE</div>

        {/* Trust Anchors (Authentic PNGs) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logos/StrongDM.png" alt="StrongDM" style={{ height: '32px', width: 'auto' }} />
          <div style={{ width: '1px', height: '20px', background: 'rgba(11,29,54,0.2)' }} />
          <img src="/logos/Akeyless.png" alt="Akeyless" style={{ height: '28px', width: 'auto' }} />
        </div>

        {/* Core Status */}
        <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}
          />
          <span className="mono" style={{ fontSize: '0.55rem', color: '#10b981' }}>SYSTEM ACTIVE</span>
        </div>
      </motion.div>

      {/* 2. ROTATING CONTAINMENT RINGS */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', inset: '12%', borderRadius: '50%', border: '1px dashed rgba(6,182,212,0.2)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', inset: '5%', borderRadius: '50%', border: '1px solid rgba(34, 211, 238, 0.1)', borderLeftColor: 'var(--accent-cyan)' }}
      />

      {/* 3. ACTIVE DATA BEAMS (SVG Flow) */}
      <svg style={{ position: 'absolute', inset: '-50%', width: '200%', height: '200%', pointerEvents: 'none', zIndex: 10 }}>
        {/* Beam 1: Governance (Top Right) */}
        <motion.path
          d="M 50% 50% L 90% 20%"
          stroke="var(--accent-purple)"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ opacity: phase === 0 ? 1 : 0.1, strokeDashoffset: [0, -20] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          fill="none"
        />

        {/* Beam 2: PAM (Right) */}
        <motion.path
          d="M 50% 50% L 90% 50%"
          stroke="var(--accent-alert)"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ opacity: phase === 1 ? 1 : 0.1, strokeDashoffset: [0, -20] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          fill="none"
        />

        {/* Beam 3: Federation (Bottom Right) */}
        <motion.path
          d="M 50% 50% L 90% 80%"
          stroke="#ec4899"
          strokeWidth="1"
          strokeDasharray="5,5"
          animate={{ opacity: phase === 2 ? 1 : 0.1, strokeDashoffset: [0, -20] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          fill="none"
        />
      </svg>
    </div>
  );
};

const Typewriter = ({ text, active }) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text, active]);
  return <span>{display}</span>;
}

const ScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

const DossierCard = ({ layer, title, subtitle, logoPath, color, strategicValue, features, children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    // LAYOUT CONTAINER + PERSPECTIVE
    <div style={{ position: 'relative', marginBottom: '4rem', perspective: '1000px' }}>

      {/* 1. COLLIDER OVERLAY (The "Hit Box")
          - Static 2D plane (no transform)
          - Transparent but captures all mouse events
          - Z-Index 50 ensures it stays on top of the tilting card
      */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 50, cursor: 'default' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      />

      {/* 2. VISUAL LAYER (The "Mesh")
          -pointer-events: none ensures mouse passes through to the collider
          - This layer tilts freely without affecting the hit area
          - Z-Index 10 puts it visually inside, but behind the collider
      */}
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 10, pointerEvents: 'none', willChange: 'transform' }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
        className="glass-card"
      >
        <div
          style={{
            padding: '3rem',
            borderLeft: `2px solid ${color}`,
            borderTop: `1px solid ${color}40`, // Tech Bracket top
            background: 'rgba(15, 23, 42, 0.6)', // Dark Glass
            boxShadow: `0 0 30px -10px ${color}20`, // Colored Glow
            transformStyle: 'preserve-3d',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* SCANNING BORDER GRADIENT */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, zIndex: 10, opacity: 0.8 }} />

          {/* HUD CORNER BRACKET (Bottom Right) */}
          <div style={{ position: 'absolute', bottom: '0', right: '0', width: '20px', height: '20px', borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, opacity: 0.5 }} />

          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
            <div>
              <div className="mono" style={{ fontSize: '0.75rem', color: color, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                <ScrambleText text={layer} />
              </div>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2rem', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em', textShadow: `0 0 20px ${color}40` }}>
                {title}
              </h4>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>{subtitle}</div>
            </div>
            {/* Trust Anchor */}
            {logoPath && <img src={logoPath} alt="Partner Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'grayscale(1) invert(1)', mixBlendMode: 'lighten', opacity: 0.9 }} />}
          </div>

          {/* STRATEGIC VALUE (Bold) */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', lineHeight: 1.5, color: 'var(--text-primary)', fontWeight: 400 }}>
              <span style={{ color: color, marginRight: '0.5rem' }}>//</span> "{strategicValue}"
            </p>
          </div>

          {/* TECHNICAL SPECS (Sans) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {features && features.map((f, i) => (
              <div key={i}>
                <strong style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>{f.label}</strong>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{f.value}</span>
              </div>
            ))}
          </div>

          {/* Context */}
          <div style={{ marginTop: '2rem', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CapabilityCard = ({ icon: Icon, title, desc, features, strategicValue, delay }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "tween", ease: "easeOut", duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card spotlight-card"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        height: '100%',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div className="spotlight-overlay" />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(34, 211, 238, 0.2)', boxShadow: '0 0 15px rgba(34, 211, 238, 0.1)' }}>
            <Icon size={30} color="var(--accent-cyan)" />
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '4px', background: 'rgba(34, 211, 238, 0.05)' }}>
            LEVEL 5 MATURITY
          </div>
        </div>

        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem', fontWeight: 300 }}>{desc}</p>

        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(2, 6, 23, 0.5)', borderRadius: '12px', borderLeft: '3px solid var(--accent-cyan)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.3rem' }}>STRATEGIC VALUE</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{strategicValue}</div>
        </div>

        <ul className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none', padding: 0 }}>
          {features.map((f, i) => (
            <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ServicesMatrix = () => {
  const services = [
    {
      icon: Lock, title: "Sovereign Cloud Core",
      desc: "We don't just secure the cloud; we architect a Unified Control Plane that treats AWS, Azure, & GCP as a single sovereign territory.",
      strategicValue: "Eliminates multi-cloud fragmentation risk. One policy, infinite scale.",
      features: ["CNAPP Integration (Prisma/Wiz)", "Kubernetes RBAC Architecture", "Terraform Infrastructure-as-Code", "CSPM Compliance Guardrails"]
    },
    {
      icon: Shield, title: "CyberArk Engineering",
      desc: "Certified Delivery Engineering (CDE) for the entire PAS suite. We operate at the bleeding edge of privileged defense.",
      strategicValue: "ROI: 99.99% Vault Uptime & Zero-Trust Default.",
      features: ["Vault Clustering & DR Strategy", "CPM/PSM Hardening", "Privileged Threat Analytics (PTA)", "Custom Plug-in Development"]
    },
    {
      icon: Zap, title: "StrongDM Access Plane",
      desc: "The hyper-agile operational centerpiece. We deploy StrongDM to eradicate VPNs and grant ephemeral, just-in-time access.",
      strategicValue: "Velocity: Onboard developers in seconds, not days.",
      features: ["Ephemeral JIT Tokens", "Kubernetes Zero Trust Gateway", "Protocol-Aware Audit (SQL/SSH)", "No-VPN Topology"]
    },
    {
      icon: Activity, title: "Autonomous Governance",
      desc: "SailPoint IdentityNow & IIQ implementation that uses AI to predict access needs before users even ask.",
      strategicValue: "Efficiency: Reduces audit preparation time by 60%.",
      features: ["AI-Driven Access Insights", "Predictive Role Mining", "Automated Certification Campains", "Separation of Duties (SoD)"]
    },
    {
      icon: Users, title: "Universal Directory",
      desc: "A borderless identity fabric using Microsoft Entra ID P2 and Ping Identity to federate trust globally.",
      strategicValue: "Security: 100% MFA Coverage & adaptive risk gating.",
      features: ["Privileged Identity Mgmt (PIM)", "Risk-Based Conditional Access", "Verifiable Credentials", "Cross-Tenant Sync"]
    },
    {
      icon: Phone, title: "Zero Trust Endpoint",
      desc: "Microsoft Intune & Defender deployment that ensures every device is a compliant fortress before it touches data.",
      strategicValue: "Compliance: Zero-touch deployment via Autopilot.",
      features: ["Autopilot White Glove", "App Protection (MAM-WE)", "Endpoint Privilege Mgmt", "Attack Surface Reduction"]
    },
    {
      icon: RefreshCw, title: "Frictionless Workflow",
      desc: "Self-healing identity automation. Passwordless auth and bots that handle requests so your helpdesk doesn't have to.",
      strategicValue: " Experience: 90% reduction in L1 tickets.",
      features: ["Passwordless (FIDO2/YubiKey)", "Self-Service Password Reset", "ServiceNow Integration", "User Behavior Analytics"]
    }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>/// STRATEGIC CAPABILITY CORE</div>
        <h2 className="section-title">The Zenith Matrix.</h2>
        <p className="text-editorial" style={{ margin: '0 auto' }}>
          Elite-tier engineering capabilities. We operate at <strong>Level 5 Maturity</strong> across the entire stack.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {services.map((s, i) => (
          <CapabilityCard key={i} {...s} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
};

const TechStackGrid = () => {
  const ecosystems = [
    {
      name: "Sovereignty & Cloud",
      color: "var(--accent-cyan)",
      techs: [
        {
          id: "aws", name: "AWS", role: "Primary Substrate",
          desc: "The backbone of our sovereign execution environment. We leverage AWS Nitro Enclaves for confidential computing and Lambda for event-driven identity orchestration.",
          specs: "EKS / Lambda / Nitro"
        },
        {
          id: "azure", name: "Azure", role: "Hybrid Control",
          desc: "Seamlessly integrated for Entra ID synchronization. Our architecture treats Azure as a native extension of the on-premise trust boundary.",
          specs: "Arc / Entra ID / Sentinel"
        },
        {
          id: "gcp", name: "Google Cloud", role: "Data Analytics",
          desc: "Powering our identity analytics and AI modeling. BigQuery ingests millions of access logs to train our predictive governance models.",
          specs: "BigQuery / Vertex AI"
        },
        {
          id: "k8s", name: "Kubernetes", role: "Orchestration",
          desc: "The universal runtime. Our entire identity fabric involves microservices deployed across multi-cloud K8s clusters for immutable infrastructure.",
          specs: "v1.29 / Helm / Istio"
        }
      ]
    },
    {
      name: "Privileged Defense",
      color: "var(--accent-alert)",
      techs: [
        {
          id: "sdm", name: "StrongDM", role: "Access Plane",
          desc: "The protocol-aware proxy that eliminates VPNs. We use StrongDM to grant ephemeral, just-in-time access to databases and servers without static keys.",
          specs: "Zero Trust / JIT / Audit"
        },
        {
          id: "cyberark", name: "CyberArk", role: "Vault Core",
          desc: "The unbreakable vault. CyberArk secures the 'Keys to the Kingdom', rotating root passwords and API tokens automatically every 60 minutes.",
          specs: "CPM / PSM / Conjur"
        },
        {
          id: "akeyless", name: "Akeyless", role: "Secrets Mgmt",
          desc: "Distributed Fragments Technology (DFC). Akeyless ensures that no single cloud provider ever holds the complete encryption key for our secrets.",
          specs: "DFC / K8s Injection"
        }
      ]
    },
    {
      name: "Governance Brain",
      color: "var(--accent-purple)",
      techs: [
        {
          id: "sailpoint", name: "SailPoint", role: "Identity GRC",
          desc: "The legislative branch of our architecture. SailPoint defines 'Who Should Have Access' and uses AI to detect anomalies in real-time.",
          specs: "IdentityNow / AI / FAM"
        },
        {
          id: "saviynt", name: "Saviynt", role: "Cloud IGA",
          desc: "Granular entitlements management. Saviynt peers deep into SAP and Oracle environments to ensure SoD (Separation of Duties) compliance.",
          specs: "EIC / CPAM / SoD"
        }
      ]
    },
    {
      name: "Identity Fabric",
      color: "#ec4899",
      techs: [
        {
          id: "entra", name: "Microsoft Entra", role: "Auth Source",
          desc: "The primary Identity Provider (IdP). Entra ID handles high-volume authentication with Conditional Access policies that assess risk in 100ms.",
          specs: "P2 / Conditional Access"
        },
        {
          id: "ping", name: "Ping Identity", role: "Federation",
          desc: "The legacy bridge. PingFederate connects modern OIDC apps with legacy SAML/Header-based systems, ensuring no application is left behind.",
          specs: "PingFed / DaVinci"
        },
        {
          id: "okta", name: "Okta", role: "Customer IAM",
          desc: "Frictionless B2C access. Okta powers our external portals, providing passwordless login experiences for partners and customers.",
          specs: "CIAM / Workflows"
        }
      ]
    }
  ];

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 10rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '5rem' }}>Strategic Ecosystem.</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {ecosystems.map((eco, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
              <div className="mono" style={{ color: eco.color, fontSize: '1.2rem', whiteSpace: 'nowrap' }}>/// {eco.name}</div>
              <div style={{ height: '1px', width: '100%', background: `linear-gradient(to right, ${eco.color}, transparent)` }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {eco.techs.map((t, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: j * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    borderTop: `2px solid ${eco.color}`,
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '280px' // Ensure uniform height for neat grid
                  }}
                  whileHover={{ y: -5, boxShadow: `0 0 30px -5px ${eco.color}30` }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <BrandLogo brand={t.name} size={40} color={['AWS', 'Azure', 'Google Cloud', 'Kubernetes'].includes(t.name) ? undefined : "var(--text-primary)"} />
                      <div className="mono" style={{ fontSize: '0.7rem', color: eco.color, border: `1px solid ${eco.color}`, padding: '4px 8px', borderRadius: '4px', background: `${eco.color}10` }}>
                        {t.role}
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {t.desc}
                    </p>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(15,23,42,0.05)' }}>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      <span style={{ color: eco.color }}>spec:</span> {t.specs}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const RoadmapTimeline = () => {
  const steps = [
    { year: '2024', title: 'Foundation', desc: 'CyberArk PAM Deployed (Vault Core)', icon: Shield, color: '#F59E0B' },
    { year: '2025', title: 'Bridge', desc: 'StrongDM Secure Access & Identity Fabric', icon: Server, color: '#34d399' },
    { year: '2026', title: 'Zenith', desc: 'StrongDM, Akeyless & SailPoint Ecosystem', icon: Rocket, color: 'var(--accent-purple)' },
  ];
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 0' }}>
      <h3 className="section-title" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '4rem' }}>Strategic Evolution</h3>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '2rem', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #F59E0B, var(--accent-purple))' }} />
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', cursor: 'pointer' }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ width: '4rem', height: '4rem', background: '#fff', border: `2px solid ${step.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <step.icon size={24} color={step.color} />
            </div>
            <div className="glass-card" style={{ flex: 1, padding: '1.5rem' }}>
              <div className="mono" style={{ color: step.color, fontSize: '0.9rem' }}>{step.year}</div>
              <h4 style={{ fontSize: '1.5rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>{step.title}</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const HolographicLog = () => {
  const [logs, setLogs] = useState([
    { id: 1, source: "SAILPOINT", action: "Identity Analytics", detail: "Risk Score: 85/100 (Elevated)", status: "review", time: "10:42:01" },
    { id: 2, source: "SAILPOINT", action: "Access Review", detail: "Triggering Micro-Certification", status: "processing", time: "10:42:02" },
    { id: 3, source: "MANAGER", action: "Approval", detail: "Justification: 'Release Deployment'", status: "success", time: "10:44:15" },
    { id: 4, source: "AKEYLESS", action: "Secret Injection", detail: "Rotating AWS_ACCESS_KEY (TTL: 5m)", status: "success", time: "10:44:18" },
    { id: 5, source: "STRONGDM", action: "Session Start", detail: "Proxying K8s Traffic (k8s-prod-us-east)", status: "active", time: "10:44:20" },
  ]);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="glass-card" style={{ padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(15,23,42,0.05)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-green)' }} />
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>LIVE GOVERNANCE STREAM</span>
        </div>
        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>enc_v2.0</div>
      </div>

      {/* Log Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%', overflow: 'hidden' }}>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'column' : 'row',
              gridTemplateColumns: '60px 100px 1fr 20px',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? '0.25rem' : '1rem',
              fontSize: '0.85rem',
              padding: '0.75rem',
              borderRadius: '8px',
              background: log.status === 'active' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
              border: log.status === 'active' ? '1px solid rgba(99, 102, 241, 0.2)' : 'none'
            }}
          >
            {isMobile ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.25rem' }}>
                <span className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>{log.time}</span>
                <span className="mono" style={{
                  fontWeight: 600, color:
                    log.source === 'SAILPOINT' ? 'var(--accent-purple)' :
                      log.source === 'AKEYLESS' ? 'var(--accent-alert)' :
                        log.source === 'STRONGDM' ? '#34d399' : 'var(--text-secondary)'
                }}>{log.source}</span>
              </div>
            ) : (
              <>
                <span className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>{log.time}</span>
                <span className="mono" style={{
                  fontWeight: 600, color:
                    log.source === 'SAILPOINT' ? 'var(--accent-purple)' :
                      log.source === 'AKEYLESS' ? 'var(--accent-alert)' :
                        log.source === 'STRONGDM' ? '#34d399' : 'var(--text-secondary)'
                }}>{log.source}</span>
              </>
            )}

            <span style={{ color: 'var(--text-secondary)', width: '100%', whiteSpace: isMobile ? 'normal' : 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <strong>{log.action}:</strong> {log.detail}
            </span>

            {!isMobile && log.status === 'success' && <Check size={14} color="var(--accent-green)" />}
            {!isMobile && log.status === 'active' && <div style={{ width: '6px', height: '6px', background: '#34d399', borderRadius: '50%' }} className="animate-pulse" />}
          </motion.div>
        ))}
      </div>

      {/* Decorative Blur */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, #fff, transparent)', pointerEvents: 'none' }} />
    </div>
  );
};

const SplineRoadmap = () => {
  const steps = [
    { year: '2024', title: 'Foundation', desc: 'CyberArk PAM Deployed (Vault Core)', color: '#F59E0B' },
    { year: '2025', title: 'Bridge', desc: 'StrongDM Secure Access & Identity Fabric', color: '#34d399' },
    { year: '2026', title: 'Zenith', desc: 'StrongDM, Akeyless & SailPoint Ecosystem', color: 'var(--accent-purple)' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 0', position: 'relative' }}>
      <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '6rem' }}>Strategic Evolution.</h3>

      {/* Mobile Fallback / Simple view for now, effectively a cleaner timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', position: 'relative' }}>

        {/* Connection Line (CSS Spline approximation) */}
        <div className="desktop-only" style={{ position: 'absolute', top: '2rem', left: '10%', right: '10%', height: '4px', background: 'linear-gradient(to right, #F59E0B, #34d399, var(--accent-purple))', borderRadius: '4px', opacity: 0.2 }} />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            style={{ position: 'relative', textAlign: 'center' }}
          >
            {/* Dot */}
            <div style={{ width: '16px', height: '16px', background: step.color, borderRadius: '50%', margin: '0 auto 2rem', border: '4px solid #fff', boxShadow: `0 0 0 1px ${step.color}` }} />

            <div className="glass-card spotlight-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <div className="mono" style={{ color: step.color, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.year}</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{step.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AuthenticLogoMarquee = () => {
  const logos = [
    "AWS.png", "Azure.png", "GCP.png", "Kubernetes.png",
    "CyberArk.png", "SailPoint.png", "StrongDM.png", "Akeyless.png",
    "EntraID.png", "Ping.png", "Intune.png"
  ];

  // Duplicate for seamless loop
  const marqueeLogos = [...logos, ...logos];

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden', padding: '4rem 0 8rem', position: 'relative', background: 'transparent' }}>
      <div className="mono" style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>/// THE COMPLETE TRUSTED STACK</div>

      {/* Gradient Fade Masks */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', background: 'linear-gradient(to right, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', background: 'linear-gradient(to left, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />

      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex', gap: isMobile ? '3rem' : '6rem', width: 'fit-content', paddingLeft: isMobile ? '3rem' : '6rem' }}
      >
        {marqueeLogos.map((logo, i) => (
          <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: isMobile ? '50px' : '80px', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.querySelector('img').style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.querySelector('img').style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <img
              src={`/logos/${logo}`}
              alt={logo.replace('.png', '')}
              style={{
                height: isMobile ? '30px' : '50px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'grayscale(1) invert(1)',
                mixBlendMode: 'lighten',
                opacity: 0.7,
                transition: 'opacity 0.3s'
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Adjusted scroll phases due to new length
      if (latest < 0.15) setPhase(0);
      else if (latest < 0.30) setPhase(1);
      else setPhase(2);
    });
  }, [scrollYProgress]);

  return (
    <div style={{ paddingBottom: '20vh', cursor: 'none' }}>
      <CustomCursor />
      {/* <GrainOverlay /> REMOVED FOR PERFORMANCE */}
      <AuroraBackground />
      <TacticalGrid />

      {/* --- HERO (Phase A: Authority) --- */}
      <section className="screen-section" style={{ alignItems: 'center', textAlign: 'center', paddingTop: '10vh', minHeight: '90vh' }}>
        <ThreatMap />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.3em' }}>
            <CipherReveal text="KR3 INFOSYS // GLOBAL CAPABILITY" delay={0.5} />
          </div>
          <h1 className="hero-text">
            <CipherReveal text="THE IDENTITY" delay={1} />
            <br />
            <CipherReveal text="ZEITGEIST." delay={1.5} />
          </h1>
          <p className="text-editorial" style={{ margin: '2rem auto', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            We don't just manage access. We architect the <strong>resilient nervous system</strong> of your digital enterprise.
            <br /><span style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem', marginTop: '1rem', display: 'block' }}>PRECISION • VELOCITY • TRUST</span>
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ marginTop: '2rem' }}
          >
            <ChevronDown color="var(--text-secondary)" size={30} />
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS GRID --- */}
      <section style={{ maxWidth: '800px', margin: '0 auto 8rem', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>/// PROVEN IMPACT</div>
        <p className="text-editorial" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Trusted by the Fortune 500 to secure critical infrastructure.
          We deliver military-grade reliability with the velocity of a startup.
        </p>
      </section>
      <StatsGrid />

      {/* --- STICKY ARCHITECTURE (Phase B: Breadth) --- */}
      <div className="sticky-container">
        {/* LEFT: SWISS ARCHITECTURE HUB */}
        <div className="sticky-visual">
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <SwissHub phase={phase} />

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.2em', marginBottom: '1rem' }}>ACTIVE SIGNAL</div>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>
                {phase === 0 && <span style={{ color: 'var(--accent-purple)' }}>Autonomous Governance</span>}
                {phase === 1 && <span style={{ color: 'var(--accent-alert)' }}>Privileged Defense</span>}
                {phase === 2 && <span style={{ color: '#ec4899' }}>Universal Federation</span>}
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT: ENRICHED PITCH CARDS (Phase C: Case Studies) */}
        <div className="scroll-content">

          {/* LAYER 01: GOVERNANCE */}
          <div className="content-block">
            <DossierCard
              layer="/// LAYER 01: GOVERNANCE"
              title="Identity Brain"
              subtitle="SAILPOINT AI + MICROSOFT ENTRA"
              logoPath="/logos/SailPoint.png"
              color="var(--accent-purple)"
              strategicValue="We deploy a self-healing brain that predicts access needs before users ask, reducing audit prep by 60%."
              features={[
                { label: "Core Engine", value: "SailPoint IdentityNow" },
                { label: "Predictive Logic", value: "AI-Driven Role Mining" },
                { label: "Policy Control", value: "Entra ID Conditional Access" }
              ]}
            >
              <p>Identity is only as secure as its governance. We move you from "Rubber Stamp" approvals to high-fidelity, data-driven decisions.</p>
            </DossierCard>
          </div>

          {/* LAYER 02: PAM DEFENSE */}
          <div className="content-block">
            <DossierCard
              layer="/// LAYER 02: PRIVILEGED DEFENSE"
              title="Zero-Trust PAM"
              subtitle="STRONGDM + AKEYLESS"
              logoPath="/logos/StrongDM.png"
              color="var(--accent-alert)"
              strategicValue="Decoupling Access from Vaulting. We grant ephemeral, just-in-time access to infrastructure without VPNs."
              features={[
                { label: "Access Plane", value: "StrongDM (Protocol Proxy)" },
                { label: "Secret Store", value: "Akeyless (Dist. Vault)" },
                { label: "Velocity", value: "Onboard in < 30s" }
              ]}
            >
              <p>Legacy PAM is a bottleneck. We replace static credentials with ephemeral tokens, eliminating the greatest risk vector in the modern stack: standing privileges.</p>
            </DossierCard>
          </div>

          {/* LAYER 03: FEDERATION */}
          <div className="content-block">
            <DossierCard
              layer="/// LAYER 03: UNIVERSAL FEDERATION"
              title="Universal Directory"
              subtitle="PING IDENTITY + ENTRA ID"
              logoPath="/logos/Ping.png"
              color="#ec4899"
              strategicValue="A borderless identity fabric that federates trust across all clouds, partners, and devices."
              features={[
                { label: "SSO Engine", value: "PingFederate / PingOne" },
                { label: "Context", value: "Risk-Based Auth" },
                { label: "Standards", value: "OIDC / SAML 2.0" }
              ]}
            >
              <p>In a perimeter-less world, Identity is the new firewall. We architect a seamless, single-sign-on experience that follows the user.</p>
            </DossierCard>
          </div>

        </div>
      </div>

      {/* --- SERVICES MATRIX (From KR3_IAM_Capability.html) --- */}
      <ServicesMatrix />

      {/* --- AUTHENTIC LOGO MARQUEE (Level 900) --- */}
      <AuthenticLogoMarquee />

      {/* --- TECH STACK GRID --- */}
      <TechStackGrid />

      {/* --- LIVE WORKFLOW (Phase D: Depth) --- */}
      <section className="screen-section" style={{ flexDirection: 'row', gap: '4rem', minHeight: 'auto', padding: '4rem 2rem 0', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>/// VISUAL INTELLIGENCE</div>
          <h2 className="section-title">The Holographic Log.</h2>
          <p className="text-editorial" style={{ marginBottom: '3rem' }}>
            A real-time window into the <strong>Unified Control Plane</strong>.
            Watch as disparate signals are harmonized into a single, governed workflow.
          </p>
        </div>
        <div style={{ flex: 1.5, minWidth: '300px' }}>
          <HolographicLog />
        </div>
      </section>

      {/* --- ROADMAP (Phase Z: Zenith) --- */}
      <SplineRoadmap />

      {/* --- FOOTER: CALL TO COLLABORATION --- */}
      <section className="screen-section" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>THE NEXT LOGICAL STEP</div>
        <h2 className="section-title" style={{ fontSize: '4rem', marginBottom: '2rem' }}>Let's Architect Together.</h2>
        <p className="text-editorial" style={{ margin: '0 auto 4rem', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
          You don't need another vendor. <br />You need a <strong>Strategic Partner</strong> who understands the stakes.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'var(--text-primary)', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: '2px solid var(--text-primary)',
            color: 'var(--text-primary)',
            padding: '1.5rem 4rem',
            fontSize: '1.2rem',
            borderRadius: '50px',
            cursor: 'none',
            fontFamily: 'Space Grotesk',
            fontWeight: 700
          }}
        >
          INITIATE PARTNERSHIP
        </motion.button>
      </section>

    </div>

  );
};

export default App;
