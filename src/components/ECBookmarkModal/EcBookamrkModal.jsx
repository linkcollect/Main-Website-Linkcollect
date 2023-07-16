import React, { useState } from "react";
import Modal from "../Modal/Modal";
import cancelIcon from "../../assets/cancel.svg";
import Input from "../EditCollection/InputEditCollection";
import Loader from "../Loader/Loader";

const EcBookamrkModal = ({ isOpen, onClose, name, link, isEditing }) => {
    const [data,setData] = useState();
    const [loading,setLoading] = useState();
    const inputHandler = () => {
        // Need to implement
        // Based on isEditing
    }
    const onSubmit =() =>{
        // Need to implement
    }

    // const 
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-3 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between  w-full">
          <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
            {isEditing ? "Edit Bookmark" : "Create Bookamrk"}
          </h1>
          <button className="flex" onClick={onClose}>
            <img src={cancelIcon} />
          </button>
        </div>
        <hr className="border border-neutral-300" />
        {/* Content */}
        <div className="sm:w-96 ">
        <p className="text-neutral-700">Bookmark Name</p>  
        <input className='block w-full p-[0.638rem] text-base font-normal border-2 rounded-lg border-primary-300 text-neutral-800 focus:outline-none placeholder:text-neutral-400 '/>
        </div>
        <div className="sm:w-96 ">
        <p className="text-neutral-700">Bookmark Url</p>  
        <input className='block w-full p-[0.638rem] text-base font-normal border-2 rounded-lg border-primary-300 text-neutral-800 focus:outline-none placeholder:text-neutral-400 '/>
        </div>
        {/* Actions */}
        <div className="flex w-full sm:justify-between justify-evenly items-center gap-2">
          <button
            className="flex w-full items-center justify-center h-12 rounded-xl bg-primary-500 px-3 py-6 font-medium text-[16px] text-white cursor-pointer"
            onClick={onSubmit}
          >
            {loading ? <Loader /> : <span>{isEditing ? "Save" : "Create"}</span>}
          </button>
          {isEditing && <button
            className="flex w-full items-center justify-center h-12 rounded-xl bg-neutral-200 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
            onClick={onClose}
          >
            <span>Cancel</span>
          </button>}
        </div>
      </div>
    </Modal>
  );
};

export default EcBookamrkModal;
