import React from "react";
import searchIcon from "../../assets/SearchVector.svg"
const SearchBox = ({onSearch,setQuery}) => {

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
          className="block w-full p-[0.638rem] pl-10 text-base font-normal border rounded-lg bg-bgPrimary border-neutral-300 text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
          placeholder="Search for collection or links"
          onChange={(e)=>setQuery(e.target.value)}
        />

        {/* onchange to be added in the above line
          onChange={(e)=>onChnageHandler(e.target.value)}
        */}
        {/* <div className="absolute inset-y-0 flex items-center right-3">
          <button onClick={onSearch}><img src={searchIcon}/></button>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBox;