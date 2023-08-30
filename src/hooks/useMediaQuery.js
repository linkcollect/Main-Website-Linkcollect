import { useEffect, useState } from "react";

// Hook for inner width detection for responsive design

export const useMediaQuery = () => {
  
    const [windowWidth, setWindowWidth] = useState(768);

    useEffect(() => {
      function watchWidth() {
        setWindowWidth(window.innerWidth);
      }

      watchWidth();
  
      window.addEventListener("resize", watchWidth);
      return ()   => {
        window.addEventListener("resize", watchWidth);
      }
    }, []);

    

    return windowWidth
}