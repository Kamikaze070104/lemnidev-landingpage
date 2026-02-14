import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

// Import Logos
import logoVoyag from '../../assets/logo/logo-voyag-velasco.png';
import logoJSS from '../../assets/logo/LogoJSS.png';
import logoOlahraga from '../../assets/logo/olahraga.webp';
import logoSehat from '../../assets/logo/sehat.png';
import logoIKB from '../../assets/logo/IKB.png';
import logoVoyagStuff from '../../assets/logo/voyagstuff-logo.jpg';
import RAV from '../../assets/logo/RAV.png';
import edubot from '../../assets/logo/edubot.jpg';
import solusi from '../../assets/logo/solusi.png';
import pyromi from '../../assets/logo/pyromi.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─── Client Logos Data ─── */
const clientLogos = [
    { name: 'Voyag Velasco', src: logoVoyag },
    { name: 'PT. Jaya Sinergi Sentosa', src: logoJSS },
    { name: 'Olahraga Viral', src: logoOlahraga },
    { name: 'Solusi Sehat', src: logoSehat },
    { name: 'IKB', src: logoIKB },
    { name: 'Voyag Stuff', src: logoVoyagStuff },
    { name: 'RAV', src: RAV },
    { name: 'Edubot', src: edubot },
    { name: 'Solusi', src: solusi },
    { name: 'Pyromi', src: pyromi },
];

/* ─── Testimonials Data ─── */
const testimonials = [
    {
        name: 'Voyag Velasco',
        role: 'CEO, Voyag Marketplace',
        text: 'Lemnidev membantu kami membangun platform e-commerce yang robust dan scalable. Tim yang responsif dan sangat profesional.',
        rating: 4,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: logoVoyag,
    },
    {
        name: 'PT. Jaya Sejahtera Suksesindo',
        role: 'Manager, PT JSS',
        text: 'Company profile yang dibuat sangat modern dan merepresentasikan perusahaan kami dengan baik. Proses pengerjaan cepat dan komunikatif.',
        rating: 5,
        gradient: 'from-purple-500 to-pink-500',
        logo: logoJSS,
    },
    {
        name: 'Olahraga Viral',
        role: 'Founder, Olahraga Viral',
        text: 'Platform survey kami berjalan sangat smooth berkat kerja keras tim Lemnidev. Highly recommended untuk kebutuhan digital!',
        rating: 5,
        gradient: 'from-emerald-500 to-teal-500',
        logo: logoOlahraga,
    },
];

/* ─── Logo Grid Component ─── */
const LogoGrid: React.FC = () => (
    <div className="py-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-13 items-center justify-items-center">
            {clientLogos.map((client, i) => (
                <div
                    key={i}
                    className="group relative w-full flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default"
                >
                    <img
                        src={client.src}
                        alt={client.name}
                        className="max-h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    </div>
);

/* ─── Testimonial Card ─── */
const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => (
    <div className="testimonial-card relative p-8 rounded-3xl border border-white/[0.08] bg-neutral-900/40 hover:border-white/20 transition-all duration-500 group overflow-hidden">
        {/* Background gradient on hover */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 blur-3xl`} />

        <div className="relative z-10">
            {/* Quote icon */}
            <div className="mb-6">
                <Quote size={32} className="text-indigo-500/30" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
            </div>

            {/* Text */}
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                    <img
                        src={testimonial.logo}
                        alt={testimonial.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
            </div>
        </div>
    </div>
);

/* ─── Main Section ─── */
const ClientsTestimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading — slide up with clip-path reveal from below
            gsap.fromTo('.clients-heading', { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }, {
                y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2, ease: 'power4.out',
                scrollTrigger: { trigger: '.clients-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
            });

            // Testimonial cards — alternate left/right with rotation
            const cards = sectionRef.current!.querySelectorAll('.testimonial-card');
            cards.forEach((card, i) => {
                const fromLeft = i % 2 === 0;
                gsap.fromTo(card,
                    { x: fromLeft ? -100 : 100, opacity: 0, rotate: fromLeft ? -5 : 5 },
                    {
                        x: 0, opacity: 1, rotate: 0,
                        duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="clients" ref={sectionRef} className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Client Logos / List */}
                <div className="mb-12">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                            Dipercaya Oleh
                        </h2>
                    </div>

                    <LogoGrid />
                </div>

                {/* Testimonials */}
                <div className="mt-20 mb-8 text-center">
                    <h3 className="clients-heading text-3xl md:text-5xl font-bold mb-4">
                        Apa Kata Mereka
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Kepuasan klien adalah prioritas utama kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsTestimonials;
