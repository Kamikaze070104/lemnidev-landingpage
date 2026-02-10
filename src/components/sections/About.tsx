import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Shield, Cpu, Users, FolderGit2, CalendarDays, Target } from 'lucide-react';

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
    { icon: Rocket, text: 'Solusi pengembangan aplikasi andal & aman.' },
    { icon: Cpu, text: 'Implementasi AI Workflow untuk efisiensi.' },
    { icon: Shield, text: 'Prioritas pada keamanan data.' },
];

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Label — slide from LEFT
            gsap.fromTo('.about-label', { x: -80, opacity: 0 }, {
                x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-label', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Heading — scale up from center (like zooming in)
            gsap.fromTo('.about-heading', { scale: 0.6, opacity: 0, filter: 'blur(10px)' }, {
                scale: 1, opacity: 1, filter: 'blur(0px)',
                duration: 1.2, ease: 'power4.out',
                scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Description — slide from RIGHT
            gsap.fromTo('.about-description', { x: 80, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-description', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Stats — stagger from DIFFERENT corners
            const stats = sectionRef.current!.querySelectorAll('.stat-item');
            stats.forEach((stat, i) => {
                const directions = [
                    { x: -60, y: -30 },   // from top-left
                    { x: 60, y: -30 },    // from top-right
                    { x: -60, y: 30 },    // from bottom-left
                    { x: 60, y: 30 },     // from bottom-right
                ];
                const dir = directions[i % 4];
                gsap.fromTo(stat, { x: dir.x, y: dir.y, opacity: 0, scale: 0.8 }, {
                    x: 0, y: 0, opacity: 1, scale: 1,
                    duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: stat, start: 'top 88%', toggleActions: 'play none none reverse' },
                });
            });

            // Visi card — slide from LEFT with rotation
            gsap.fromTo('.about-visi', { x: -100, opacity: 0, rotateY: -15 }, {
                x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: '.about-visi', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Misi cards — slide from RIGHT with stagger
            const misiCards = sectionRef.current!.querySelectorAll('.misi-card');
            gsap.fromTo(misiCards, { x: 100, opacity: 0, rotateY: 15 }, {
                x: 0, opacity: 1, rotateY: 0, duration: 0.8, ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: { trigger: misiCards[0], start: 'top 88%', toggleActions: 'play none none reverse' },
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
                <div className="max-w-5xl mx-auto space-y-20">
                    <div className="text-center space-y-8">
                        <h2 className="about-label text-sm font-semibold tracking-widest text-indigo-500 uppercase">
                            Tentang Kami
                        </h2>
                        <h3 className="about-heading text-3xl md:text-5xl font-bold leading-tight">
                            Mitra Teknologi Terpercaya untuk Transformasi Digital
                        </h3>
                        <p className="about-description text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            Lemnidev adalah tim teknologi yang menyediakan layanan pengembangan aplikasi dan perancangan AI Workflow. Kami berdedikasi membantu organisasi membangun sistem digital yang efisien, aman, dan berkelanjutan.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
                        <AnimatedCounter target={5} suffix="+" label="Proyek Selesai" icon={FolderGit2} />
                        <AnimatedCounter target={12} suffix="" label="Anggota Tim" icon={Users} />
                        <AnimatedCounter target={1} suffix="+" label="Tahun Pengalaman" icon={CalendarDays} />
                        <AnimatedCounter target={4} suffix="" label="Layanan" icon={Cpu} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="about-visi relative p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-neutral-800/40 group hover:border-indigo-500/30 transition-all duration-500 overflow-hidden" style={{ perspective: '800px' }}>
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-700" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">∞</span>
                                    <h4 className="text-2xl font-bold text-white">Visi</h4>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    Menjadi tim teknologi terpercaya yang menghadirkan solusi digital dan AI melalui pengembangan aplikasi dan workflow cerdas yang modern dan efisien serta berdampak nyata bagi bisnis dan institusi.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                                    <Target size={24} /></span>
                                <h4 className="text-2xl font-bold text-white">Misi</h4>
                            </div>
                            {misiItems.map((item, i) => {
                                const MisiIcon = item.icon;
                                return (
                                    <div key={i} className="misi-card flex items-start gap-4 p-5 rounded-2xl border border-white/[0.08] bg-neutral-800/30 hover:border-indigo-500/20 hover:bg-neutral-800/50 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                            <MisiIcon size={18} className="text-indigo-400" />
                                        </div>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{item.text}</p>
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
