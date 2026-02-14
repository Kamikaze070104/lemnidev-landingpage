import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import AnimatedGridBackground from '../ui/AnimatedGridBackground';

gsap.registerPlugin(ScrollTrigger);

import MagneticButton from '../ui/MagneticButton';

/* ─── Pre-rendered Heading Letters ─── */
const HEADING_TEXT = 'LEMNIDEV';
const HeadingLetters: React.FC = () => (
    <>
        {HEADING_TEXT.split('').map((char, i) => (
            <span
                key={i}
                className="hero-letter inline-block"
                style={{ opacity: 0, transform: 'translateY(80px) rotateX(90deg)' }}
            >
                {char}
            </span>
        ))}
    </>
);

/* ─── Hero Section ─── */
const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!headingRef.current || !contentRef.current || !sectionRef.current) return;

        const letters = headingRef.current.querySelectorAll('.hero-letter');

        const runIntroAnimation = () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

                // 1. Badge slides down with fade
                tl.fromTo(
                    '.hero-badge',
                    { y: -30, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8 },
                    0.2
                );

                // 2. Animate letter spans
                tl.to(
                    letters,
                    {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.06,
                        ease: 'back.out(1.7)',
                    },
                    0.5
                );

                // 3. Subtitle fades in
                tl.fromTo(
                    '.hero-subtitle',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    1.2
                );

                // 4. CTA button slides up
                tl.fromTo(
                    '.hero-cta',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    1.6
                );

                // 5. Scroll indicator appears
                tl.fromTo(
                    '.hero-scroll-indicator',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6 },
                    2.0
                );

                // 6. Parallax on scroll
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    onUpdate: (self) => {
                        if (contentRef.current) {
                            gsap.set(contentRef.current, {
                                y: self.progress * 150,
                                opacity: 1 - self.progress * 1.2,
                            });
                        }
                    },
                });
            }, sectionRef);

            return ctx;
        };

        // Wait for loading screen to finish before starting hero animation
        let ctx: gsap.Context | null = null;

        const onLoadingComplete = () => {
            ctx = runIntroAnimation();
        };

        window.addEventListener('loading-complete', onLoadingComplete);

        // Fallback: if loading-complete already fired or no loading screen
        const fallbackTimer = setTimeout(() => {
            if (!ctx) {
                ctx = runIntroAnimation();
            }
        }, 3500);

        return () => {
            window.removeEventListener('loading-complete', onLoadingComplete);
            clearTimeout(fallbackTimer);
            ctx?.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white"
        >
            {/* Animated Grid Background */}
            <AnimatedGridBackground />

            {/* Aurora Orbs */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                <div className="aurora-orb aurora-orb-1" />
                <div className="aurora-orb aurora-orb-2" />
                <div className="aurora-orb aurora-orb-3" />
            </div>

            {/* Radial gradient vignette */}
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.4)_70%,rgba(10,10,10,0.8)_100%)]" />

            {/* Content */}
            <div ref={contentRef} className="container mx-auto px-4 z-10 text-center relative">
                {/* Badge */}
                <div className="hero-badge inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-8" style={{ opacity: 0 }}>
                    <span className="hero-badge-dot" />
                    <span className="text-sm font-medium text-indigo-300 tracking-widest uppercase">
                        Technology Team
                    </span>
                </div>

                {/* Main Heading */}
                <h1
                    ref={headingRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
                    style={{ perspective: '1000px' }}
                >
                    <HeadingLetters />
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed" style={{ opacity: 0 }}>
                    Kami membantu organisasi dan perusahaan membangun sistem digital yang{' '}
                    <span className="text-indigo-400 font-medium">efisien</span>,{' '}
                    <span className="text-purple-400 font-medium">aman</span>, dan{' '}
                    <span className="text-violet-400 font-medium">berkelanjutan</span> dengan pengembangan
                    aplikasi dan AI Workflow yang efektif.
                </p>

                {/* CTA */}
                <div className="hero-cta" style={{ opacity: 0 }}>
                    <MagneticButton href="#work">
                        Lihat Proyek Kami
                    </MagneticButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
                <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">Scroll</span>
                <div className="scroll-chevron-container">
                    <ChevronDown size={20} className="scroll-chevron text-gray-500" />
                    <ChevronDown size={20} className="scroll-chevron scroll-chevron-delayed text-gray-500" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
