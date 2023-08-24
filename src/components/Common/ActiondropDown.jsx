import React, { useState } from "react";
import SortBy from "../../assets/sortBy.svg";

export const MenuItem = ({ name, onClick, type, isSelected }) => {
  return (
    <React.Fragment>
      <p
        className={`text-base font-normal text-neutral-800 hover:bg-neutral-200 text-start rounded-lg px-2 py-1 ${
          isSelected && "bg-neutral-200"
        }`}
        onClick={() => onClick(type)}
      >
        {name}
      </p>
    </React.Fragment>
  );
};

export const SortActions = ({ name, menuItems }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const lastIndex = menuItems.length - 1;
  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-white gap-2 border"
    >
      <img src={SortBy} alt="" />
      <span className="text-sm font-medium">Sort By</span>

      {/* dropdown */}
      {showDropdown && (
        <div className="w-[188px] rounded border absolute z-50 top-[50px] right-0 border-white p-1 bg-neutral-100 drop-shadow">
          {menuItems.map((menItem, index) => (
            <>
            <MenuItem
              name={menItem.name}
              onClick={menItem.onClick}
              type={menItem.type}
              key={menItem.type}
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

export const FilterActions = ({ menuItems,selectedFilters }) => {
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
        <div className="w-[188px] rounded border absolute z-50 bottom-[-140px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
          {menuItems.map((menItem, index) => (
            <>
            <MenuItem
              name={menItem.name}
              onClick={menItem.onClick}
              lastIndex={lastIndex}
              tag={menItem.tag}
              isSelected={selectedFilters.findIndex(sfItem => sfItem===menItem.name) > 0}
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
