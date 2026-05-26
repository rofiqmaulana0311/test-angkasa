/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import CustomCursor from './components/CustomCursor';
import StarCanvas from './components/StarCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-deep-space select-none text-white selection:bg-cosmic-blue/30 selection:text-white antialiased">
        {/* Premium custom interactive elements */}
        <CustomCursor />
        <StarCanvas />

        {/* Main Structural Blocks */}
        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          <Services />
          <Portfolio />
          <Testimonials />
          <Process />
          <Pricing />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

