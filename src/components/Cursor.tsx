import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const Cursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
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
    }, []);

    const variants: Variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            transition: {
                type: "spring",
                mass: 0.6
            }
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 255, 255, 1)",
            border: "none",
            mixBlendMode: "difference",
            transition: {
                type: "spring",
                mass: 0.6
            }
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-indigo-500 rounded-full z-[10000] pointer-events-none hidden md:block"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        </>
    );
};

export default Cursor;
