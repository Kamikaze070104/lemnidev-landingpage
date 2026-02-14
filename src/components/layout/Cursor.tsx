import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';

const Cursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const variants: Variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            x: -16,
            y: -16,
            transition: {
                mass: 0.6
            }
        },
        hover: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 255, 255, 1)",
            border: "none",
            mixBlendMode: "difference",
            x: -32,
            y: -32,
            transition: {
                mass: 0.6
            }
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        />
    );
};

export default Cursor;
