import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Client Logos (text-based for now) ─── */
const clients = [
    'Voyag Velasco', 'PT. JSS', 'Olahraga Viral', 'Solusi Sehat',
    'Voyag Velasco', 'PT. JSS', 'Olahraga Viral', 'Solusi Sehat',
];

/* ─── Testimonials Data ─── */
const testimonials = [
    {
        name: 'Voyag Velasco',
        role: 'CEO, Voyag Marketplace',
        text: 'Lemnidev membantu kami membangun platform e-commerce yang robust dan scalable. Tim yang responsif dan sangat profesional.',
        rating: 5,
        gradient: 'from-indigo-500 to-cyan-500',
    },
    {
        name: 'PT. Jaya Sinergi',
        role: 'Manager, PT JSS',
        text: 'Company profile yang dibuat sangat modern dan merepresentasikan perusahaan kami dengan baik. Proses pengerjaan cepat dan komunikatif.',
        rating: 5,
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        name: 'Olahraga Viral',
        role: 'Founder, Olahraga Viral',
        text: 'Platform survey kami berjalan sangat smooth berkat kerja keras tim Lemnidev. Highly recommended untuk kebutuhan digital!',
        rating: 5,
        gradient: 'from-emerald-500 to-teal-500',
    },
];

/* ─── Infinite Marquee ─── */
const LogoMarquee: React.FC = () => (
    <div className="relative overflow-hidden py-12">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
                <div
                    key={i}
                    className="mx-8 md:mx-16 flex items-center gap-3 flex-shrink-0"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-indigo-400">
                        {client.charAt(0)}
                    </div>
                    <span className="text-lg md:text-xl font-semibold text-gray-500 hover:text-white transition-colors duration-300">
                        {client}
                    </span>
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
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.name.charAt(0)}
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
                {/* Client Logos */}
                <div className="text-center mb-4">
                    <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                        Dipercaya Oleh
                    </h2>
                </div>
                <LogoMarquee />

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
