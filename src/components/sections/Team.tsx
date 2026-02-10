import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data: Organization Hierarchy ─── */
const head = {
    name: 'Bentar Ristianto',
    role: 'Head of Solution',
    gradient: 'from-indigo-500 to-violet-600',
    initial: 'B'
};

const divisions = [
    {
        name: 'Operations',
        color: 'emerald',
        members: [
            { name: 'Muh. Athif Fadh', role: 'Keuangan', gradient: 'from-emerald-500 to-teal-600', initial: 'MA' },
            { name: 'Agung Fathul', role: 'Human Relation', gradient: 'from-amber-500 to-orange-600', initial: 'AF' },
        ]
    },
    {
        name: 'Engineering',
        color: 'blue',
        members: [
            { name: 'Davi Hanan Luthfi', role: 'Fullstack Dev', gradient: 'from-cyan-500 to-blue-600', initial: 'DH' },
            { name: 'M Fadhly R', role: 'Machine Learning', gradient: 'from-purple-500 to-pink-600', initial: 'MF' },
            { name: 'Ummam Hoerussifa', role: 'Machine Learning', gradient: 'from-fuchsia-500 to-purple-600', initial: 'UH' },
            { name: 'Rakandiya', role: 'Back-End Dev', gradient: 'from-sky-500 to-indigo-600', initial: 'R' },
            { name: 'Rangga Ali', role: 'IoT Developer', gradient: 'from-lime-500 to-emerald-600', initial: 'RA' },
            { name: 'M Dzakkir Kilman', role: 'Front-End Dev', gradient: 'from-rose-500 to-red-600', initial: 'MD' },
            { name: 'Faizal Azzriel', role: 'Developer', gradient: 'from-indigo-500 to-cyan-500', initial: 'FA' },
        ]
    },
    {
        name: 'Creative',
        color: 'pink',
        members: [
            { name: 'Najwa Ikhsaniyah', role: 'Desain Visual', gradient: 'from-pink-500 to-rose-600', initial: 'NI' },
            { name: 'M Nazlan Rizqon', role: 'Desain Animasi', gradient: 'from-violet-500 to-fuchsia-600', initial: 'MN' },
        ]
    }
];

const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    pink: 'text-pink-400 border-pink-500/30 bg-pink-500/5',
};

/* ─── Components ─── */
const NodeCard: React.FC<{
    member: any;
    isHead?: boolean;
    className?: string;
}> = ({ member, isHead, className = '' }) => (
    <div className={`relative group flex flex-col items-center z-10 ${className}`}>
        {/* Glow Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-full`} />

        {/* Card Content */}
        <div className={`
            relative overflow-hidden
            flex flex-col items-center justify-center text-center
            transition-all duration-300 ease-out
            backdrop-blur-md border border-white/10
            group-hover:border-white/30 group-hover:scale-105 group-hover:-translate-y-1
            shadow-lg shadow-black/20
            ${isHead ? 'w-48 h-48 rounded-full' : 'w-40 p-4 rounded-xl bg-neutral-900/80'}
        `}>
            {/* Avatar / Initial */}
            <div className={`
                ${isHead ? 'w-20 h-20 text-3xl mb-3' : 'w-12 h-12 text-lg mb-2'}
                rounded-full bg-gradient-to-br ${member.gradient}
                flex items-center justify-center font-bold text-white
                shadow-inner ring-2 ring-white/10
            `}>
                {member.initial}
            </div>

            {/* Text Info */}
            <h4 className={`font-bold text-white leading-tight ${isHead ? 'text-xl px-4' : 'text-sm'}`}>
                {member.name}
            </h4>
            <p className={`text-white/60 font-medium ${isHead ? 'text-sm mt-1' : 'text-xs mt-0.5'}`}>
                {member.role}
            </p>
        </div>
    </div>
);

const DivisionLabel: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <div className={`
        px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
        border backdrop-blur-md shadow-lg z-10
        transition-transform duration-300 hover:scale-110
        ${colorMap[color]}
    `}>
        {name}
    </div>
);

/* ─── Main Section ─── */
const Team: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial States for Animation
            gsap.set('.tree-line', { scale: 0, opacity: 0 });
            gsap.set('.tree-node', { y: 30, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: treeRef.current,
                    start: 'top 80%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            });

            // sequence
            // 1. Head
            tl.to('.node-head', { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' })
                // 2. Trunk Line
                .to('.line-trunk', { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
                // 3. Horizontal Branch
                .to('.line-branch', { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
                // 4. Division Connectors
                .to('.line-connector-div', { scaleY: 1, opacity: 1, duration: 0.3, stagger: 0.1 }, '-=0.3')
                // 5. Division Labels
                .to('.node-division', { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.2)' }, '-=0.2')
                // 6. Member Connectors
                .to('.line-connector-member', { scaleY: 1, opacity: 1, duration: 0.3 }, '-=0.2')
                // 7. Members
                .to('.node-member', { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.1)' }, '-=0.2');

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} className="py-24 bg-neutral-950 text-white relative overflow-hidden min-h-screen">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-indigo-500 font-semibold tracking-wide uppercase text-sm mb-3">Our Squad</h2>
                    <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                        Organization Structure
                    </h3>
                </div>

                <div ref={treeRef} className="flex flex-col items-center w-full max-w-7xl mx-auto overflow-x-auto pb-12 px-4 pointer-events-auto">
                    {/* ─── LEVEL 1: HEAD ─── */}
                    <div className="flex flex-col items-center relative gap-8">
                        <NodeCard member={head} isHead className="tree-node node-head" />

                        {/* Main Trunk Line */}
                        <div className="tree-line line-trunk w-px h-12 bg-gradient-to-b from-indigo-500 to-indigo-500/50 origin-top" />
                    </div>

                    {/* ─── BRANCHING ─── */}
                    <div className="relative w-full flex justify-center">
                        {/* Horizontal Crossbar (Connecting Divisions) */}
                        {/* Width is approximately calculated to span between first and last division centers */}
                        <div className="hidden md:block absolute top-0 left-[20%] right-[20%] h-px bg-indigo-500/30 tree-line line-branch origin-center" />

                        {/* Connectors for Mobile (Simplified vertical stack handled via flex-col on wrapper if needed, but here we use grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">

                            {divisions.map((division, idx) => (
                                <div key={idx} className="flex flex-col items-center relative">
                                    {/* Vertical Line from Crossbar to Division Label */}
                                    {/* Mobile: Hidden, Desktop: Visible */}
                                    <div className="hidden md:block tree-line line-connector-div w-px h-8 bg-indigo-500/30 origin-top mb-4" />

                                    {/* Division Label */}
                                    <div className="tree-node node-division mb-8">
                                        <DivisionLabel name={division.name} color={division.color} />
                                    </div>

                                    {/* Members Container */}
                                    <div className="flex flex-col items-center gap-6 w-full relative">
                                        {/* Connector Line to Members */}
                                        <div className="tree-line line-connector-member w-px h-6 bg-white/10 origin-top -mt-4" />

                                        {/* Members Grid/List */}
                                        <div className="flex flex-wrap justify-center gap-6">
                                            {division.members.map((member, mIdx) => (
                                                <div key={mIdx} className="tree-node node-member relative group/line">
                                                    {/* Small subtle line connecting to parent in mobile/wrap view could go here */}
                                                    <NodeCard member={member} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
