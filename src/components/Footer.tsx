import React from 'react';
import { Github, Instagram, Mail } from 'lucide-react';
import logo from '../assets/logoA.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                    <img src={logo} alt="Lemnidev Logo" className="h-30 w-auto invert brightness-0 mb-4" />
                    <p className="text-gray-400 text-sm max-w-sm">
                        Tim teknologi terpercaya yang menghadirkan solusi digital dan AI melalui pengembangan aplikasi dan workflow cerdas yang modern dan efisien.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Navigasi</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
                        <li><a href="#about" className="hover:text-indigo-400 transition-colors">About</a></li>
                        <li><a href="#services" className="hover:text-indigo-400 transition-colors">Services</a></li>
                        <li><a href="#work" className="hover:text-indigo-400 transition-colors">Work</a></li>
                        <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Connect</h4>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                    <a href="mailto:agungfathul14@gmail.com" className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                        <Mail size={16} className="mr-2" /> agungfathul14@gmail.com
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Lemnidev. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
