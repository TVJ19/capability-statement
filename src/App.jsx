import React, { useRef, useState, useEffect } from 'react';

import Lenis from 'lenis';
import AuroraBackground from './components/AuroraBackground';
import CustomCursor from './components/CustomCursor';
import BrandLogo from './components/BrandLogo';
import { motion, useScroll, useTransform, useSpring, useTime, useInView } from 'framer-motion';
import {
  Shield, Key, Network, Cpu, Lock, Terminal, Globe,
  Smartphone, Database, Server, Layers, Command, Zap, Cloud, CloudLightning,
  Workflow, Check, AlertTriangle, Play, ChevronDown, Rocket, Users, Activity,
  Briefcase, FileText, LayoutGrid, Search, Smartphone as Phone, RefreshCw
} from 'lucide-react';
import './index.css';

// --- VISUAL COMPONENTS ---

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
          transition={{ delay: i * 0.1, type: "tween", ease: "easeOut", duration: 0.8 }}
          className="glass-card shimmer-border"
          style={{ textAlign: 'center', padding: '2rem' }}
        >
          <div className="hero-text" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{stat.value}</div>
          <div className="mono" style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedArchitecture = () => {
  const time = useTime();
  // Kinetic Class: Floating Physics (Sine Waves) instead of simple rotation
  const y1 = useTransform(time, [0, 4000], [-10, 10], { clamp: false });
  const y2 = useTransform(time, [0, 6000], [10, -10], { clamp: false });
  const rotateSlow = useTransform(time, [0, 120000], [0, 360], { clamp: false }); // Super slow 2min rotation

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* 1. CENTRAL HUB (The Core) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '50%', padding: '2rem', border: '1px solid rgba(15,23,42,0.1)', boxShadow: '0 20px 50px rgba(124,58,237,0.1)' }}
      >
        <BrandLogo brand="CyberArk" size={64} color="var(--text-primary)" />
      </motion.div>

      {/* 2. ORBIT TRACKS (Subtle) */}
      <div style={{ position: 'absolute', inset: '10%', borderRadius: '50%', border: '1px solid rgba(15,23,42,0.05)' }} />
      <div style={{ position: 'absolute', inset: '25%', borderRadius: '50%', border: '1px solid rgba(15,23,42,0.08)' }} />

      {/* 3. CONSTELLATION NODES (Floating Satellites) */}
      <motion.div style={{ position: 'absolute', inset: 0, rotate: rotateSlow }}>

        {/* Node 1: Akeyless (Top) */}
        <motion.div style={{ position: 'absolute', top: '10%', left: '50%', x: '-50%', y: y1 }}>
          <div style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: '1px solid var(--accent-alert)', boxShadow: '0 4px 15px rgba(239,68,68,0.1)' }}>
            <BrandLogo brand="Akeyless" size={32} color="var(--accent-alert)" />
          </div>
          {/* Connection Line */}
          <div style={{ position: 'absolute', top: '100%', left: '50%', width: '1px', height: '100px', background: 'linear-gradient(to bottom, var(--accent-alert), transparent)', opacity: 0.3 }} />
        </motion.div>

        {/* Node 2: StrongDM (Right Bottom) */}
        <motion.div style={{ position: 'absolute', bottom: '20%', right: '15%', y: y2 }}>
          <div style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: '1px solid #34d399', boxShadow: '0 4px 15px rgba(52,211,153,0.1)' }}>
            <BrandLogo brand="StrongDM" size={32} color="#34d399" />
          </div>
        </motion.div>

        {/* Node 3: SailPoint (Left Bottom) */}
        <motion.div style={{ position: 'absolute', bottom: '20%', left: '15%', y: y1 }}>
          <div style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: '1px solid var(--accent-purple)', boxShadow: '0 4px 15px rgba(139,92,246,0.1)' }}>
            <BrandLogo brand="SailPoint" size={32} color="var(--accent-purple)" />
          </div>
        </motion.div>

        {/* Node 4: Cloud Giants (Orbiting outer) */}
        <motion.div style={{ position: 'absolute', top: '50%', left: '0%', x: '-50%' }}>
          <BrandLogo brand="AWS" size={24} color="#64748b" />
        </motion.div>
        <motion.div style={{ position: 'absolute', top: '50%', right: '0%', x: '50%' }}>
          <BrandLogo brand="Azure" size={24} color="#0078D4" />
        </motion.div>

      </motion.div>

      <div className="mono" style={{ position: 'absolute', bottom: '-4rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
        UNIFIED IDENTITY FABRIC
      </div>
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

// GrainOverlay removed for performance stability
// const GrainOverlay = () => ...

const PitchCard = ({ title, subtitle, icon: Icon, color, strategicValue, children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
      className="glass-card spotlight-card"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        padding: '2.5rem',
        marginBottom: '2rem',
        borderLeft: `4px solid ${color}`
      }}
    >
      <div className="spotlight-overlay" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '12px', background: `${color}15`, borderRadius: '12px' }}>
          <Icon size={32} color={color} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1, color: 'var(--text-primary)' }}>{title}</h4>
          <div className="mono" style={{ fontSize: '0.8rem', color: color, marginTop: '4px' }}>{subtitle}</div>
        </div>
      </div>

      {strategicValue && (
        <div style={{ marginBottom: '1.5rem', padding: '0.8rem', background: 'rgba(15,23,42,0.03)', borderRadius: '8px', border: `1px solid ${color}30` }}>
          <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>STRATEGIC VALUE:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{strategicValue}</span>
        </div>
      )}

      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {children}
      </div>
    </motion.div>
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
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(15,23,42,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(15,23,42,0.1)' }}>
            <Icon size={30} color="var(--accent-cyan)" />
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '20px' }}>
            LEVEL 5 MATURITY
          </div>
        </div>

        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>{desc}</p>

        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(15,23,42,0.03)', borderRadius: '12px', borderLeft: '3px solid var(--accent-cyan)' }}>
          <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.3rem' }}>STRATEGIC VALUE</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{strategicValue}</div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
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
      techs: ["AWS", "Azure", "Google Cloud", "Kubernetes"]
    },
    {
      name: "Privileged Defense",
      color: "var(--accent-alert)",
      techs: ["StrongDM", "CyberArk", "Akeyless"]
    },
    {
      name: "Governance Brain",
      color: "var(--accent-purple)",
      techs: ["SailPoint", "Saviynt"]
    },
    {
      name: "Identity Fabric",
      color: "#ec4899",
      techs: ["Microsoft Entra", "Ping Identity", "Okta"]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 10rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '5rem' }}>Strategic Ecosystem.</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {ecosystems.map((eco, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '4rem' }}
          >
            {/* LABEL */}
            <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
              <div className="mono" style={{ color: eco.color, fontSize: '1.2rem', marginBottom: '0.5rem' }}>/// {eco.name}</div>
              <div style={{ height: '1px', width: '100%', background: `linear-gradient(to ${i % 2 === 0 ? 'left' : 'right'}, ${eco.color}, transparent)` }} />
            </div>

            {/* NODES 3D */}
            <div style={{ flex: 2, display: 'flex', gap: '2rem', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', perspective: '1000px' }}>
              {eco.techs.map((t, j) => (
                <motion.div
                  key={j}
                  className="jewel-node"
                  style={{
                    '--glow-color': eco.color,
                    padding: '1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    minWidth: '120px',
                    cursor: 'pointer'
                  }}
                  whileHover={{ rotateX: 10, rotateY: 10 }}
                >
                  <div style={{ filter: `drop-shadow(0 0 10px ${eco.color}60)` }}>
                    <BrandLogo brand={t} size={40} color={['AWS', 'Azure', 'Google Cloud', 'Kubernetes'].includes(t) ? undefined : "var(--text-primary)"} />
                  </div>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const RoadmapTimeline = () => {
  const steps = [
    { year: '2024', title: 'Foundation', desc: 'CyberArk PAM Deployed (Vault Core)', icon: Shield, color: '#F59E0B' },
    { year: '2025', title: 'Bridge', desc: 'StrondDM Zero Trust Network Access', icon: Server, color: '#34d399' },
    { year: '2026', title: 'Zenith', desc: 'Akeyless + SailPoint AI Integration', icon: Rocket, color: 'var(--accent-purple)' },
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
    { year: '2025', title: 'Bridge', desc: 'Secure Access & Identity Fabric', color: '#34d399' },
    { year: '2026', title: 'Zenith', desc: 'Autonomous Identity & AI Governance', color: 'var(--accent-purple)' },
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
          <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: isMobile ? '50px' : '80px', filter: 'grayscale(100%) opacity(0.7)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%) opacity(1)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%) opacity(0.7)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <img
              src={`/logos/${logo}`}
              alt={logo.replace('.png', '')}
              style={{ height: isMobile ? '30px' : '50px', width: 'auto', objectFit: 'contain' }}
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

      {/* --- HERO (Phase A: Authority) --- */}
      <section className="screen-section" style={{ alignItems: 'center', textAlign: 'center', paddingTop: '10vh', minHeight: '90vh' }}>
        <VectorGlobe />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="mono" style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', letterSpacing: '0.3em' }}>
            KR3 INFOSYS // GLOBAL CAPABILITY
          </div>
          <h1 className="hero-text">
            THE IDENTITY<br /> ZEITGEIST.
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
        {/* LEFT: DYNAMIC DIAGRAM (Fixed) */}
        <div className="sticky-visual">
          <div className="glass-card" style={{ width: '100%', maxWidth: '600px', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedArchitecture />
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {phase === 0 && <span style={{ color: 'var(--accent-purple)' }}>The Governance Brain</span>}
                {phase === 1 && <span style={{ color: 'var(--accent-alert)' }}>PAM Defense (Primary)</span>}
                {phase === 2 && <span style={{ color: '#ec4899' }}>Universal Federation</span>}
              </h2>
              <div className="mono" style={{ color: 'var(--text-tertiary)' }}>
                {phase === 0 && "SailPoint AI • Entra ID (Governance)"}
                {phase === 1 && "StrongDM (Access) • Akeyless (Vault)"}
                {phase === 2 && "Ping Identity • SSO • Context"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ENRICHED PITCH CARDS (Phase C: Case Studies) */}
        <div className="scroll-content">

          {/* LAYER 01: GOVERNANCE */}
          <div className="content-block">
            <div className="mono" style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>/// LAYER 01: THE BRAIN</div>
            <p className="text-editorial" style={{ marginBottom: '2rem' }}>
              <strong>The Architect's View:</strong> Identity is only as secure as its governance. We deploy a self-healing brain.
            </p>

            <PitchCard
              title="SailPoint AI"
              subtitle="AUTONOMOUS GOVERNANCE"
              icon={() => <BrandLogo brand="SailPoint" size={32} color="var(--accent-purple)" />}
              color="var(--accent-purple)"
              strategicValue="Reduces audit preparation time by 60% via autonomous certification."
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Technical Superiority:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>AI-driven outlier detection & predictive role mining.</p>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Strategic Outcome:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>Eliminates rubber-stamp fatigue with high-fidelity context.</p>
                </div>
              </div>
            </PitchCard>

            <PitchCard
              title="Entra ID (Azure)"
              subtitle="POLICY DECISION POINT"
              icon={() => <BrandLogo brand="Azure" size={32} color="#0078D4" />}
              color="#0078D4"
              strategicValue="Enables B2B ecosystem scaling with Zero-Trust borders."
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Technical Superiority:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>Real-time Risk-Based Conditional Access & PIM.</p>
                </div>
              </div>
            </PitchCard>
          </div>

          {/* LAYER 02: PAM DEFENSE (The Muscle) */}
          <div className="content-block">
            <div className="mono" style={{ color: 'var(--accent-alert)', marginBottom: '1rem' }}>/// LAYER 02: PAM DEFENSE</div>
            <p className="text-editorial" style={{ marginBottom: '2rem' }}>
              <strong>The Modern PAM Stack:</strong> We decouple "Access" from "Vaulting".
              <br /><strong>StrongDM</strong> is the dynamic front door. <strong>Akeyless</strong> is the distributed vault.
            </p>

            <PitchCard
              title="StrongDM"
              subtitle="PRIMARY PAM (ACCESS)"
              icon={() => <BrandLogo brand="StrongDM" size={32} color="#34d399" />}
              color="#34d399"
              strategicValue="ROI: Onboard engineers in seconds. Zero standing privileges."
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Why it's Primary:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>Legacy PAM is a bottleneck. StrongDM acts as a <strong>Protocol-Aware Proxy</strong> that grants ephemeral, Just-in-Time access to infrastructure without VPNs.</p>
                </div>
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <Check size={16} color="#34d399" /> <strong>True JIT Ephemerality</strong> (Tokens, not creds).
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <Check size={16} color="#34d399" /> <strong>Universal Protocol Support</strong> (K8s, SQL, RDP).
                  </div>
                </div>
              </div>
            </PitchCard>

            <PitchCard
              title="Akeyless Vault"
              subtitle="SECRETS MANAGEMENT"
              icon={() => <BrandLogo brand="Akeyless" size={32} color="var(--accent-alert)" />}
              color="var(--accent-alert)"
              strategicValue="Eliminates 'Secret Zero' vulnerability across 3 Clouds."
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Technical Superiority:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>Distributed Fragments Cryptography (DFC™). A stateless, multi-cloud vault that compliments StrongDM's access layer.</p>
                </div>
              </div>
            </PitchCard>
          </div>

          {/* LAYER 03: FEDERATION */}
          <div className="content-block">
            <div className="mono" style={{ color: '#ec4899', marginBottom: '1rem' }}>/// LAYER 03: UNIVERSAL FEDERATION</div>
            <p className="text-editorial" style={{ marginBottom: '2rem' }}>
              The final mile. Seamless, orchestrated authentication across boundaries.
            </p>

            <PitchCard
              title="Ping Identity"
              subtitle="FEDERATION HUB"
              icon={() => <BrandLogo brand="Ping Identity" size={32} color="#ec4899" />}
              color="#ec4899"
              strategicValue="Seamless SSO that enforces health checks before login."
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Technical Superiority:</strong>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.95rem' }}>OIDC/SAML Orchestration with fine-grained authorization policies.</p>
                </div>
              </div>
            </PitchCard>
          </div>

        </div>
      </div>

      {/* --- SERVICES MATRIX (From KR3_IAM_Capability.html) --- */}
      <ServicesMatrix />

      {/* --- AUTHENTIC LOGO MARQUEE (Level 900) --- */}
      <AuthenticLogoMarquee />

      {/* --- TECH STACK GRID --- */}
      <TechStackGrid />



      // ... existing code ...

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
