import React, { useContext } from "react";
import searchIcon from "../../assets/SearchVector.svg"
import Input from "../UI/Input/Input";
import cancelIcon from "../../assets/cancel.svg";
import DarkSearchIcon from '../../assets/darkMode/darkmodeSearchIcon.svg'
import CancelWhite from '../../assets/darkMode/cancelWhite.svg'
import IconButton from "../UI/IconButton/IconButton";
import { switchMode } from "../../hooks/switchMode";
const SearchBox = ({ query, setQuery, onCancel, onSubmit }) => {

  // getting selected mode for theme change
  const { selectedMode } = useContext(switchMode)

  return (
    <div className="flex items-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-[10]">
          {selectedMode === "dark" ?
            <img src={DarkSearchIcon} className="w-5 h-5" />
            :
            <img src={searchIcon} className="w-5 h-5" />
          }
        </div>
        <form action="/explore" onSubmit={onSubmit}>
          <Input
            type="text"
            id="simple-search"
            variant={selectedMode === "light" ? "secondary" : "darkSecondary"}
            className="p-[0.638rem] pl-10 border"
            value={query}
            placeholder="Search for collection or links"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        {query.length > 0 && <IconButton onClick={onCancel} className="absolute inset-y-0 right-4 z-[10]">

          {selectedMode === "dark" ?
            <img src={CancelWhite} alt="" />
            :
            <img src={cancelIcon} alt="" />
          }
        </IconButton>}
      </div>
    </div>
  );
};

export default SearchBox;