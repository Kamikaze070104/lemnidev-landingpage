import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        const textEl = textRef.current;

        if (el && textEl) {
            gsap.fromTo(
                textEl.children,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <div ref={textRef} className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-8">
                        <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">
                            Tentang Kami
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                            Mitra Teknologi Terpercaya untuk Transformasi Digital
                        </h3>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Lemnidev adalah tim teknologi yang menyediakan layanan pengembangan aplikasi dan perancangan AI Workflow. Kami berdedikasi membantu organisasi membangun sistem digital yang efisien, aman, dan berkelanjutan.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 pt-8">
                        <div className="space-y-4">
                            <h4 className="text-2xl font-bold text-white border-b border-indigo-500 pb-2 inline-block">Visi</h4>
                            <p className="text-gray-400">
                                Menjadi tim teknologi terpercaya yang menghadirkan solusi digital dan AI melalui pengembangan aplikasi dan workflow cerdas yang modern dan efisien serta berdampak nyata bagi bisnis dan institusi.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-2xl font-bold text-white border-b border-indigo-500 pb-2 inline-block">Misi</h4>
                            <ul className="space-y-2 text-gray-400 list-disc pl-5">
                                <li>Solusi pengembangan aplikasi andal & aman.</li>
                                <li>Implementasi AI Workflow untuk efisiensi.</li>
                                <li>Continuous Improvement (Filosofi Lemniskat ∞).</li>
                                <li>Sistem fleksibel dan scalable.</li>
                                <li>Prioritas pada keamanan data.</li>
                                <li>Kemitraan jangka panjang.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
