import React from "react";
import Navbar from "../components/Sections/LandingPage/Navbar";
import HeroSection from "../components/Sections/LandingPage/HeroSection";
import Features from "../components/Sections/LandingPage/Features";
import SEO from "../components/SEO/SEO";
const LandingPage = ({ windowWidth }) => {
  return (
    <>
    <SEO > 
    </SEO>
      <Navbar windowWidth={windowWidth} />
      <HeroSection />
      <Features windowWidth={windowWidth} />
    </>
  );
};

export default LandingPage;
