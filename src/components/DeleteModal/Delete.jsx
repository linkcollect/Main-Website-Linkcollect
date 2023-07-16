import * as React from "react";
import Modal from "../Modal/Modal";
import cancelIcon from "../../assets/cancel.svg"
export const Delete = ({ isOpen, onClose, numberOfSelectedLinkes,nameOfTheCollection }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    
      <div className="px-3 flex flex-col gap-5">
      {/* Header  */}
        <div className="flex justify-between  w-full">
          <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
            Delete
          </h1>
          <button className="flex" onClick={onClose}>
                <img src={cancelIcon} />
           </button>
        </div>

        {/* Content  */}
        <div>
          <p>{`Delete ${numberOfSelectedLinkes} links from ${nameOfTheCollection} Collection`}</p>
        </div>
        {/* Actions */}
        <div className="flex w-full sm:justify-between justify-evenly items-center">
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-200 px-3 py-6 font-medium text-[16px] border-2 border-error-500 text-error-500 cursor-pointer"
          >
            <span>Delete</span>
          </button>
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-200 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
            onClick={onClose}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default Delete;
