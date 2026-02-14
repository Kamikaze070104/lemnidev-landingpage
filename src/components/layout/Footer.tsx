import React from 'react';
import { Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/logoA.webp';

const Footer: React.FC = () => {

    return (
        <footer className="bg-neutral-900 border-t border-white/10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <img src={logo} alt="Lemnidev Logo" className="h-24 w-auto invert brightness-0 mb-6" />
                        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                            Tim teknologi terpercaya yang menghadirkan solusi digital dan AI melalui pengembangan aplikasi dan workflow cerdas yang modern dan efisien.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold mb-6 text-white text-sm uppercase tracking-widest">Navigasi</h4>
                        <ul className="space-y-3 text-sm">
                            {['Home', 'About', 'Services', 'Work', 'Team', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1 group"
                                    >
                                        {item}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-6 text-white text-sm uppercase tracking-widest">Connect</h4>
                        <div className="flex space-x-3 mb-6">
                            <a href="https://github.com/lemnidev" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300">
                                <Github size={18} />
                            </a>
                            <a href="https://instagram.com/lemnidev" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                        </div>
                        <a
                            href="mailto:agungfathul14@gmail.com"
                            className="flex items-center text-gray-500 hover:text-indigo-400 transition-colors text-sm group gap-2"
                        >
                            <Mail size={14} />
                            agungfathul14@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} Lemnidev. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
