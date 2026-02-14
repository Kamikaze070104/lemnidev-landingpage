import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
interface TeamMember {
    name: string;
    role: string;
    initial: string;
    gradient: string;
    github: string;
    image: string;
}

/* ─── Data: Flattened Lists ─── */
const row1: TeamMember[] = [
    { name: 'Bentar Ristianto', role: 'Head of Solution', initial: 'B', gradient: 'from-indigo-500 to-violet-600', github: 'https://github.com/BentarCr00s', image: '/Bentar.webp' },
    { name: 'Muh. Athif Fadh', role: 'Keuangan', initial: 'MA', gradient: 'from-emerald-500 to-teal-600', github: 'https://github.com/thiffadl', image: '/Athif.webp' },
    { name: 'Agung Fathul', role: 'Human Relation', initial: 'AF', gradient: 'from-amber-500 to-orange-600', github: 'https://github.com/AgungFathul01', image: '/Agung.webp' },
    { name: 'Najwa Ikhsaniyah', role: 'Desain Visual', initial: 'NI', gradient: 'from-pink-500 to-rose-600', github: '#', image: '/Najwa.webp' },
    { name: 'M Nazlan Rizqon', role: 'Desain Animasi', initial: 'MN', gradient: 'from-violet-500 to-fuchsia-600', github: '#', image: '/Nazlan.webp' },
];

const row2: TeamMember[] = [
    { name: 'Davi Hanan Luthfi', role: 'Fullstack Dev', initial: 'DH', gradient: 'from-cyan-500 to-blue-600', github: 'https://github.com/NekoMorie', image: '/Davi.webp' },
    { name: 'Rakandiya', role: 'Back-End Dev', initial: 'R', gradient: 'from-sky-500 to-indigo-600', github: 'https://github.com/Rakandiya', image: '/Rakandiya.webp' },
    { name: 'M Fadhly R', role: 'Machine Learning', initial: 'MF', gradient: 'from-purple-500 to-pink-600', github: 'https://github.com/fadhlyrafi', image: '/Fadhly.webp' },
    { name: 'Ummam Hoerussifa', role: 'Machine Learning', initial: 'UH', gradient: 'from-fuchsia-500 to-purple-600', github: 'https://github.com/Sumems', image: '/Ummam.webp' },
    { name: 'M Dzakkir Kilman', role: 'Front-End Dev', initial: 'MD', gradient: 'from-rose-500 to-red-600', github: 'https://github.com/dzakkirsolihin', image: '/Dzakkir.webp' },
    { name: 'Faizal Azzriel', role: 'Developer', initial: 'FA', gradient: 'from-indigo-500 to-cyan-500', github: 'https://github.com/Kamikaze070104', image: '/Faizal.webp' },
    { name: 'Rangga Ali', role: 'IoT Developer', initial: 'RA', gradient: 'from-lime-500 to-emerald-600', github: '#', image: '/Rangga.webp' },
];

/* ─── GitHub Icon SVG ─── */
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

/* ─── Capsule Card ─── */
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="group relative flex items-center gap-3 md:gap-5 p-2 pr-4 md:p-3 md:pr-8 rounded-full bg-neutral-900/50 border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-neutral-800 hover:border-indigo-500/30 hover:scale-[1.02] cursor-default min-w-[260px] md:min-w-[380px]">

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />

        {/* Avatar - Image */}
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-neutral-700/50 relative z-10`}>
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
            />
        </div>

        {/* Info - Enlarge text */}
        <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold text-sm md:text-lg truncate">{member.name}</h4>
            <p className="text-indigo-400 text-xs md:text-sm font-medium truncate">{member.role}</p>
        </div>

        {/* GitHub Action */}
        <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200 p-1.5 md:p-2 hover:bg-white/10 rounded-full"
            aria-label={`GitHub ${member.name}`}
        >
            <GithubIcon className="w-5 h-5 md:w-6 md:h-6" />
        </a>
    </div>
);

/* ─── Marquee Row ─── */
const MarqueeRow: React.FC<{ items: TeamMember[]; direction: 'left' | 'right'; speed?: number }> = ({ items, direction, speed = 60 }) => {
    // Duplicate 4 times to ensure seamless infinite loop
    const doubled = [...items, ...items, ...items, ...items];
    const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

    return (
        <div className="flex overflow-hidden py-4 -my-2 select-none">
            <div
                className={`flex gap-8 whitespace-nowrap ${animClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {doubled.map((item, i) => (
                    <TeamCard key={i} member={item} />
                ))}
            </div>
        </div>
    );
};

/* ─── Main Section ─── */
const Team: React.FC = () => {
    const sectionRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            // Header animations
            gsap.fromTo(
                '.team-header',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.team-header',
                        start: 'top 85%',
                    }
                }
            );

            // Marquee fade-in
            gsap.fromTo(
                '.team-marquee-container',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.team-marquee-container',
                        start: 'top 90%',
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0a0a_70%)] pointer-events-none" />

            {/* Header */}
            <div className="container mx-auto px-4 mb-20 text-center relative z-10 team-header">
                <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                    Our Squad
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Tim Kami
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Orang-orang berbakat di balik setiap solusi digital yang kami ciptakan.
                </p>
            </div>

            {/* Marquee Container - Increased gap between rows */}
            <div className="relative w-full flex flex-col gap-16 team-marquee-container z-10">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

                {/* Row 1: Right direction - Slower speed */}
                <MarqueeRow items={row1} direction="right" speed={80} />

                {/* Row 2: Left direction - Slower speed */}
                <MarqueeRow items={row2} direction="left" speed={90} />
            </div>
        </section>
    );
};

export default Team;
