import React from 'react';
import GridCard from '../../../assets/landingPage/GridCard.svg';
import {
  backgroundGradientsLight,
  backgroundGradientsDark,
  classMerge,
  nameShortner,
  pickFromHash,
} from '../../../utils/utils';
import { useContext } from 'react';
import { switchMode } from '../../../hooks/switchMode';

const BackgroundGradient = ({ hashValue, title, className }) => {
  const { selectedMode } = useContext(switchMode);
  let gradients = backgroundGradientsLight;
  if (selectedMode === 'dark') {
    gradients = backgroundGradientsDark;
  }
  const { color1, color2, xPosition, yPosition } = pickFromHash(
    hashValue,
    gradients
  );

  const backgroundStyle = {
    backgroundImage: `url(${GridCard}), radial-gradient(circle at ${xPosition}% ${yPosition}%, ${color1} 0%, ${color2} 100%)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      style={backgroundStyle}
      className={classMerge(
        'background rounded-t-md p-1 flex items-center wrap justify-center w-full h-[109px]',
        className
      )}
    >
      <div
        className={`max-w-[250px] overflow-hidden text-ellipsis ${
          selectedMode === 'light' ? 'text-neutral-800' : 'text-neutral-400'
        }`}
      >
        {nameShortner(title, 60)}
      </div>
    </div>
  );
};

export default BackgroundGradient;
