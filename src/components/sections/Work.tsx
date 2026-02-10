import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import proj1 from '../../assets/projek/1.png';
import proj2 from '../../assets/projek/2.png';
import proj3 from '../../assets/projek/3.png';
import proj4 from '../../assets/projek/4.png';
import proj5 from '../../assets/projek/5.png';

const projects = [
    {
        id: 1,
        title: 'Voyage Marketplace',
        category: 'E-Commerce Website',
        image: proj1,
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-2',
        link: 'https://voyagstuff.voyagvelasco.com/home'
    },
    {
        id: 2,
        title: 'Solusi Sehat',
        category: 'Health Platform',
        image: proj5,
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1',
        link: 'https://solusi-sehat.olahragaviral.id/'
    },
    {
        id: 3,
        title: 'voyag velasco topup',
        category: 'topup website',
        image: proj2,
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1',
        link: 'https://voyagvelasco.com/'
    },
    {
        id: 4,
        title: 'Olahraga Viral',
        category: 'Survey Platform',
        image: proj4,
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1',
        link: 'https://olahragaviral.id/'
    },
    {
        id: 5,
        title: 'company profile PT.JSS',
        category: 'website webprofile',
        image: proj3,
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1',
        link: 'https://jss.olahragaviral.id/'
    },
];

const Work: React.FC = () => {
    return (
        <section id="work" className="py-32 bg-neutral-950 text-white">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                        Proyek Kami
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold">
                        Karya Tebaru
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 ${project.colSpan} ${project.rowSpan}`}
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-sm text-indigo-400 font-medium mb-2 block">
                                            {project.category}
                                        </span>
                                        <h4 className="text-2xl font-bold text-white mb-2">
                                            {project.title}
                                        </h4>
                                    </div>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-white text-neutral-950 p-3 rounded-full opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-indigo-500 hover:text-white">
                                        <ArrowUpRight size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
