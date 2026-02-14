import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logoB.webp';

const navLinks = [
    { title: 'Home', target: 'home' },
    { title: 'About', target: 'about' },
    { title: 'Services', target: 'services' },
    { title: 'Work', target: 'work' },
    { title: 'Team', target: 'team' },
    { title: 'Contact', target: 'contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map(l => document.getElementById(l.target)).filter(Boolean);
            let current = 'home';

            for (const section of sections) {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150) {
                        current = section.id;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Move the active indicator pill
    useEffect(() => {
        if (!navContainerRef.current || !indicatorRef.current) return;
        const activeLink = navContainerRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
        if (!activeLink) return;

        const containerRect = navContainerRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        indicatorRef.current.style.left = `${linkRect.left - containerRect.left}px`;
        indicatorRef.current.style.width = `${linkRect.width}px`;
    }, [activeSection]);

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-3 lg:py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Lemnidev Logo" className="h-10 lg:h-14 w-auto invert brightness-0 transition-all duration-300" />
                </Link>

                {/* Desktop Menu */}
                <div ref={navContainerRef} className="hidden lg:flex items-center relative">
                    {/* Active indicator pill */}
                    <div
                        ref={indicatorRef}
                        className="absolute -bottom-1 h-[2px] bg-indigo-500 rounded-full transition-all duration-300 ease-out"
                    />
                    {navLinks.map((link) => (
                        <a
                            key={link.title}
                            href={`#${link.target}`}
                            data-section={link.target}
                            onClick={(e) => handleNavClick(e, link.target)}
                            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === link.target
                                ? 'text-indigo-400'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
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
                        className="lg:hidden bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={`#${link.target}`}
                                    onClick={(e) => handleNavClick(e, link.target)}
                                    className={`text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 ${activeSection === link.target
                                        ? 'text-indigo-400 bg-indigo-500/10'
                                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
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
