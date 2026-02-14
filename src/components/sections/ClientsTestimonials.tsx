import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, StarHalf, ArrowLeft, ArrowRight } from 'lucide-react';

// Import Logos
import logoVoyag from '@/assets/logo/logo-voyag-velasco.webp';
import logoJSS from '@/assets/logo/LogoJSS.webp';
import logoOlahraga from '@/assets/logo/olahraga.webp';
import logoSehat from '@/assets/logo/sehat.webp';
import logoIKB from '@/assets/logo/IKB.webp';
import logoVoyagStuff from '@/assets/logo/voyagstuff-logo.webp';
import RAV from '@/assets/logo/RAV.webp';
import edubot from '@/assets/logo/edubot.webp';
import solusi from '@/assets/logo/solusi.webp';
import pyromi from '@/assets/logo/pyromi.webp';

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

/* ─── Testimonials Data (Expanded) ─── */
const testimonials = [
    {
        name: 'Voyag Stuff',
        role: 'CEO, Voyag Marketplace',
        text: 'Lemnidev membantu kami membangun platform e-commerce yang robust dan scalable. Tim yang responsif dan sangat profesional.',
        rating: 4.5,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: logoVoyagStuff,
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
        rating: 4.5,
        gradient: 'from-emerald-500 to-teal-500',
        logo: logoOlahraga,
    },
    {
        name: 'Solusi Sehat',
        role: 'Director, Solusi Sehat',
        text: 'Transformasi digital klinik kami berjalan lancar. Sistem manajemen pasien yang dibangun sangat membantu operasional harian.',
        rating: 4,
        gradient: 'from-orange-500 to-red-500',
        logo: logoSehat,
    },
    {
        name: 'IKB Group',
        role: 'CTO, IKB',
        text: 'Dedikasi tim Lemnidev luar biasa. Mereka tidak hanya coding, tapi memberikan solusi teknis yang efisien untuk masalah bisnis kami.',
        rating: 5,
        gradient: 'from-blue-500 to-indigo-600',
        logo: logoIKB,
    },
    {
        name: 'RAV Corp',
        role: 'Owner, RAV',
        text: 'Website portofolio yang elegan dan cepat. SEO-nya juga bagus, traffic website kami meningkat signifikan sejak redesign.',
        rating: 4.5,
        gradient: 'from-pink-500 to-rose-500',
        logo: RAV,
    },
    {
        name: 'Edubot',
        role: 'CEO, Edubot',
        text: 'Lemnidev membantu kami membangun platform e-commerce yang robust dan scalable. Tim yang responsif dan sangat profesional.',
        rating: 5,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: edubot,
    },
    {
        name: 'Solusi',
        role: 'CEO, Solusi',
        text: 'Lemnidev membantu kami membangun platform LMS yang robust dan scalable. Tim yang responsif dan sangat profesional.',
        rating: 3.5,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: solusi,
    },
    {
        name: 'Pyromi',
        role: 'CEO, Pyromi',
        text: 'Lemnidev membantu kami mengintegrasikan Kecerdasan Buatan ke dalam website kami. Luar biasa.',
        rating: 4.5,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: pyromi,
    },
    {
        name: 'Voyag Velasco',
        role: 'CEO, Voyag Velasco',
        text: 'Tim lemnidev membantu saya mengembangkan bisnis top up game online saya. Lebih dari itu, mereka juga memberikan solusi yang paling efektif dan efisien. Saya sangat menyarankan tim lemnidev.',
        rating: 4.5,
        gradient: 'from-indigo-500 to-cyan-500',
        logo: logoVoyag,
    },
];

/* ─── Logo Grid Component ─── */
const LogoGrid: React.FC = () => (
    <div className="py-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-13 items-center justify-items-center">
            {clientLogos.map((client, i) => (
                <div
                    key={i}
                    className="group cursor-target relative w-full flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-default"
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
const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0]; isActive?: boolean }> = ({ testimonial, isActive = true }) => (
    <div className={`testimonial-card cursor-target relative p-8 rounded-3xl border border-white/[0.08] bg-neutral-900/40 transition-all duration-500 group overflow-hidden h-full flex flex-col justify-between ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95 blur-[1px]'}`}>

        {/* Background gradient on hover */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 blur-3xl`} />

        <div className="relative z-10">
            {/* Quote icon */}
            <div className="mb-6 flex justify-between items-start">
                <Quote size={32} className="text-indigo-500/30" />
                {/* Stars */}
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        if (testimonial.rating >= starValue) {
                            return <Star key={i} size={16} className="text-amber-400 fill-amber-400" />;
                        } else if (testimonial.rating >= starValue - 0.5) {
                            return (
                                <div key={i} className="relative">
                                    <Star size={16} className="text-neutral-700" />
                                    <StarHalf size={16} className="absolute top-0 left-0 text-amber-400 fill-amber-400" />
                                </div>
                            );
                        } else {
                            return <Star key={i} size={16} className="text-neutral-700" />;
                        }
                    })}
                </div>
            </div>

            {/* Text */}
            <p className="text-gray-300 leading-relaxed mb-8 text-lg line-clamp-4">
                "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                    <img
                        src={testimonial.logo}
                        alt={testimonial.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
            </div>
        </div>
    </div>
);

/* ─── Main Section ─── */
const ClientsTestimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Drag State
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    // Auto slide configuration
    const AUTO_SLIDE_INTERVAL = 4500;

    // Duplicate testimonials (3x instead of 6x for optimized DOM size)
    const extendedTestimonials = [
        ...testimonials, ...testimonials, ...testimonials
    ];

    const nextSlide = () => {
        if (activeIndex >= extendedTestimonials.length - 3) {
            setActiveIndex(0);
        } else {
            setActiveIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (activeIndex <= 0) {
            setActiveIndex(0);
        } else {
            setActiveIndex((prev) => prev - 1);
        }
    };

    // Auto Run
    useEffect(() => {
        if (isPaused || isDragging) return;
        const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, [isPaused, isDragging, activeIndex]);

    // Handle Drag Events
    const handleDragStart = (clientX: number) => {
        setIsDragging(true);
        setDragStart(clientX);
        setIsPaused(true);
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        const diff = clientX - dragStart;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const threshold = 50; // min px to trigger slide

        if (dragOffset < -threshold) {
            nextSlide();
        } else if (dragOffset > threshold) {
            prevSlide();
        }

        setDragOffset(0);
        setIsPaused(false);
    };

    // Mouse Events
    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
        if (isDragging) handleDragEnd();
        setIsPaused(false);
    };

    // Touch Events
    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            // Create a timeline for the entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%', // Start animation when section is 30% into view
                    toggleActions: 'play none none reverse',
                }
            });

            // Animate Heading Elements
            tl.fromTo('.clients-label',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo('.clients-heading',
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo('.clients-desc',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.8'
                );

            // Animate Logo Grid
            tl.fromTo('.logo-grid',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.4'
            );

            // Animate Carousel
            tl.fromTo('.carousel-container',
                { scale: 0.95, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)' },
                '-=0.6'
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="clients" ref={sectionRef} className="py-32 bg-neutral-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="clients-label text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4">
                        Klien Kami
                    </h2>
                    <h3 className="clients-heading text-3xl md:text-5xl font-bold mb-4">
                        Dipercaya Oleh Perusahaan
                    </h3>
                    <p className="clients-desc text-gray-400 max-w-2xl mx-auto">
                        Kami bangga menjadi bagian dari perjalanan digital mereka.
                    </p>
                </div>

                {/* Logo Grid */}
                <div className="logo-grid mb-24">
                    <LogoGrid />
                </div>

                {/* Carousel Area */}
                <div
                    className="carousel-container relative max-w-7xl mx-auto px-4 md:px-12 select-none"
                    onMouseEnter={() => setIsPaused(true)}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-800/80 hover:bg-indigo-600 text-white border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110 disabled:opacity-0"
                        aria-label="Previous testimonial"
                        disabled={activeIndex === 0}
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-800/80 hover:bg-indigo-600 text-white border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={20} />
                    </button>

                    {/* Slider Track Wrapper */}
                    <div
                        className="overflow-hidden py-10 -my-10 cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseLeave}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className="flex will-change-transform [--items-per-screen:1] md:[--items-per-screen:2] lg:[--items-per-screen:3]"
                            style={{
                                transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                                transform: `translateX(calc( (-100% * ${activeIndex} / var(--items-per-screen)) + ${dragOffset}px ))`,
                            }}
                        >
                            {extendedTestimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                                >
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        isActive={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simple Dots for first set only (optional) */}
                    <div className="flex justify-center gap-2 mt-8">
                        <div className="flex gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-300 ${(activeIndex % 4) === i ? 'w-8 bg-indigo-500' : 'w-2 bg-neutral-700'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ClientsTestimonials;
