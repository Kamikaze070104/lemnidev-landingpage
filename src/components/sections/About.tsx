import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Shield, Cpu, Users, FolderGit2, CalendarDays, RefreshCw, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated Counter ─── */
const AnimatedCounter: React.FC<{ target: number; suffix?: string; label: string; icon: React.ElementType }> = ({
    target, suffix = '', label, icon: Icon
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 85%',
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => setCount(Math.round(obj.val)),
                });
            },
        });

        return () => trigger.kill();
    }, [target]);

    return (
        <div ref={ref} className="stat-item text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                <Icon size={24} className="text-indigo-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                {count}<span className="text-indigo-400">{suffix}</span>
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-widest">{label}</div>
        </div>
    );
};

/* ─── Misi Item ─── */
const misiItems = [
    { icon: Rocket, text: 'Menyediakan layanan pengembangan aplikasi (website, mobile, dan desktop) yang andal, aman, dan sesuai kebutuhan pengguna.' },
    { icon: Cpu, text: 'Merancang dan mengimplementasikan AI Workflow untuk meningkatkan efisiensi, otomatisasi, dan kualitas proses bisnis.' },
    { icon: RefreshCw, text: 'Mengutamakan continuous improvement dalam setiap siklus pengembangan, selaras dengan filosofi lemniskat (∞).' },
    { icon: Layers, text: 'Memberikan solusi yang fleksibel, scalable, dan mudah diintegrasikan dengan sistem yang sudah ada.' },
    { icon: Shield, text: 'Menjaga keamanan, kerahasiaan data, dan kualitas layanan sebagai prioritas utama.' },
    { icon: Users, text: 'Menjalin kerja sama jangka panjang dengan klien melalui komunikasi yang transparan dan hasil kerja yang terukur.' },
];

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Label — slide from LEFT
            gsap.fromTo('.about-label', { x: -50, opacity: 0 }, {
                x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-label', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Heading — fade up
            gsap.fromTo('.about-heading', { y: 30, opacity: 0 }, {
                y: 0, opacity: 1,
                duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Description — fade up with delay
            gsap.fromTo('.about-description', { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Stats — stagger fade up
            const stats = sectionRef.current!.querySelectorAll('.stat-item');
            gsap.fromTo(stats, { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: { trigger: stats[0], start: 'top 88%', toggleActions: 'play none none reverse' },
            });

            // Visi — Scale up & Fade
            gsap.fromTo('.about-visi', { scale: 0.9, opacity: 0, y: 50 }, {
                scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)',
                scrollTrigger: { trigger: '.about-visi', start: 'top 80%', toggleActions: 'play none none reverse' },
            });

            // Misi Cards — Stagger Fade Up
            const misiCards = sectionRef.current!.querySelectorAll('.misi-card');
            gsap.fromTo(misiCards, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: { trigger: '.misi-container', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Decorative lines
            gsap.fromTo('.about-line', { scaleX: 0 }, {
                scaleX: 1, duration: 1.5, ease: 'power2.inOut',
                scrollTrigger: { trigger: '.about-line', start: 'top 90%', toggleActions: 'play none none reverse' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 bg-neutral-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px about-line origin-left bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Header Section */}
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <h2 className="about-label text-sm font-semibold tracking-widest text-indigo-500 uppercase">
                            Tentang Kami
                        </h2>
                        <h3 className="about-heading text-3xl md:text-5xl font-bold leading-tight">
                            Mitra Teknologi Terpercaya untuk Transformasi Digital
                        </h3>
                        <p className="about-description text-xl text-gray-400 leading-relaxed">
                            Lemnidev adalah tim teknologi yang menyediakan layanan pengembangan aplikasi dan perancangan AI Workflow. Kami berdedikasi membantu organisasi dan perusahaan membangun sistem digital yang efisien, aman, dan berkelanjutan.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/[0.05]">
                        <AnimatedCounter target={10} suffix="+" label="Proyek Selesai" icon={FolderGit2} />
                        <AnimatedCounter target={12} suffix="" label="Anggota Tim" icon={Users} />
                        <AnimatedCounter target={4} suffix="+" label="Tahun Pengalaman" icon={CalendarDays} />
                        <AnimatedCounter target={4} suffix="" label="Layanan" icon={Cpu} />
                    </div>

                    {/* Vision Section (Centered) */}
                    <div className="about-visi relative p-10 md:p-14 rounded-3xl border border-white/[0.08] bg-neutral-800/40 text-center overflow-hidden group">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-2xl shadow-indigo-500/20">
                                ∞
                            </div>
                            <h4 className="text-3xl font-bold text-white mb-6">Visi Kami</h4>
                            <p className="text-gray-300 leading-relaxed text-xl max-w-3xl mx-auto">
                                "Menjadi tim teknologi terpercaya yang menghadirkan solusi digital dan AI melalui pengembangan aplikasi dan workflow cerdas yang modern dan efisien serta berdampak nyata bagi bisnis dan institusi."
                            </p>
                        </div>
                    </div>

                    {/* Mission Section (Grid) */}
                    <div className="space-y-10 misi-container">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-12 bg-indigo-500/50"></div>
                            <h4 className="text-2xl font-bold text-white text-center">Misi Kami</h4>
                            <div className="h-px w-12 bg-indigo-500/50"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {misiItems.map((item, i) => {
                                const MisiIcon = item.icon;
                                return (
                                    <div key={i} className="misi-card group relative p-6 rounded-2xl border border-white/[0.08] bg-neutral-800/30 hover:bg-neutral-800/60 hover:border-indigo-500/30 transition-all duration-300 h-full">
                                        <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                                <MisiIcon size={22} className="text-indigo-400" />
                                            </div>
                                            <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px about-line origin-right bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </section>
    );
};

export default About;
