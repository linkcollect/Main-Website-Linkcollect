import React from "react";
import searchIcon from "../../assets/SearchVector.svg"
import Input from "../UI/Input/Input";
const SearchBox = ({onSearch,setQuery}) => {

  return (
    <div className="flex items-center w-full">
      <label for="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-[999]">
        <img src={searchIcon} className="w-5 h-5"/>
        </div>
        <Input
          type="text"
          id="simple-search"
          variant="secondary"
          className="p-[0.638rem] pl-10"
          value={''}
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