import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

import proj1 from '../../assets/projek/1.webp';
import proj2 from '../../assets/projek/2.webp';
import proj3 from '../../assets/projek/3.webp';
import proj4 from '../../assets/projek/4.webp';
import proj5 from '../../assets/projek/5.webp';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: 'Voyage Marketplace', category: 'E-Commerce', image: proj1, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', link: 'https://voyagstuff.voyagvelasco.com/home' },
    { id: 2, title: 'Solusi Sehat', category: 'Health', image: proj5, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', link: 'https://solusi-sehat.olahragaviral.id/' },
    { id: 3, title: 'Voyag Velasco Topup', category: 'E-Commerce', image: proj2, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', link: 'https://voyagvelasco.com/' },
    { id: 4, title: 'Olahraga Viral', category: 'Platform', image: proj4, colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1', link: 'https://olahragaviral.id/' },
    { id: 5, title: 'Company Profile PT.JSS', category: 'Company Profile', image: proj3, colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', link: 'https://jss.olahragaviral.id/' },
];

const categories = ['Semua', ...Array.from(new Set(projects.map((p) => p.category)))];

/* ─── 3D Tilt Card ─── */
const TiltCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        gsap.to(cardRef.current, { rotateX: (y - 0.5) * -15, rotateY: (x - 0.5) * 15, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
        if (glareRef.current) gsap.to(glareRef.current, { opacity: 0.15, background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.4), transparent 50%)`, duration: 0.3 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
        if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.3 });
    }, []);

    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            className={`work-card relative group overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-indigo-500/30 transition-colors duration-500 ${project.colSpan} ${project.rowSpan}`}
            style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
            </div>
            <div ref={glareRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none rounded-3xl" />
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 z-20" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-3">{project.category}</span>
                        <h4 className="text-2xl font-bold text-white mb-1">{project.title}</h4>
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="bg-white text-neutral-950 p-3 rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-indigo-500 hover:text-white flex-shrink-0">
                        <ArrowUpRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};

const Work: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState('Semua');

    const filteredProjects = activeFilter === 'Semua' ? projects : projects.filter((p) => p.category === activeFilter);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading — zoom in from far with blur (like GSAP website)
            gsap.fromTo('.work-heading', { scale: 2, opacity: 0, filter: 'blur(20px)' }, {
                scale: 1, opacity: 1, filter: 'blur(0px)',
                duration: 1.4, ease: 'power4.out',
                scrollTrigger: { trigger: '.work-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Filter tabs — slide from RIGHT
            gsap.fromTo('.work-filters', { x: 100, opacity: 0 }, {
                x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: '.work-filters', start: 'top 88%', toggleActions: 'play none none reverse' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate cards on filter change — spiral in
    useEffect(() => {
        if (!sectionRef.current) return;
        const cards = sectionRef.current.querySelectorAll('.work-card');
        cards.forEach((card, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const radius = 60;
            gsap.fromTo(card,
                { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity: 0, scale: 0.8, rotate: (i % 2 === 0 ? -5 : 5) },
                { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
            );
        });
    }, [activeFilter]);

    return (
        <section id="work" ref={sectionRef} className="py-32 bg-neutral-950 text-white">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">Proyek Kami</h2>
                    <h3 className="work-heading text-4xl md:text-5xl font-bold mb-8">Karya Terbaru</h3>
                    <div className="work-filters flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-neutral-900 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {filteredProjects.map((project) => (
                        <TiltCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
