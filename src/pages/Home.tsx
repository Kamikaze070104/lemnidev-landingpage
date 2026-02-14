import React, { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import SectionLoader from '@/components/common/SectionLoader';

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

            {/* Lazy loaded sections */}
            <Suspense fallback={<SectionLoader />}>
                <Services />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <TechStack />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Work />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Team />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <ClientsTestimonials />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Contact />
            </Suspense>
        </div>
    );
};

export default Home;
