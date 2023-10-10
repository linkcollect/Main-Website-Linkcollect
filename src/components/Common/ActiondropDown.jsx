import React, { useContext, useEffect, useState } from 'react';
import SortBy from '../../assets/sortBy.svg';
import GridView from '../../assets/GridView.svg';
import DarkSort from '../../assets/darkMode/darkmodeSortBy.svg';
import DarkGrid from '../../assets/darkMode/darkmodeGridView.svg';
import { motion } from 'framer-motion';
import { switchMode } from '../../hooks/switchMode';
export const MenuItem = ({ name, onClick, type, isSelected }) => {
  // getting selected mode for theme change
  const { selectedMode } = useContext(switchMode);

  return (
    <React.Fragment>
      <p
        className={`text-base font-normal ${
          selectedMode === 'light'
            ? 'text-neutral-800 hover:bg-neutral-200'
            : 'text-dark-placeholder hover:bg-dark-border'
        } text-start rounded-lg px-2 py-1 ${isSelected && 'bg-neutral-200'}`}
        onClick={() => onClick(type)}
      >
        {name}
      </p>
    </React.Fragment>
  );
};

export const SortActions = ({ name, menuItems, isOpen, toggleDropDown }) => {
  const lastIndex = menuItems.length - 1;

  useEffect(() => {
    window.addEventListener('click', e => {
      if (e.target.id !== 'sort' && isOpen) {
        toggleDropDown();
      }
    });

    return () => {
      window.removeEventListener('click', e => {
        if (e.target.id !== 'sort' && isOpen) {
          toggleDropDown();
        }
      });
    };
  }, [isOpen]);
  // getting selected mode for theme change
  const { selectedMode } = useContext(switchMode);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        toggleDropDown();
      }}
      className={`w-[3rem] px-2 sm:w-48 cursor-pointer h-[46px] relative sm:p-4 flex items-center justify-center rounded-lg ${
        selectedMode === 'dark'
          ? 'border-neutral-600 bg-dark-primary text-neutral-50'
          : 'border-neutral-300 bg-white '
      }  gap-2 border`}
    >
      {selectedMode === 'light' ? (
        <img src={name === 'Sort By' ? SortBy : GridView} alt="" />
      ) : (
        <img src={name === 'Sort By' ? DarkSort : DarkGrid} alt="" />
      )}
      <span className="hidden text-sm font-medium sm:block">{name}</span>

      {/* dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`w-[188px] rounded border absolute z-[1000] top-[50px] right-0 ${
            selectedMode === 'light'
              ? 'border-white  bg-neutral-100'
              : 'bg-dark-primary border-dark-border'
          } p-1 drop-shadow`}
        >
          {menuItems.map((menItem, index) => (
            <>
              <MenuItem
                key={menItem.name}
                name={menItem.name}
                onClick={menItem.onClick}
                type={menItem.type}
              />
              {index !== lastIndex && (
                <hr
                  className={`w-full border ${
                    selectedMode === 'dark'
                      ? 'border-dark-border'
                      : 'border-neutral-300'
                  } `}
                />
              )}
            </>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const FilterActions = ({ menuItems, selectedFilters }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const lastIndex = menuItems.length - 1;
  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-white gap-2 border"
    >
      <img src={SortBy} alt="" />
      <span className="text-sm font-medium">Filter</span>

      {/* dropdown */}
      {showDropdown && (
        <div className="w-[188px] rounded border absolute z-[100] bottom-[-140px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
          {menuItems.map((menItem, index) => (
            <>
              <MenuItem
                name={menItem.name}
                onClick={menItem.onClick}
                lastIndex={lastIndex}
                tag={menItem.tag}
                isSelected={
                  selectedFilters.findIndex(sfItem => sfItem === menItem.name) >
                  0
                }
              />
              {index !== lastIndex && (
                <hr className="w-full border border-neutral-300" />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};
