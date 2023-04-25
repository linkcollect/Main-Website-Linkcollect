import React from "react";
import searchIcon from "../../assets/SearchVector.svg"
const SearchBox = ({onChnageHandler,onSearch}) => {

  return (
    <div className="flex items-center w-full">
      <label for="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="#636472"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-bgPrimary border border-secondary text-textSecondary text-sm rounded-lg block w-full p-3 pl-10 focus:outline-none"
          placeholder="Search for collection or links"
        />
        {/* onchange to be added in the above line
          onChange={(e)=>onChnageHandler(e.target.value)}
        */}
        <div className="absolute right-3 inset-y-0 flex items-center">
          <button onClick={onSearch}><img src={searchIcon}/></button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;