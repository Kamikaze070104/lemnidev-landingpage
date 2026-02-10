import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'Pengembangan Aplikasi',
        description: 'Pembuatan aplikasi Website, Mobile, dan Desktop yang dirancang custom sesuai kebutuhan, andal, dan aman.',
        number: '01'
    },
    {
        title: 'AI Workflow & Automasi',
        description: 'Merancang workflow cerdas untuk mengotomasi proses bisnis (Chatbot, Voicebot, Data Processing) guna meningkatkan efisiensi.',
        number: '02'
    },
    {
        title: 'Integrasi Sistem',
        description: 'Menghubungkan aplikasi baru dengan sistem yang sudah ada (existing system) melalui API yang handal.',
        number: '03'
    },
    {
        title: 'Maintenance & Scaling',
        description: 'Layanan pemeliharaan berkelanjutan dan pengembangan fitur lanjutan untuk memastikan performa optimal.',
        number: '04'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-32 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-16">
                    Layanan Kami
                </h2>

                <div className="space-y-4">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group border-t border-white/10 hover:border-indigo-500/50 transition-colors duration-500"
                        >
                            <div className="py-12 flex flex-col md:flex-row md:items-start gap-8 md:gap-32 cursor-pointer">
                                <span className="text-xl md:text-2xl font-mono text-gray-500 group-hover:text-indigo-400 transition-colors">
                                    {service.number}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-indigo-200 transition-colors">
                                        {service.title}
                                    </h3>
                                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                                        <p className="text-lg text-gray-400 mt-4 max-w-2xl">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>
        </section>
    );
};

export default Services;
