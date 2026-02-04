import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorRef = useRef(null);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the ring (Trailing effect)
    // Snappier settings: Higher stiffness (400), Higher damping (30) to prevent wobble
    const ringX = useSpring(mouseX, { stiffness: 400, damping: 30 });
    const ringY = useSpring(mouseY, { stiffness: 400, damping: 30 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check hover targets
            const target = e.target;
            const isClickable = target.closest('a') || target.closest('button') || target.closest('.glass-card') || target.closest('.jewel-node');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* 1. THE CORE: Tiny, instant-tracking dot (Precision) */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 6,
                    height: 6,
                    backgroundColor: 'var(--accent-cyan)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    mixBlendMode: 'difference' // Classy inversion
                }}
            />

            {/* 2. THE RING: Larger, delayed halo (Elegance) */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovering ? 50 : 30, // Expands on hover
                    height: isHovering ? 50 : 30,
                    border: '1px solid var(--accent-cyan)',
                    backgroundColor: isHovering ? 'rgba(0, 136, 204, 0.1)' : 'transparent',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    width: isHovering ? 60 : 30,
                    height: isHovering ? 60 : 30,
                    opacity: isHovering ? 0.8 : 0.5
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            />
        </>
    );
};

export default CustomCursor;
