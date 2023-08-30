import React from "react";
import Navbar from "../components/Sections/LandingPageV2/Navbar";
import Footer from "../components/Sections/LandingPageV2/Footer";
import Main from "../components/Sections/LandingPageV2/Main";

const LandingPageV2 = ({ windowWidth }) => {
    return (
      <div className="flex flex-col justify-between h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <Navbar />
        <Main />
        <Footer />
      </div>
    );
}

export default LandingPageV2;