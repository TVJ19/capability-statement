import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Wifi, Activity } from 'lucide-react';

const EVENTS = [
    { type: 'INFO', msg: 'Identity Perimeter: SECURE' },
    { type: 'SUCCESS', msg: 'Auth Token Refreshed: SESSION_ID_994' },
    { type: 'WARNING', msg: 'Latency Spike: 45ms -> Rerouting' },
    { type: 'INFO', msg: 'Scanning Vector: 192.168.0.X' },
    { type: 'SUCCESS', msg: 'Threat Neutralized: SQL_INJECTION_ATTEMPT' },
    { type: 'INFO', msg: 'Entra ID Sync: COMPLETED' },
    { type: 'INFO', msg: 'SailPoint Governance: ACTIVE' },
    { type: 'INFO', msg: 'Pam Session: MONITORING' },
    { type: 'SUCCESS', msg: 'Zero Trust Policy: ENFORCED' },
    { type: 'INFO', msg: 'Network Traffic: NORMAL' },
    { type: 'WARNING', msg: 'Unusual Volume: PORT 443' },
    { type: 'SUCCESS', msg: 'Auto-Scaling: POD_REPLICA_ADDED' },
];

const SentinelTerminal = () => {
    const [logs, setLogs] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        // Initial population
        setLogs(EVENTS.slice(0, 4));

        const interval = setInterval(() => {
            const newEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + "." + Math.floor(Math.random() * 999);

            setLogs(prev => {
                const updated = [...prev, { ...newEvent, time: timestamp, id: Date.now() }];
                if (updated.length > 8) return updated.slice(updated.length - 8); // Keep last 8
                return updated;
            });
        }, 1500 + Math.random() * 2000); // Random interval

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            width: '100%',
            background: '#020617',
            borderTop: '1px solid rgba(34, 211, 238, 0.2)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            padding: '1rem 0',
            color: '#94A3B8',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Header Line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent)'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                {/* Status Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                        <Terminal size={14} color="var(--accent-cyan)" />
                        <span>SENTINEL NODE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
                        <div style={{ width: 6, height: 6, background: 'currentColor', borderRadius: '50%', boxShadow: '0 0 5px currentColor' }} />
                        <span>SYSTEM ONLINE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <Wifi size={12} opacity={0.6} />
                        <Shield size={12} opacity={0.6} />
                        <Activity size={12} opacity={0.6} />
                    </div>
                </div>

                {/* Live Logs */}
                <div style={{ flex: 1, height: '100px', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: '10px' }}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                layout
                                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                            >
                                <span style={{ color: '#475569', minWidth: '90px' }}>[{log.time}]</span>
                                <span style={{
                                    color: log.type === 'SUCCESS' ? 'var(--accent-green)' :
                                        log.type === 'WARNING' ? 'var(--accent-alert)' : 'var(--accent-cyan)',
                                    fontWeight: 700,
                                    minWidth: '80px'
                                }}>
                                    {log.type}
                                </span>
                                <span style={{ color: '#CBD5E1' }}>{log.msg}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SentinelTerminal;
