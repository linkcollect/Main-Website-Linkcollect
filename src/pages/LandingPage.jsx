import React from "react";
import Navbar from "../components/Sections/LandingPage/Navbar";
import HeroSection from "../components/Sections/LandingPage/HeroSection";
import Features from "../components/Sections/LandingPage/Features";
import { Helmet } from "react-helmet";
const LandingPage = ({ windowWidth }) => {
  return (
    <>
    <Helmet>
      <title>Linkcollect</title>
    </Helmet>
      <Navbar windowWidth={windowWidth} />
      <HeroSection />
      <Features windowWidth={windowWidth} />
    </>
  );
};

export default LandingPage;
