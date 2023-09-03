import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const nameShortner = (name, length) => {
  return name?.length > length ? name.slice(0, length) + "..." : name
}

export const getOrigin = (weblink) => {
  try {
    const url = new URL(weblink);
    return url.host

  } catch (error) {
    return ""
  }
}


export const dataSortByType = (data, sortingType) => {
  const pins = data.filter(collection => collection.isPinned === true).sort((data1, data2) => new Date(data2.pinnedTime) - new Date(data1.pinnedTime));
  switch (sortingType) {
    case "MOST_BOOKMARKED":
      const sorteDataByNumberOfBookmarks = data.filter(collection => collection.isPinned === false || !collection.isPinned).sort((data1, data2) => data2.timelines.length - data1.timelines.length);
      return [...pins, ...sorteDataByNumberOfBookmarks];
    case "MOST_UPVOTES":
      const sortedDataByMostUpvotes = data.filter(collection => collection.isPinned === false || !collection.isPinned).sort((data1, data2) => data1.upvotes.length - data2.upvotes.length);
      return [...pins, ...sortedDataByMostUpvotes];
    case "ALPHABETICAlLY":
      const sortedDataByAlphabetically = data.filter(collection => collection.isPinned === false || !collection.isPinned).sort((data1, data2) => data1.title.localeCompare(data2.title))
      return [...pins, ...sortedDataByAlphabetically];

    default:
      const filteredData = data.filter(collection => collection.isPinned === false || !collection.isPinned)
      const sorteDataByUpdated = filteredData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt));
      return [...pins, ...sorteDataByUpdated];
  }

}


export const fromNow = (date) => {
  let seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  let unit = "sec";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "min";
  }
  if (value != 1)
    unit = unit + "s";
  return value + " " + unit + " " + direction;
};


export const classMerge = (...inputs) => {
  return twMerge(clsx(inputs));
}

export const sameObjectChecker = (objectA, objectB) => {

}

export const backgroundGradientsLight = [
  { color1: 'rgba(89,147,251,0.70)', color2: 'rgba(140,126,254,0.7)' },
  { color1: 'rgba(101,200,152,0.70)', color2: 'rgba(251,234,223,0.7)' },
  { color1: 'rgba(46, 49, 146, 0.70)', color2: 'rgba(27, 255, 255, 0.70)' },
  { color1: 'rgba(0, 146, 69, 0.70)', color2: 'rgba(252, 238, 33, 0.70)' },
  { color1: 'rgba(212, 20, 90, 0.70)', color2: 'rgba(251, 176, 59, 0.70)' },
  { color1: 'rgba(102, 45, 140, 0.70)', color2: 'rgba(237, 30, 121, 0.70)' },
  { color1: 'rgba(238, 156, 167, 0.70)', color2: 'rgba(255, 221, 225, 0.70)' },
  { color1: 'rgba(97, 67, 133, 0.70)', color2: 'rgba(81, 99, 149, 0.70)' },
  { color1: 'rgba(2, 170, 189, 0.70)', color2: 'rgba(0, 205, 172, 0.70)' },
  { color1: 'rgba(255, 81, 47, 0.70)', color2: 'rgba(221, 36, 118, 0.70)' },
  { color1: 'rgba(255, 95, 109, 0.70)', color2: 'rgba(255, 195, 113, 0.70)' },
  { color1: 'rgba(17, 153, 142, 0.70)', color2: 'rgba(56, 239, 125, 0.70)' },
  { color1: 'rgba(198, 234, 141, 0.70)', color2: 'rgba(254, 144, 175, 0.70)' },
  { color1: 'rgba(234, 141, 141, 0.70)', color2: 'rgba(168, 144, 254, 0.70)' },
  { color1: 'rgba(216, 181, 255, 0.70)', color2: 'rgba(30, 174, 152, 0.70)' },
  { color1: 'rgba(255, 97, 210, 0.70)', color2: 'rgba(254, 144, 144, 0.70)' },
  { color1: 'rgba(191, 240, 152, 0.70)', color2: 'rgba(111, 214, 255, 0.70)' },
  { color1: 'rgba(78, 101, 255, 0.70)', color2: 'rgba(146, 239, 253, 0.70)' },
  { color1: 'rgba(169, 241, 223, 0.70)', color2: 'rgba(255, 187, 187, 0.70)' },
  { color1: 'rgba(147, 165, 207, 0.70)', color2: 'rgba(228, 239, 233, 0.70)' },
];
export const backgroundGradientsDark = [
  { color1: 'rgba(61, 64, 91, 0.70)', color2: 'rgba(29, 31, 42, 0.70)' },
  { color1: 'rgba(51, 56, 79, 0.70)', color2: 'rgba(16, 17, 24, 0.70)' },
  { color1: 'rgba(41, 48, 62, 0.70)', color2: 'rgba(10, 12, 18, 0.70)' },
  { color1: 'rgba(31, 40, 45, 0.70)', color2: 'rgba(6, 8, 11, 0.70)' },
  { color1: 'rgba(21, 32, 29, 0.70)', color2: 'rgba(4, 6, 6, 0.70)' },
  { color1: 'rgba(11, 24, 12, 0.70)', color2: 'rgba(2, 5, 3, 0.70)' },
  { color1: 'rgba(0, 14, 0, 0.70)', color2: 'rgba(0, 2, 0, 0.70)' },
  { color1: 'rgba(61, 64, 91, 0.70)', color2: 'rgba(29, 31, 42, 0.70)' }, // Deep Blue
  { color1: 'rgba(51, 56, 79, 0.70)', color2: 'rgba(16, 17, 24, 0.70)' }, // Midnight Blue
  { color1: 'rgba(41, 48, 62, 0.70)', color2: 'rgba(10, 12, 18, 0.70)' }, // Dark Slate Gray
  { color1: 'rgba(31, 40, 45, 0.70)', color2: 'rgba(6, 8, 11, 0.70)' },  // Charcoal
  { color1: 'rgba(21, 32, 29, 0.70)', color2: 'rgba(4, 6, 6, 0.70)' },   // Dark Forest Green
  { color1: 'rgba(11, 24, 12, 0.70)', color2: 'rgba(2, 5, 3, 0.70)' },   // Dark Green
  { color1: 'rgba(0, 14, 0, 0.70)', color2: 'rgba(0, 2, 0, 0.70)' },     // Very Dark Green
  { color1: 'rgba(74, 42, 75, 0.70)', color2: 'rgba(35, 15, 36, 0.70)' }, // Dark Purple

];

export const pickFromHash = (hash, gradientArray) => {
  const M = gradientArray.length;
  // Hash the input using a hashing algorithm (e.g., SHA-256)
  const hashedInput = hash;
  // Convert the hashed input to numbers for x and y positions
  const x = parseInt(hashedInput.slice(-4, -2), 16) % 100;
  const y = parseInt(hashedInput.slice(0, 2), 16) % 100;
  const i = parseInt(hashedInput.slice(-2), 16) % M;

  return { ...gradientArray[i], xPosition: x, yPosition: y };
};

