import { createContext, useState } from 'react';

export const switchMode = createContext("");

// Provider
export const  ThemeProvider  =  ({ children })  =>  {
  // dark and light mode switch
  const [selectedMode, setSelectedMode] = useState('dark')

return  (
    <switchMode.Provider value={{ selectedMode, setSelectedMode }}>
        {children}
    </switchMode.Provider>
    );
};