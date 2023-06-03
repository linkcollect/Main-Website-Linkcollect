import React from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Features from "../components/Features/Features";
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
