import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HoloCard = ({ children, className }) => {
    const ref = useRef(null);

    // Motion values for mouse position relative to card center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for rotation
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 20 });

    // Holographic glare effect
    const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
    const glareOpacity = useTransform(useMotionValue(0), [0, 1], [0, 1]); // Placeholder, controlled by hover

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        // Normalize coordinates to -0.5 to 0.5
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                {children}

                {/* Holographic Glare Overlay */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(
              circle at ${glareX}% ${glareY}%, 
              rgba(255,255,255,0.1) 0%, 
              transparent 60%
            )`,
                        opacity: isHovering ? 0.4 : 0,
                        pointerEvents: 'none',
                        zIndex: 20,
                        mixBlendMode: 'overlay',
                        borderRadius: 'inherit'
                    }}
                    transition={{ duration: 0.2 }}
                />

                {/* Reflection Edge */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: 'inherit',
                        background: `linear-gradient(105deg, transparent 40%, rgba(34, 211, 238, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(34, 211, 238, 0.3) 55%, transparent 60%)`,
                        opacity: isHovering ? 0.3 : 0,
                        filter: 'blur(2px)',
                        zIndex: 21,
                        pointerEvents: 'none',
                        mixBlendMode: 'color-dodge'
                    }}
                />

            </motion.div>
        </motion.div>
    );
};

export default HoloCard;
