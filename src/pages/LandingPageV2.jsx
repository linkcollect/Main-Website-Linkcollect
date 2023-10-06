import React, { useEffect, useState } from 'react';
// components
import Navbar from '../components/Sections/LandingPageV2/Navbar';
import Footer from '../components/Sections/LandingPageV2/Footer';
import Main from '../components/Sections/LandingPageV2/Main';
// api
import { getExplore } from '../api-services/collectionService';
// analytics
import ReactGA from 'react-ga4';
const trackingId = 'G-6NHCQSCVJP';

ReactGA.initialize([
  {
    trackingId: trackingId,
  },
]);

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
  return { data: exploreData.sort((a, b) => b.views - a.views) };
};

const LandingPageV2 = ({ windowWidth }) => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/',
    title: 'landing page',
  });

  function trackGA(category, action, label) {
    ReactGA.event({ category, action, label });
  }

  const exploreData = useExploreData();
  return (
    <div className="flex flex-col justify-between h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <Navbar analytics={trackGA} />
      <Main
        analytics={trackGA}
        exploreData={exploreData}
        windowWidth={windowWidth}
      />
      <Footer analytics={trackGA} />
    </div>
  );
};

export default LandingPageV2;
