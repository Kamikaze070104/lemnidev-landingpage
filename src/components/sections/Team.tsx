import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
    { name: 'Bentar Ristianto', role: 'Head of Solution' },
    { name: 'Muh. Athif Fadh', role: 'Keuangan' },
    { name: 'Agung Fathul', role: 'Human Relation' },
    { name: 'Davi Hanan Luthfi A', role: 'Fullstack Developer' },
    { name: 'M Fadhly R', role: 'Machine Learning' },
    { name: 'M Dzakkir Kilman', role: 'Front-End Developer' },
    { name: 'Faizal Azzriel', role: 'Developer' },
    { name: 'Ummam Hoerussifa', role: 'Machine Learning' },
    { name: 'Rakandiya', role: 'Back-End Developer' },
    { name: 'Rangga Ali', role: 'IoT Developer' },
    { name: 'Najwa Ikhsaniyah', role: 'Desain Visual' },
    { name: 'M Nazlan Rizqon', role: 'Desain Animasi' },
];

const Team: React.FC = () => {
    return (
        <section id="team" className="py-32 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4 text-center">
                    Tim Kami
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Meet the Minds Behind Lemnidev
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-neutral-800/50 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/50 transition-colors text-center group"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                                {member.name.charAt(0)}
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{member.name}</h4>
                            <p className="text-sm text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
