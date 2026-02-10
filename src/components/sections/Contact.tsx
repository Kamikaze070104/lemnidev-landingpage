import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-32 bg-neutral-950 text-white flex flex-col items-center justify-center min-h-[80vh]">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-8">
                        Hubungi Kami
                    </h2>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tighter">
                        Mari Berkolaborasi.
                    </h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                        <a
                            href="mailto:agungfathul14@gmail.com"
                            className="flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors"
                        >
                            <div className="p-3 bg-neutral-900 rounded-full">
                                <Mail size={24} className="text-indigo-500" />
                            </div>
                            agungfathul14@gmail.com
                        </a>
                        <a
                            href="tel:+6281312669080"
                            className="flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors"
                        >
                            <div className="p-3 bg-neutral-900 rounded-full">
                                <Phone size={24} className="text-indigo-500" />
                            </div>
                            +62 813-1266-9080
                        </a>
                    </div>

                    <a
                        href="https://wa.me/6281312669080?text=Halo%20Lemnidev,%20saya%20tertarik%20untuk%20berdiskusi%20tentang%20proyek..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-12 py-6 bg-white text-neutral-950 text-xl font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        Diskusikan Proyek
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
