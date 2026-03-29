import React from 'react';
import { Hero } from '../components/Hero';
import { SchemeCarousel } from '../components/SchemeCarousel';
import { StatsStrip, HowItWorks, CategoriesGrid, PersonalisationCTA, Footer } from '../components/Sections';
import SchemeFinder from '../components/SchemeFinder';
import PersonalisedSchemesSection from '../components/PersonalisedSchemesSection';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { token } = useAuth();

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

      {/* Personalised schemes — only shown when user is logged in */}
      {token && <PersonalisedSchemesSection variant="home" />}

      <PersonalisationCTA />
      <Footer />
    </>
  );
};

export default HomePage;
