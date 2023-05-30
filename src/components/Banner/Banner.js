import React, { useEffect, useState } from "react";
import Vector from "../../assets/Vector.svg";
import mainLogo from "../../assets/mainLogo.svg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const allTexts = [
    `Stay organized, save your web links 🔖`,
    `Share your collections in real time 🤳`,
    `Explore popular public collections 🌏`
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allTexts.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setText(allTexts[currentIndex]);
  }, [currentIndex]);

  return (
    <>
      <div className="flex flex-col items-center justify-evenly md:h-full">
        {/* <Link to={'/'} className="flex items-center justify-center w-1/2 ">
          <div className="lg:w-[80%]">
            <img src={mainLogo} alt="" className="w-64  md:h-[6.375rem]" />
          </div>
        </Link> */}
        <div className="flex flex-col items-center sm:gap-4 lg:gap-8">
          <img
            src={Vector}
            alt="Vector"
            className="w-64 h-64 md:w-[354px] md:h-72"
          />
          <div className="flex flex-col items-center justify-center w-full gap-0 mx-auto lg:gap-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={text}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="lg:w-[65%] md:w-5/6 h-24 lexend font-bold text-[28px] xl:text-[40px] lg:text-[35px] lg:leading-[40px] xl:leading-[50px] md:text-[35px] md:leading-[50px]"
              >
                {text}
              </motion.h1>
            </AnimatePresence>
            <p className="text-textPrimary text-[18px] md:text-[18px] xl:text-[18px] leading-[23px] md:leading-[33px] lg:text-[18px] xl:leading-[22px] text-center w-[373px] lg:w-[73%] xl:w-1/2 max-w-xl h-12 font-normal">
              linkcollect is the simplest way to save & share web links from
              anywhere to anyone
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
