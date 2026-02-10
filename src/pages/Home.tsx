import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Work from '../components/sections/Work';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
    return (
        <div className="bg-neutral-950 min-h-screen">
            <Hero />
            <About />
            <Services />
            <Work />
            <Team />
            <Contact />
        </div>
    );
};

export default Home;
