import React from "react";
import Search from "./Search";
import { useState } from "react";
import SortBy from "../../assets/sortBy.svg";
import Plus from "../../assets/plus.svg";
import Button from "../UI/Button/Button"
import CollectionModal from "./CollectionModal";
const CollectionHeader = ({ name,isOwner,windowWidth,setQuery}) => {
  // sort by dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  // To handle modal open and close
  const createModalHandler = () =>{
    setOpenModal(prev=>!prev);
  }



  return (
    <React.Fragment>
        {isOwner && <CollectionModal isOpen={openModal} modalCloseHandler={createModalHandler}/>}
        <div className="flex flex-col items-start justify-center w-full gap-4 ">
          {/* Modify this */}
          <div className="flex items-center justify-between w-full ">
            <p
              className={`text-left font-medium  text-[30px] text-neutral-700  ${
                windowWidth < 700 ? "hidden" : ""
              }`}
            >
              {name}
            </p>
            {isOwner && 
            <Button variant="primary" className="w-48 h-[46px]" onClick={createModalHandler}>
              <img src={Plus} alt="" />
                Add collection
            </Button>
            }
          </div>
        </div>
      </React.Fragment>
  );
};

export default CollectionHeader;
