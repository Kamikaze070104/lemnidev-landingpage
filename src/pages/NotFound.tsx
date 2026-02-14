import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Home, ArrowLeft } from 'lucide-react';

/* ─── Floating Particle ─── */
const PARTICLE_COUNT = 30;

const NotFound: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    /* ─── Particle Background ─── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(79,70,229,', 'rgba(168,85,247,'];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Slight attraction to mouse
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.vx += dx * 0.00005;
                    p.vy += dy * 0.00005;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.opacity})`;
                ctx.fill();
            });

            // Draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    /* ─── Mouse Tracking ─── */
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    /* ─── Glitch & Entry Animations ─── */
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // "404" text — dramatic scale entrance
            tl.fromTo(
                '.notfound-code',
                { scale: 3, opacity: 0, filter: 'blur(30px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
                0.3
            );

            // Subtitle
            tl.fromTo(
                '.notfound-subtitle',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.9
            );

            // Description
            tl.fromTo(
                '.notfound-desc',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                1.2
            );

            // Buttons
            tl.fromTo(
                '.notfound-actions',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                1.5
            );

            // Glitch effect loop
            gsap.to('.notfound-code', {
                keyframes: [
                    { x: -3, skewX: 2, duration: 0.1 },
                    { x: 3, skewX: -2, duration: 0.1 },
                    { x: -1, skewX: 0, duration: 0.1 },
                    { x: 0, skewX: 0, duration: 0.1 },
                ],
                repeat: -1,
                repeatDelay: 4,
                delay: 2,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden"
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* Background Gradient Orbs */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                <div className="absolute w-[500px] h-[500px] top-[10%] left-[20%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
                <div className="absolute w-[400px] h-[400px] bottom-[10%] right-[15%] rounded-full bg-violet-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Radial vignette */}
            <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.5)_70%,rgba(10,10,10,0.9)_100%)]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                {/* 404 Code with Glitch Effect */}
                <div ref={glitchRef} className="relative mb-6">
                    <h1 className="notfound-code text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent select-none" style={{ opacity: 0 }}>
                        404
                    </h1>

                    {/* Glitch Shadows */}
                    <h1
                        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-indigo-500/20 select-none pointer-events-none"
                        style={{ transform: 'translate(4px, -4px)', opacity: 0.3 }}
                        aria-hidden="true"
                    >
                        404
                    </h1>
                    <h1
                        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-purple-500/20 select-none pointer-events-none"
                        style={{ transform: 'translate(-4px, 4px)', opacity: 0.3 }}
                        aria-hidden="true"
                    >
                        404
                    </h1>
                </div>

                {/* Subtitle */}
                <h2 className="notfound-subtitle text-2xl md:text-3xl font-bold mb-4" style={{ opacity: 0 }}>
                    Halaman Tidak Ditemukan
                </h2>

                {/* Description */}
                <p className="notfound-desc text-gray-400 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed" style={{ opacity: 0 }}>
                    Sepertinya halaman yang Anda cari sudah dipindahkan, dihapus, atau mungkin tidak pernah ada.
                </p>

                {/* Action Buttons */}
                <div className="notfound-actions flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: 0 }}>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-950 font-bold rounded-full transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25 group"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-gray-300 font-medium rounded-full transition-all duration-300 hover:border-indigo-500/30 hover:text-white hover:bg-white/5 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Halaman Sebelumnya
                    </button>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
        </section>
    );
};

export default NotFound;
