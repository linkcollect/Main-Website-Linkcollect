import { createContext, useEffect, useState } from 'react';

export const switchMode = createContext("");

// Provider
export const ThemeProvider = ({ children }) => {
  
  const currentTheme = localStorage?.getItem('theme')
  // dark and light mode switch
  const [selectedMode, setSelectedMode] = useState(currentTheme || 'light')

  useEffect(() => {
    localStorage.setItem('theme', selectedMode)
  }, [selectedMode])
  return (
    <switchMode.Provider value={{ selectedMode, setSelectedMode }}>
      {children}
    </switchMode.Provider>
  );
};