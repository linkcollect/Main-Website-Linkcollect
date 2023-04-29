import React from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Features from "../components/Features/Features";

const LandingPage = ({ windowWidth }) => {
  return (
    <>
      <Navbar windowWidth={windowWidth} />
      <HeroSection />
      <Features windowWidth={windowWidth} />
    </>
  );
};

export default LandingPage;
