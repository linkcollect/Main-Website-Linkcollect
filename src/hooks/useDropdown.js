import { useState } from 'react';

const useDropdown = () => {
  const [isSortByDropdownOpen, setSortByDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setViewDropdownOpen] = useState(false);

  const toggleSortByDropdown = () => {
    setSortByDropdownOpen(!isSortByDropdownOpen);
    if (isViewDropdownOpen) {
      setViewDropdownOpen(false);
    }
  };

  const toggleViewDropdown = () => {
    setViewDropdownOpen(!isViewDropdownOpen);
    if (isSortByDropdownOpen) {
      setSortByDropdownOpen(false);
    }
  };

  return {
    isSortByDropdownOpen,
    isViewDropdownOpen,
    toggleSortByDropdown,
    toggleViewDropdown,
  };
};

export default useDropdown;
