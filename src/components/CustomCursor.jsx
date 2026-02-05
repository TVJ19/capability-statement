import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [targetName, setTargetName] = useState('');

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the ring (Trailing effect)
    const ringX = useSpring(mouseX, { stiffness: 400, damping: 28 });
    const ringY = useSpring(mouseY, { stiffness: 400, damping: 28 });

    // Data readout
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setCoords({ x: e.clientX, y: e.clientY });

            // Check hover targets
            const target = e.target;
            const clickable = target.closest('a') || target.closest('button') || target.closest('.glass-card') || target.closest('.jewel-node') || target.closest('.marquee-track');

            if (clickable) {
                setIsHovering(true);
                // Extract semantic name if possible
                setTargetName(clickable.innerText?.slice(0, 10) || clickable.getAttribute('aria-label') || 'TARGET');
            } else {
                setIsHovering(false);
                setTargetName('');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10000 }}>
            {/* 1. THE CORE: Tiny, instant-tracking dot (Precision) */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 4,
                    height: 4,
                    backgroundColor: 'var(--accent-cyan)',
                    borderRadius: '50%',
                    mixBlendMode: 'difference'
                }}
            />

            {/* 2. THE RETICLE: Operator Ring */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 40,
                    height: 40,
                    border: '1px solid var(--accent-cyan)',
                    borderRadius: '50%',
                    opacity: 0.6,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    borderColor: isClicking ? 'var(--accent-alert)' : 'var(--accent-cyan)',
                    rotate: isHovering ? 90 : 0
                }}
                transition={{ duration: 0.2 }}
            />

            {/* 3. DATA READOUT: Live Coordinates (Tech Style) */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: 30, // Offset to right
                    translateY: -20,
                }}
            >
                <div className="mono" style={{
                    fontSize: '0.6rem',
                    color: 'var(--accent-cyan)',
                    whiteSpace: 'nowrap',
                    textShadow: '0 0 5px rgba(34, 211, 238, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    opacity: 0.8
                }}>
                    <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>
                        X:{coords.x} Y:{coords.y}
                    </span>
                    {isHovering && (
                        <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ color: 'var(--accent-alert)', fontWeight: 700 }}
                        >
              // LOCKED: {targetName.toUpperCase()}
                        </motion.span>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CustomCursor;
