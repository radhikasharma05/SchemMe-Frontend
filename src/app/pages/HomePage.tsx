import React from 'react';
import { Hero } from '../components/Hero';
import { SchemeCarousel } from '../components/SchemeCarousel';
import { StatsStrip, HowItWorks, CategoriesGrid, PersonalisationCTA, Footer } from '../components/Sections';
import SchemeFinder from '../components/SchemeFinder';

const HomePage = () => {
  return (
    <>
      <Hero />
      <SchemeFinder />
      <div id="popular-schemes">
        <SchemeCarousel />
      </div>
      <StatsStrip />
      <HowItWorks />
      <CategoriesGrid />
      <PersonalisationCTA />
      <Footer />
    </>
  );
};

export default HomePage;
