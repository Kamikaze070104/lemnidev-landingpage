import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Main heading — horizontal clip reveal (wipe from left)
            gsap.fromTo(
                '.contact-heading',
                { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
                {
                    opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.5, ease: 'power4.inOut',
                    scrollTrigger: { trigger: '.contact-heading', start: 'top 80%', toggleActions: 'play none none reverse' },
                }
            );

            // Contact links — alternate from left and right
            const links = sectionRef.current!.querySelectorAll('.contact-link');
            links.forEach((link, i) => {
                gsap.fromTo(link,
                    { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: link, start: 'top 88%', toggleActions: 'play none none reverse' },
                    }
                );
            });

            // CTA button — zoom + spin in
            gsap.fromTo(
                '.contact-cta',
                { scale: 0.5, opacity: 0, rotate: -10 },
                {
                    scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: '.contact-cta', start: 'top 90%', toggleActions: 'play none none reverse' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-32 bg-neutral-950 text-white flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-8">
                    Hubungi Kami
                </h2>
                <h3 className="contact-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tighter">
                    Mari Berkolaborasi.
                </h3>

                <div className="contact-links flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                    <a
                        href="mailto:agungfathul14@gmail.com"
                        className="contact-link flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors group"
                    >
                        <div className="p-3 bg-neutral-900 rounded-full group-hover:bg-indigo-500/20 transition-colors duration-300">
                            <Mail size={24} className="text-indigo-500" />
                        </div>
                        agungfathul14@gmail.com
                    </a>
                    <a
                        href="tel:+6281312669080"
                        className="contact-link flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors group"
                    >
                        <div className="p-3 bg-neutral-900 rounded-full group-hover:bg-indigo-500/20 transition-colors duration-300">
                            <Phone size={24} className="text-indigo-500" />
                        </div>
                        +62 813-1266-9080
                    </a>
                </div>

                <a
                    href="https://wa.me/6281312669080?text=Halo%20Lemnidev,%20saya%20tertarik%20untuk%20berdiskusi%20tentang%20proyek..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-cta inline-block px-12 py-6 bg-white text-neutral-950 text-xl font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                    Diskusikan Proyek
                </a>
            </div>
        </section>
    );
};

export default Contact;
