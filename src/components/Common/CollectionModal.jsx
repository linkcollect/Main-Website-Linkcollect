import * as React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../EditCollection/InputEditCollection";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
export const CollectionModal = ({
  isOpen,
  setIsOpen,
  imageHandler,
  inputHandler,
  data,
  onSubmit,
  loading,
  isEditing,
}) => {
  const [isPublic,setIsPublic] = React.useState(true);

  const handleSwitchPrivacy = (isPublic)=>{
    setIsPublic(isPublic);
  }
  return (
    <Modal isOpen={isOpen} onClose={setIsOpen}>
      <div className="px-3 flex flex-col justify-between items-center h-full gap-3">
        {/* Heading */}
        <div className="flex justify-start  w-full">
          <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
            {isEditing ? "Edit Collection" : "Create Collection"}
          </h1>
        </div>
        <hr className="w-[97%] border border-neutral-300" />
        {/* Data */}
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          {/* Collection Name Input */}
          <div className="w-[100%]">
            <Input
              type={"text"}
              value={data.title}
              label={"Collection Name"}
              inputClass={"textClass"}
              onInputHandler={inputHandler}
              required={30}
              name={"title"}
            />
          </div>
          {/* Collection Description Input */}
          <div className="w-full">
            <label className="block">
              <span className="text-neutral-700 flex justify-between items-end  text-[16px] font-light mb-[3px] w-full">
                <p>Description</p>
                <small className="text-xs">
                  <span
                    className={`${
                      data.description?.length > 250 ? "text-danger" : ""
                    }`}
                  >
                    {data.description?.length}
                  </span>
                  /250
                </small>
              </span>
              <textarea
                value={data.description}
                onChange={inputHandler}
                name="description"
                className="w-full h-28 px-4 py-2  border-solid border-2 border-primary-300 rounded-[10px] font-normal text-base text-textPrimary resize-none focus:outline-none	"
              ></textarea>
            </label>
          </div>

          {/* Collection Tag */}

          {/* Collection Thumbnail Input */}
          <div className="w-full">
            <Input
              type={"file"}
              placeholder="Upload image"
              label={"Collection Thumbnail (Optional)"}
              inputClass={"fileClass"}
              onInputHandler={imageHandler}
            />
          </div>

          {/* Collection Privacy Input */}
          <div className="flex justify-between w-full items-center">
            <p className="text-neutral-700">Select Privacy</p>
            {/* Switch */}
            <div
              className={`flex relative items-start justify-center gap-1.5 p-1 w-40 sm:w-40 h-[32px]  border-neutral-300 bg-neutral-300 border-2 rounded-[100px]`}
            >
              <div
                className={`relative z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${!isPublic ? "text-white" : "text-black"} text-sm sm:text-base font-normal`}
                onClick={() => handleSwitchPrivacy(false)}
              >
                <span>Private</span>
              </div>
              <div
                className={`relative z-10 rounded text-sm sm:text-base w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${isPublic ? "text-white" : "text-black"}  font-normal`}
                onClick={() => handleSwitchPrivacy(true)}
              >
                <span>Public</span>
              </div>
              <div
                className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded-[102px] z-[1]  bg-primary-500 ${
                  !isPublic
                    ? "translate-x-[5%]"
                    : "translate-x-[100%]"
                }`}
              ></div>
            </div>
          </div>


        </div>
        {/* Actions */}
        <div className="flex w-full sm:justify-between justify-evenly items-center">
          <button
            className="flex w-full items-center justify-center h-12 rounded-xl bg-primary-500 px-3 py-6 font-medium text-[16px] text-white cursor-pointer"
            onClick={onSubmit}
          >
            {loading ? (
              <Loader />
            ) : (
              <span>{isEditing ? "Save" : "Create"}</span>
            )}
          </button>
          {isEditing && (
            <button
              className="flex items-center justify-center w-full h-12 rounded-xl bg-neutral-200 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default CollectionModal;
