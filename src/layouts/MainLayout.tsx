import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout: React.FC = () => {
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
