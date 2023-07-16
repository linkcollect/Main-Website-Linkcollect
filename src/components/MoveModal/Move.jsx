import React, { useState } from 'react'
import Modal from "../Modal/Modal";
import cancelIcon from "../../assets/cancel.svg"
const values = [
    {
        name:"A",
        id:1
    },
    {
        name:"B",
        id:2
    },
    {
        name:"C",
        id:3
    },
    {
        name:"D",
        id:4
    },
]
const Move = ({isOpen,onClose,numberOfSelectedLinkes,nameOfTheCollection}) => {
  const [showDropDown,setShowDropDown] = useState(false);
  const [searchedValue,setSearchedValue] = useState("");
  const [selectedCollection,setSeelctedCollection] = useState("");

  const onSearch = (e) =>{
    setSearchedValue(e.target.value);
  }
  console.log(values)
  const searchedCollection = values.filter(value=>value.name.toLowerCase().includes(searchedValue.toLowerCase())) ;

  console.log(searchedCollection)
  
  const selectOptionHanlder = (e)=>{
    // e.preventDeafult();
    console.log(e)
    setSearchedValue(e.target.innerText);
    setShowDropDown(false);
    setSeelctedCollection(e.target.innerText);
  }
  console.log(selectedCollection)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-3 flex flex-col gap-5">
      {/* Header  */}
        <div className="flex justify-between  w-full">
          <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
            Move Links
          </h1>
          <button className="flex" onClick={onClose}>
                <img src={cancelIcon} />
           </button>
        </div>

        {/* Content  */}
        <div>
          <p className='text-base mb-2'>Move To Collection</p>
          <input className='block w-full p-[0.638rem] text-base font-normal border-2 rounded-lg border-primary-300 text-neutral-800 focus:outline-none placeholder:text-neutral-400 ' placeholder='Select Your Collection' onChange={onSearch} onFocus={()=>setShowDropDown(true)} value={searchedValue}/>
          {showDropDown && 
            <div className="w-full rounded transition-all duration-500 border border-neutral-300 px-3 mt-2 flex items-start justify-center flex-col gap-2 bg-neutral-100 py-3">
            {searchedCollection.length>0 ? searchedCollection.map((coll,index)=>
            <>
                <p className="block text-base cursor-pointer font-normal text-neutral-800 py-2 w-full" onClick={selectOptionHanlder}>{coll.name}</p>
                {index !== searchedCollection.length - 1 && <h className="w-full border-b border-neutral-200"/>}
                </>
            ) : <p className='py-2'>Oops! No result Found for {searchedValue}</p>}
            </div>    
          }
          {selectedCollection!=="" && <p className='w-full mt-3 text-neutral-700'>{`Move ${numberOfSelectedLinkes} links from ${nameOfTheCollection} collection to ${selectedCollection}`}</p>}
        </div>
        
        {/* Actions */}
        <div className="flex w-full sm:justify-between justify-evenly items-center">
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-100 px-3 py-6 font-medium text-[16px] border-2 border-primary-500 text-primary-500 cursor-pointer"
          >
            <span>Move</span>
          </button>
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-100 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
            onClick={onClose}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default Move