import React, { useEffect, useState, useCallback } from "react";
const names = [
  "wasting your valuable time",
  "Calling gpt-3 apis for no reason",
  "Running a ml algorithm",
  "Stealing your data (jk)",
  "Tryna crash your system",
  "Enjoy this useless loading animation",
  "Our premium plan is faster",
  "One mississippi, two mississippi...",
  "Initializing the initializer...",
  "Feel free to spin in your chair",
  "Don't wait if you don't want to",
  "Laughing at your pictures-i mean,loading...",
];

const PageLoader = () => {
  const [name, setnewName] = useState("wasting your valuable time");
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setnewName(names[index]);
  }, []);
  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <div role="status">
      <div className="w-[100px] mx-auto">
      <svg
        className="text-grey text-center animate-spin dark:text-gray-600 fill-blue-600"
        width="100"
        height="100"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.1"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M84.5024 32.1011C70.4128 32.1011 56.9003 37.6981 46.9374 47.661C36.9745 57.6239 31.3774 71.1364 31.3774 85.2261C31.3774 99.3157 36.9745 112.828 46.9374 122.791C56.9003 132.754 70.4128 138.351 84.5024 138.351C98.5921 138.351 112.105 132.754 122.067 122.791C132.03 112.828 137.627 99.3157 137.627 85.2261C137.627 71.1364 132.03 57.6239 122.067 47.661C112.105 37.6981 98.5921 32.1011 84.5024 32.1011ZM10.1274 85.2261C10.1274 44.1498 43.4262 10.8511 84.5024 10.8511C125.579 10.8511 158.877 44.1498 158.877 85.2261C158.877 126.302 125.579 159.601 84.5024 159.601C43.4262 159.601 10.1274 126.302 10.1274 85.2261Z"
          fill="#6166F1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.2675 72.8618C29.353 86.2449 31.7503 100.237 38.9538 111.886C40.3717 114.284 40.7914 117.142 40.1226 119.846C39.4538 122.55 37.7499 124.883 35.3779 126.343C33.0059 127.803 30.1554 128.273 27.4401 127.653C24.7248 127.032 22.3619 125.369 20.8601 123.024C10.7846 106.71 7.42728 87.1248 11.4941 68.3867C12.0875 65.632 13.7509 63.2258 16.1184 61.6976C18.4859 60.1693 21.3636 59.6441 24.1183 60.2376C26.873 60.831 29.2792 62.4944 30.8075 64.8619C32.3358 67.2294 32.8609 70.1071 32.2675 72.8618Z"
          fill="#6166F1"
        />
      </svg>
      </div>

      <p className="text-textPrimary font-normal text-xl text-center">{name}</p>
    </div>
  );
};

export default PageLoader;
