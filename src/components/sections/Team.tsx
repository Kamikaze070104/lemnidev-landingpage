import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
interface TeamMember {
    name: string;
    role: string;
    github: string;
    image: string;
    size: 'tall' | 'short';
    customClass?: string;
}

/* ─── Data ─── */
const teamMembers: TeamMember[] = [
    { name: 'Bentar Ristianto', role: 'Head of Solution', github: 'https://github.com/BentarCr00s', image: '/Bentar.webp', size: 'tall' },
    { name: 'Muh. Athif Fadh', role: 'Keuangan', github: 'https://github.com/thiffadl', image: '/Athif.webp', size: 'short' },
    { name: 'Agung Fathul', role: 'Human Relation', github: 'https://github.com/AgungFathul01', image: '/Agung.webp', size: 'tall' },
    { name: 'Najwa Ikhsaniyah', role: 'Desain Visual', github: '#', image: '/Najwa.webp', size: 'short' },
    { name: 'M Nazlan Rizqon', role: 'Desain Animasi', github: '#', image: '/Nazlan.webp', size: 'tall' },
    { name: 'Davi Hanan Luthfi', role: 'Fullstack Dev', github: 'https://github.com/NekoMorie', image: '/Davi.webp', size: 'short' },
    { name: 'Rakandiya', role: 'Back-End Dev', github: 'https://github.com/Rakandiya', image: '/Rakandiya.webp', size: 'short' },
    { name: 'M Fadhly R', role: 'Machine Learning', github: 'https://github.com/fadhlyrafi', image: '/Fadhly.webp', size: 'tall' },
    { name: 'Ummam Hoerussifa', role: 'Machine Learning', github: 'https://github.com/Sumems', image: '/Ummam.webp', size: 'short' },
    { name: 'M Dzakkir Kilman', role: 'Front-End Dev', github: 'https://github.com/dzakkirsolihin', image: '/Dzakkir.webp', size: 'tall' },
    { name: 'Faizal Azzriel', role: 'Developer', github: 'https://github.com/Kamikaze070104', image: '/Faizal.webp', size: 'short' },
    { name: 'Rangga Ali', role: 'IoT Developer', github: '#', image: '/Rangga.webp', size: 'short' },
];

/* ─── Height Map ─── */
const heightMap = {
    tall: 'h-[360px] md:h-[420px]',
    short: 'h-[280px] md:h-[320px]',
};

/* ─── Offset Map (for directional animation) ─── */
// tall = positioned lower → enters from above (negative y)
// short = positioned higher → enters from below (positive y)
const offsetYMap = {
    tall: -50,
    short: 50,
};

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
const CapsuleCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    const [tapped, setTapped] = React.useState(false);

    return (
        <div
            className={`team-capsule group cursor-target relative rounded-[2.5rem] overflow-hidden flex-shrink-0 w-[140px] md:w-[180px] ${heightMap[member.size]} bg-neutral-800 transition-transform duration-500 ease-out border border-white/5`}
            data-offset-y={offsetYMap[member.size]}
            data-index={index}
            onClick={() => setTapped((v) => !v)}
        >
            {/* Photo */}
            <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
            />

            {/* Gradient overlay — visible on hover / tap */}
            <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${tapped ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            />

            {/* Info overlay */}
            <div
                className={`absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1 transition-all duration-500 ${tapped ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
            >
                <h4 className="text-white font-bold text-sm md:text-lg leading-tight">{member.name}</h4>
                <p className="text-indigo-300 text-xs md:text-sm font-medium">{member.role}</p>
                <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-gray-400 hover:text-white transition-colors duration-200 w-fit"
                    aria-label={`GitHub ${member.name}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <GithubIcon className="w-5 h-5" />
                </a>
            </div>

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 pointer-events-none" />
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
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Capsule card animations — directional based on size offset
            const capsules = gsap.utils.toArray<HTMLElement>('.team-capsule');
            capsules.forEach((el, i) => {
                const offsetY = parseInt(el.dataset.offsetY || '0', 10);
                gsap.fromTo(
                    el,
                    { y: offsetY, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        delay: i * 0.05,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.team-capsule-grid',
                            start: 'top 85%',
                        }
                    }
                );
            });
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

            {/* Capsule Grid - Horizontal Zig Zag */}
            <div className="relative z-10 team-capsule-grid flex flex-wrap justify-center items-center gap-6 md:gap-8 px-4 max-w-[1400px] mx-auto min-h-[500px]">
                {teamMembers.map((member, i) => (
                    <CapsuleCard key={member.name} member={member} index={i} />
                ))}
            </div>
        </section>
    );
};

export default Team;
