import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import LazySection from '@/components/common/LazySection';

// Lazy load below-the-fold sections to improve initial load time (LCP)
const Services = React.lazy(() => import('@/components/sections/Services'));
const TechStack = React.lazy(() => import('@/components/sections/TechStack'));
const Work = React.lazy(() => import('@/components/sections/Work'));
const Team = React.lazy(() => import('@/components/sections/Team'));
const ClientsTestimonials = React.lazy(() => import('@/components/sections/ClientsTestimonials'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));

const Home: React.FC = () => {
    return (
        <div className="bg-neutral-950 min-h-screen">
            {/* Eager loaded sections (Above the fold + immediate scroll) */}
            <Hero />
            <About />

            {/* Lazy loaded sections - only fetched when nearing viewport */}
            <LazySection minHeight="800px">
                <Services />
            </LazySection>

            <LazySection minHeight="600px">
                <TechStack />
            </LazySection>

            <LazySection minHeight="800px">
                <Work />
            </LazySection>

            <LazySection minHeight="700px">
                <Team />
            </LazySection>

            <LazySection minHeight="600px">
                <ClientsTestimonials />
            </LazySection>

            <LazySection minHeight="500px">
                <Contact />
            </LazySection>
        </div>
    );
};

export default Home;
