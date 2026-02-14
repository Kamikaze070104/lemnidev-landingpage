import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

interface MagneticButtonProps {
    children: React.ReactNode;
    href: string;
    className?: string; // Added for flexibility
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, href, className = '' }) => {
    const btnRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btnRef.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)',
        });
    }, []);

    return (
        <a
            ref={btnRef}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`magnetic-btn inline-flex items-center px-8 py-4 bg-white text-neutral-950 font-bold rounded-full transition-all duration-300 group relative overflow-hidden ${className}`}
        >
            <span className="magnetic-btn-bg" />
            <span className="relative z-10 flex items-center">
                {children}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
        </a>
    );
};

export default MagneticButton;
