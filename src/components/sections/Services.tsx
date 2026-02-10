import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Bot, Link2, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Pengembangan Aplikasi',
        description: 'Pembuatan aplikasi Website, Mobile, dan Desktop yang dirancang custom sesuai kebutuhan, andal, dan aman.',
        number: '01',
        icon: Code2,
        gradient: 'from-indigo-500 to-cyan-400',
        glowColor: 'rgba(99, 102, 241, 0.15)',
        span: 'md:col-span-2 md:row-span-2',
        tags: ['Website', 'Mobile', 'Desktop'],
    },
    {
        title: 'AI Workflow & Automasi',
        description: 'Merancang workflow cerdas untuk mengotomasi proses bisnis guna meningkatkan efisiensi.',
        number: '02',
        icon: Bot,
        gradient: 'from-purple-500 to-pink-400',
        glowColor: 'rgba(168, 85, 247, 0.15)',
        span: 'md:col-span-1 md:row-span-1',
        tags: ['Chatbot', 'Voicebot', 'Data Processing'],
    },
    {
        title: 'Integrasi Sistem',
        description: 'Menghubungkan aplikasi baru dengan sistem yang sudah ada melalui API yang handal.',
        number: '03',
        icon: Link2,
        gradient: 'from-emerald-500 to-teal-400',
        glowColor: 'rgba(16, 185, 129, 0.15)',
        span: 'md:col-span-1 md:row-span-1',
        tags: ['API', 'Microservices', 'Integration'],
    },
    {
        title: 'Maintenance & Scaling',
        description: 'Layanan pemeliharaan berkelanjutan dan pengembangan fitur lanjutan untuk performa optimal.',
        number: '04',
        icon: Settings,
        gradient: 'from-amber-500 to-orange-400',
        glowColor: 'rgba(245, 158, 11, 0.15)',
        span: 'md:col-span-2 md:row-span-1',
        tags: ['Monitoring', 'Optimization', 'Support'],
    }
];

const BentoCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${service.glowColor}, transparent 40%)`;
        glowRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
        if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const Icon = service.icon;
    const isLarge = index === 0;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bento-card relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-sm group cursor-pointer transition-colors duration-500 hover:border-white/20 ${service.span}`}
        >
            <div ref={glowRef} className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0" />
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${service.gradient} blur-xl -z-10 scale-[1.02]`} />

            <div className={`relative z-10 h-full flex flex-col justify-between ${isLarge ? 'p-8 md:p-12' : 'p-6 md:p-8'}`}>
                <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-gray-600 text-sm">{service.number}</span>
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon size={isLarge ? 28 : 22} className="text-white" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                    <h3 className={`font-bold text-white mb-3 group-hover:text-white transition-colors ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                        {service.title}
                    </h3>
                    <p className={`text-gray-400 leading-relaxed mb-4 ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                        {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 text-gray-400 bg-white/[0.03] group-hover:border-white/20 group-hover:text-gray-300 transition-all duration-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-700`} />
        </div>
    );
};

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Label — slide from RIGHT (opposite to About)
            gsap.fromTo('.services-label', { x: 80, opacity: 0 }, {
                x: 0, opacity: 1, duration: 0.8,
                scrollTrigger: { trigger: '.services-label', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Heading — slide from LEFT with rotation
            gsap.fromTo('.services-heading', { x: -120, opacity: 0, rotateZ: -3 }, {
                x: 0, opacity: 1, rotateZ: 0,
                duration: 1.2, ease: 'power4.out',
                scrollTrigger: { trigger: '.services-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Bento cards — each flies in from a DIFFERENT direction
            const cards = sectionRef.current!.querySelectorAll('.bento-card');
            const cardAnimations = [
                { x: -100, y: 50, rotate: -5 },   // card 0 — from bottom-left, tilted
                { x: 80, y: -40, rotate: 3 },      // card 1 — from top-right
                { x: -60, y: -50, rotate: -3 },    // card 2 — from top-left
                { x: 100, y: 40, rotate: 5 },      // card 3 — from bottom-right
            ];
            cards.forEach((card, i) => {
                const anim = cardAnimations[i] || { x: 0, y: 80, rotate: 0 };
                gsap.fromTo(card,
                    { x: anim.x, y: anim.y, rotate: anim.rotate, opacity: 0, scale: 0.9 },
                    {
                        x: 0, y: 0, rotate: 0, opacity: 1, scale: 1,
                        duration: 1.2, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none reverse' },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="py-32 bg-neutral-900 text-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="services-label text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                        Layanan Kami
                    </h2>
                    <h3 className="services-heading text-4xl md:text-5xl font-bold">
                        Solusi yang Kami Tawarkan
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[300px]">
                    {services.map((service, index) => (
                        <BentoCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
