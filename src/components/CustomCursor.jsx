import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over a clickable element
            const target = e.target;
            const isClickable = target.closest('a') || target.closest('button') || target.closest('.glass-card');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            width: 20,
            height: 20,
            backgroundColor: "var(--accent-cyan)",
            mixBlendMode: "difference"
        },
        hover: {
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
            width: 60,
            height: 60,
            backgroundColor: "#fff",
            mixBlendMode: "difference"
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CustomCursor;
