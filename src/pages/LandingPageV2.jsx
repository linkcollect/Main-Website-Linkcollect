import React, { useEffect, useState } from "react";
// components
import Navbar from "../components/Sections/LandingPageV2/Navbar";
import Footer from "../components/Sections/LandingPageV2/Footer";
import Main from "../components/Sections/LandingPageV2/Main";
// api
import { getExplore } from '../api-services/collectionService';

const useExploreData = () => {
  const [exploreData, setExploreData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExplore();
        setExploreData([...res.data.data.slice(0, 20)]);
      } catch (error) {
        console.error('Error fetching explore data:', error);
      }
    };
    fetchData();
  }, []);
  return { data: exploreData };
};

const LandingPageV2 = ({ windowWidth }) => {
  const exploreData = useExploreData();
  return (
    <div className="flex flex-col justify-between h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <Navbar />
      <Main exploreData={exploreData} />
      <Footer />
    </div>
  );
};

export default LandingPageV2;
