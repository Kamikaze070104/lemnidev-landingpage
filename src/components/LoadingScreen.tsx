import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/logoB.webp';

const LOADING_DURATION = 2200;

const LoadingScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!containerRef.current) return;

            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 1.1,
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => {
                    setIsVisible(false);
                    // Signal that loading is complete — Hero listens for this
                    window.dispatchEvent(new CustomEvent('loading-complete'));
                },
            });
        }, LOADING_DURATION);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center"
        >
            <div className="loader-logo mb-8">
                <img
                    src={logo}
                    alt="Lemnidev"
                    className="h-16 md:h-20 w-auto invert brightness-0"
                />
            </div>

            <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                <div className="loader-bar w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            </div>

            <p className="text-gray-600 text-sm mt-4 tracking-widest uppercase font-mono">
                Loading
            </p>
        </div>
    );
};

export default LoadingScreen;
