import React, { useState } from 'react'
import Profile from './Profile';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div className='flex flex-col items-start justify-center w-full mx-2 my-12 sm:mx-12 gap-y-4'>
      <div className="flex flex-col items-start justify-center w-full gap-8">
        <h1 className="w-44 h-12 font-medium text-[28px] sm:text-[40px] leading-[50px] text-neutral-700 pl-4 sm:pl-0 text-start">Settings,</h1>
        <div className='w-full flex  justify-center max-w-[824px] flex-col items-start'>
          <ul className="flex flex-wrap pl-5 -mb-px text-xs font-medium text-center sm:text-sm sm:pl-0" id="myTab" role="tablist">
            <li className="" role="presentation">
              <button
                className={`inline-block sm:p-4 p-2 pl-0 font-normal text-xs sm:text-lg ${activeTab === 'profile' ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                id="profile-tab"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected={activeTab === 'profile'}
                onClick={() => handleTabClick('profile')}
              >
                Profile
                {activeTab === "profile" &&
                  <span class="block w-full transition-all duration-1000 h-0.5 bg-primary-500">
                  </span>
                }
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block p-2 sm:p-4 font-normal text-xs sm:text-lg ${activeTab === 'notifaction' ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                id="dashboard-tab"
                type="button"
                role="tab"
                aria-controls="notifaction"
                aria-selected={activeTab === 'notifaction'}
                onClick={() => handleTabClick('notifaction')}
              >
                Notifaction
                {activeTab === "notifaction" &&
                  <span class="block w-full transition-all duration-1000 h-0.5 bg-primary-500">
                  </span>
                }
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`inline-block p-2 sm:p-4 font-normal text-xs sm:text-lg ${activeTab === 'integrations' ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                id="settings-tab"
                type="button"
                role="tab"
                aria-controls="integrations"
                aria-selected={activeTab === 'integrations'}
                onClick={() => handleTabClick('integrations')}
              >
                Integrations
                {activeTab === "integrations" &&
                  <span class="block w-full transition-all duration-1000 h-0.5 bg-primary-500">
                  </span>
                }
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-2 sm:p-4 font-normal text-xs sm:text-lg ${activeTab === 'manage_subscription' ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                id="contacts-tab"
                type="button"
                role="tab"
                aria-controls="manage_subscription"
                aria-selected={activeTab === 'manage_subscription'}
                onClick={() => handleTabClick('manage_subscription')}
              >
                Manage subscription
                {activeTab === "manage_subscription" &&
                  <span class="block w-full transition-all duration-1000 h-0.5 bg-primary-500">
                  </span>
                }
              </button>
            </li>
          </ul>
          <div id="myTabContent" className='w-full max-w-[800px]'>
            <div
              className={`${activeTab === 'profile' ? 'block' : 'hidden'} w-full`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Profile />
            </div>
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'dashboard' ? 'block' : 'hidden'
                }`}
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's</strong>
              </p>
            </div>
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'settings' ? 'block' : 'hidden'
                }`}
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong className="font-medium text-gray-800 dark:text-white">Settings tab's</strong>
              </p>
            </div>
            <div
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'contacts' ? 'block' : 'hidden'
                }`}
              id="contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Settings