import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoB.png'; // Assuming logoA is the main logo

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' }, // This will scroll to sections in Home
        { title: 'Services', path: '/services' },
        { title: 'Work', path: '/work' },
        { title: 'Team', path: '/team' },
        { title: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-4 py-3 lg:py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Lemnidev Logo" className="h-10 lg:h-14 w-auto invert brightness-0 transition-all duration-300" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-8">
                    {navLinks.map((link) => (
                        <a // Changed to anchor tags for scrolling within the same page mostly, but let's stick to standard links for now and maybe implement scroll later
                            key={link.title}
                            href={`#${link.title.toLowerCase()}`} // Simple anchor linking for single page feel, or route if separate pages
                            className="text-sm font-medium hover:text-indigo-400 transition-colors"
                            onClick={() => {
                                // Optional: Smooth scroll logic if needed, but standard hash is fine for now
                            }}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-white p-2" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-neutral-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={`#${link.title.toLowerCase()}`}
                                    onClick={toggleMenu}
                                    className="text-lg font-medium hover:text-indigo-400 transition-colors"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
