import React from 'react';
import { Hero } from '../components/Hero';
import { SchemeCarousel } from '../components/SchemeCarousel';
import { StatsStrip, HowItWorks, CategoriesGrid, Footer } from '../components/Sections';

const HomePage = () => {
  return (
    <>
      <Hero />
      <SchemeCarousel />
      <StatsStrip />
      <HowItWorks />
      <CategoriesGrid />
      <Footer />
    </>
  );
};

export default HomePage;
