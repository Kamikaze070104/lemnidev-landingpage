import React from 'react';

/* ─── CDN base for Simple Icons (jsDelivr - reliable & fast) ─── */
const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons/icons';

/* ─── Tech items with real logos from internet ─── */
const row1 = [
    { name: 'React Router', logo: `${CDN}/reactrouter.svg` },
    { name: 'Tailwind CSS', logo: `${CDN}/tailwindcss.svg` },
    { name: 'TypeScript', logo: `${CDN}/typescript.svg` },
    { name: 'Express.js', logo: `${CDN}/express.svg` },
    { name: 'Laravel', logo: `${CDN}/laravel.svg` },
    { name: 'PostgreSQL', logo: `${CDN}/postgresql.svg` },
    { name: 'MongoDB', logo: `${CDN}/mongodb.svg` },
    { name: 'Redis', logo: `${CDN}/redis.svg` },
];

const row2 = [
    { name: 'Dokploy', logo: `${CDN}/docker.svg` },
    { name: 'GitHub', logo: `${CDN}/github.svg` },
    { name: 'Linux', logo: `${CDN}/linux.svg` },
    { name: 'Windows', logo: `${CDN}/windows.svg` },
    { name: 'VS Code', logo: `${CDN}/visualstudiocode.svg` },
    { name: 'Postman', logo: `${CDN}/postman.svg` },
    { name: 'Draw.io', logo: `${CDN}/diagramsdotnet.svg` },
    { name: 'Docker', logo: `${CDN}/docker.svg` },
];

const row3 = [
    { name: 'Node.js', logo: `${CDN}/nodedotjs.svg` },
    { name: 'Python', logo: `${CDN}/python.svg` },
    { name: 'Figma', logo: `${CDN}/figma.svg` },
    { name: 'GSAP', logo: `${CDN}/greensock.svg` },
    { name: 'Vite', logo: `${CDN}/vite.svg` },
    { name: 'Next.js', logo: `${CDN}/nextdotjs.svg` },
    { name: 'Go', logo: `${CDN}/go.svg` },
    { name: 'AWS', logo: `${CDN}/amazonwebservices.svg` },
];

/* ─── Single Marquee Row ─── */
const MarqueeRow: React.FC<{
    items: typeof row1;
    direction: 'left' | 'right';
    speed?: number;
}> = ({ items, direction, speed = 35 }) => {
    const doubled = [...items, ...items, ...items, ...items];
    const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

    return (
        <div className="flex overflow-hidden py-2">
            <div
                className={`flex gap-6 whitespace-nowrap ${animClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={i}
                        title={item.name}
                        className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 cursor-default group flex-shrink-0"
                    >
                        {/* invert class makes the black icons white */}
                        <img
                            src={item.logo}
                            alt={item.name}
                            className="w-6 h-6 md:w-10 md:h-10 invert group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─── TechStack Section ─── */
const TechStack: React.FC = () => {
    return (
        <section id="tech-stack" className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            {/* Section header */}
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4">
                    Teknologi
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                    Tech Stack Kami
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Tools dan teknologi modern yang kami gunakan untuk membangun solusi digital.
                </p>
            </div>

            {/* Horizontal Marquee Container (No Rotation) */}
            <div className="relative w-full flex flex-col gap-6">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

                {/* Top: Left to Right */}
                <MarqueeRow items={row1} direction="right" speed={50} />

                {/* Middle: Right to Left (Opposite) */}
                <MarqueeRow items={row2} direction="left" speed={50} />

                {/* Bottom: Left to Right */}
                <MarqueeRow items={row3} direction="right" speed={50} />
            </div>
        </section>
    );
};

export default TechStack;
