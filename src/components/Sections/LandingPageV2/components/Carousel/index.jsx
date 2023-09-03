import React, { useRef, useState, useEffect } from "react";
// styles
import './Carousel.css'

const Carousel = ({ children }) => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    sliderRef.current.classList.add('active');
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    sliderRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    sliderRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 3; // scroll-fast
    sliderRef.current.scrollLeft = scrollLeft - walk;
    console.log(walk);
  };

  useEffect(() => {
    // Auto-scroll after 3 seconds
    const autoScrollInterval = setInterval(() => {
      const slider = sliderRef.current
      // Get the first child component and its width
      const firstChild = slider.firstElementChild;
      const childWidth = firstChild.offsetWidth;

      // Get the computed style for the first child to get the flex gap
      const computedStyle = getComputedStyle(firstChild);
      const flexGap = parseFloat(computedStyle.marginRight);

      // Calculate the total width including the flex gap
      const scrollAmount = childWidth + flexGap;

      const targetScrollLeft = slider.scrollLeft + scrollAmount;

      if (targetScrollLeft >= slider.scrollWidth - slider.clientWidth) {
        // Reached the end, scroll back to the beginning
        slider.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      } else {
        // Scroll to the next position
        slider.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth"
        });
      }
    }, 3000);

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, []);

  return (
    <div className="carousel-container">
      <div id="carousel" className="snap no-scrollbar py-[5rem]" ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {children}
      </div>
    </div>
  )
}

export default Carousel;