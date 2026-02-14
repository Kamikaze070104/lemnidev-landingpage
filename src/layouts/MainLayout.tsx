import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/layout/Cursor';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const MainLayout: React.FC = () => {
    // Initialize Lenis smooth scrolling
    useSmoothScroll();

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-white cursor-none">
            <Cursor />
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
