import React from 'react';
import { backgroundGradients, classMerge, nameShortner, pickFromHash } from '../../../utils/utils';

const BackgroundGradient = ({ hashValue, title, className }) => {
  const gradients = backgroundGradients;
  const { color1, color2, xPosition, yPosition } = pickFromHash(hashValue, gradients);

  const backgroundStyle = {
    background: `radial-gradient(circle at ${xPosition}% ${yPosition}%, ${color1} 0%, ${color2} 100%)`
  };

  return (
    <div style={backgroundStyle} className={classMerge("background rounded-t-md p-1 flex items-center wrap justify-center w-full h-[109px]", className)}>
      <div className='text-neutral-800'>{nameShortner(title, 100)}</div>
    </div>
  );
};


export default BackgroundGradient;
