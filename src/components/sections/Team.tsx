import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data: Organization Hierarchy ─── */
const head = {
    name: 'Bentar Ristianto',
    role: 'Head of Solution',
    gradient: 'from-indigo-500 to-violet-600',
    image: 'B',
    social: { linkedin: '#' }
};

const divisions = [
    {
        name: 'Operations',
        color: 'emerald',
        members: [
            { name: 'Muh. Athif Fadh', role: 'Keuangan', gradient: 'from-emerald-500 to-teal-600' },
            { name: 'Agung Fathul', role: 'Human Relation', gradient: 'from-amber-500 to-orange-600' },
        ]
    },
    {
        name: 'Engineering',
        color: 'blue',
        members: [
            { name: 'Davi Hanan Luthfi A', role: 'Fullstack Dev', gradient: 'from-cyan-500 to-blue-600' },
            { name: 'M Fadhly R', role: 'Machine Learning', gradient: 'from-purple-500 to-pink-600' },
            { name: 'Ummam Hoerussifa', role: 'Machine Learning', gradient: 'from-fuchsia-500 to-purple-600' },
            { name: 'Rakandiya', role: 'Back-End Dev', gradient: 'from-sky-500 to-indigo-600' },
            { name: 'Rangga Ali', role: 'IoT Developer', gradient: 'from-lime-500 to-emerald-600' },
            { name: 'M Dzakkir Kilman', role: 'Front-End Dev', gradient: 'from-rose-500 to-red-600' },
            { name: 'Faizal Azzriel', role: 'Developer', gradient: 'from-indigo-500 to-cyan-500' },
        ]
    },
    {
        name: 'Creative',
        color: 'pink',
        members: [
            { name: 'Najwa Ikhsaniyah', role: 'Desain Visual', gradient: 'from-pink-500 to-rose-600' },
            { name: 'M Nazlan Rizqon', role: 'Desain Animasi', gradient: 'from-violet-500 to-fuchsia-600' },
        ]
    }
];

const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
};

/* ─── Components ─── */
const MemberCard: React.FC<{ member: any; small?: boolean }> = ({ member, small }) => (
    <div className={`relative group ${small ? 'w-48 p-4' : 'w-64 p-6'} rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-neutral-800/80 transition-all duration-300 z-10`}>
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md`} />

        <div className="relative flex flex-col items-center text-center">
            <div className={`${small ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-2xl'} rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center font-bold text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {member.image || member.name.charAt(0)}
            </div>
            <h4 className={`font-bold text-white ${small ? 'text-sm' : 'text-lg'} group-hover:text-indigo-300 transition-colors`}>
                {member.name}
            </h4>
            <p className={`text-gray-400 ${small ? 'text-xs' : 'text-sm'}`}>{member.role}</p>
        </div>
    </div>
);



/* ─── Main Section ─── */
const Team: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !treeRef.current) return;

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo('.team-header',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.team-header', start: 'top 85%' } }
            );

            // Tree Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: treeRef.current,
                    start: 'top 75%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            });

            // 1. Head appears
            tl.fromTo('.node-head', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });

            // 2. Trunk grows down
            tl.fromTo('.line-trunk', { height: 0 }, { height: '3rem', duration: 0.3 });

            // 3. Branches grow horizontal
            tl.fromTo('.line-branch', { scaleX: 0 }, { scaleX: 1, duration: 0.4 });

            // 4. Connectors grow down
            tl.fromTo('.line-connector', { height: 0 }, { height: '2rem', duration: 0.3 });

            // 5. Divisions appear
            tl.fromTo('.node-division',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
            );

            // 6. Members appear
            tl.fromTo('.node-member',
                { y: 10, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} className="py-32 bg-neutral-950 text-white relative overflow-hidden min-h-screen">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="team-header text-center mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">Tim Kami</h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4">Struktur Organisasi</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Hirarki profesional yang solid untuk menghadirkan solusi terbaik.
                    </p>
                </div>

                {/* Organization Tree */}
                <div ref={treeRef} className="flex flex-col items-center relative z-10 w-full overflow-x-auto pb-12">

                    {/* LEVEL 1: HEAD */}
                    <div className="flex flex-col items-center node-head">
                        <MemberCard member={head} />
                        <div className="line-trunk w-px bg-white/20 h-12" />
                    </div>

                    {/* CONNECTORS LINES */}
                    <div className="relative flex justify-center w-full max-w-5xl">
                        {/* Horizontal Line connecting 3 branches */}
                        <div className="line-branch absolute top-0 left-[16%] right-[16%] h-px bg-white/20 origin-center" />

                        {/* Vertical Connectors */}
                        <div className="w-full flex justify-around">
                            <div className="flex flex-col items-center">
                                <div className="line-connector w-px bg-white/20 h-8" />
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="line-connector w-px bg-white/20 h-8" />
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="line-connector w-px bg-white/20 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* LEVEL 2: DIVISIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-0">
                        {divisions.map((division, i) => (
                            <div key={i} className="flex flex-col items-center node-division">
                                {/* Division Label */}
                                <div className={`px-6 py-2 rounded-full border mb-8 backdrop-blur-md font-bold ${colorMap[division.color]}`}>
                                    {division.name}
                                </div>

                                {/* Members Grid */}
                                <div className="flex flex-col gap-6 items-center w-full">
                                    {/* Line to Division Members */}
                                    <div className="w-px bg-white/10 h-8 -mt-8 mb-0" />

                                    <div className="flex flex-wrap justify-center gap-4">
                                        {division.members.map((member, j) => (
                                            <div key={j} className="node-member relative">
                                                {/* Connecting line for siblings (visual simplified) */}
                                                <MemberCard member={member} small />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Team;
