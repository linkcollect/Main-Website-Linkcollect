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
        <img src={searchIcon} className="w-5 h-5"/>
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
        {/* <div className="absolute right-3 inset-y-0 flex items-center">
          <button onClick={onSearch}><img src={searchIcon}/></button>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBox;