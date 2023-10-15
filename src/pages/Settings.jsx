import React, { useState } from 'react';
import Profile from '../components/Sections/Settings/Profile';
import Tab from '../components/Sections/Settings/Tab';
import TabContent from '../components/Sections/Settings/TabContent';
import BaseLayout from '../components/Layout/BaseLayout/BaseLayout';
import { switchMode } from '../hooks/switchMode';
import { useContext } from 'react';
const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // to check which tab is hovered
  const [hoveredTab, setHoveredTab] = useState('');

  const handleTabClick = tabId => {
    setActiveTab(tabId);
  };

  // coming soon showing when other tabs are hovered

  const [isHover, setIsHover] = useState(false);

  const handleHover = id => {
    if (id !== 'profile-tab') {
      setHoveredTab(id);
    }
    setIsHover(true);
  };
  const handleHoverGo = () => {
    setHoveredTab('');
    setIsHover(false);
  };

  const Tabs = [
    {
      title: 'Profile',
      aria_controls: 'profile',
      id: 'profile-tab',
    },
    {
      title: 'Notification',
      aria_controls: 'notification',
      id: 'notification-tab',
    },
    {
      title: 'Integrations',
      aria_controls: 'integrations',
      id: 'integration-tab',
    },
    {
      title: 'Manage subscription',
      aria_controls: 'manage_subscription',
      id: 'subscriptions-tab',
    },
  ];

  const { selectedMode } = useContext(switchMode);

  return (
    <BaseLayout>
      <div className={`w-full overflow-y-scroll`}>
        <div className="flex flex-col items-start justify-start w-full gap-4 mb-[1rem] mx-auto 3xl:px-0 px-8 max-w-[1500px]">
          <h1
            className={`w-36 h-10 font-medium text-[28px] sm:text-[30px] ${
              selectedMode === 'dark' ? 'text-white' : 'text-neutral-700'
            } pl-4 sm:pl-0 text-start`}
          >
            Settings
          </h1>
          <div className="w-full flex  justify-center max-w-[824px] flex-col items-start">
            {/* Tabs */}
            <ul
              className="flex flex-wrap gap-6 pl-5 -mb-px text-xs font-medium text-center sm:text-sm sm:pl-0"
              id="myTab"
              role="tablist"
            >
              {Tabs.map(tab => {
                return (
                  <li className="" role="presentation">
                    <Tab
                      key={tab.id}
                      id={tab.id}
                      aria_controls={tab.aria_controls}
                      title={tab.title}
                      activeTab={activeTab}
                      onClick={() => handleTabClick(tab.aria_controls)}
                      onMouseEnter={() => handleHover(tab.id)}
                      onMouseLeave={handleHoverGo}
                      isHover={isHover}
                      hoveredTab={hoveredTab}
                    />
                  </li>
                );
              })}
            </ul>

            {/* Tabs content */}
            <div className="w-full max-w-[800px]">
              {/* Profile */}
              <TabContent
                id={'profile'}
                aria_labelledby={'profile-tab'}
                activeTab={activeTab}
              >
                <Profile />
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Settings;
