import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import TechStack from '../components/sections/TechStack';
import Work from '../components/sections/Work';
import Team from '../components/sections/Team';
import ClientsTestimonials from '../components/sections/ClientsTestimonials';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
    return (
        <div className="bg-neutral-950 min-h-screen">
            <Hero />
            <About />
            <Services />
            <TechStack />
            <Work />
            <Team />
            <ClientsTestimonials />
            <Contact />
        </div>
    );
};

export default Home;
