import * as React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Input, { Select } from "./InputEditCollection";
import Loader from "../Loader/Loader";
import Modal from "../UI/Modal/Modal";
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
  return (
    <Modal isOpen={isOpen} onClose={setIsOpen}>
      <div className=" flex flex-col justify-between items-center h-full gap-3">
        {/* Heading */}
        <div className="flex justify-start  w-full px-3" >
          <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
            {isEditing ?"Edit Collection" : "Create Collection"}
          </h1>
        </div>
        <hr className="w-[97%] border border-neutral-300" />
        {/* Data */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Collection Name Input */}
          <div className="w-[95%] sm:w-96 ">
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
          <div className="w-[95%] sm:w-96 sm:h-28 ">
            <label className="block">
              <span className="text-textSecondary flex justify-between items-end  text-[16px] font-light mb-[3px]">
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
                className="w-full h-28 px-4 py-2  bg-inputBackground border-solid border-[1px] border-inputBorder rounded-[10px] font-normal text-base text-textPrimary resize-none focus:outline-none	"
              ></textarea>
            </label>
          </div>

          {/* Collection Privacy Input */}
          <div className="w-[95%] sm:w-96 ">
            <Select
              value={data.privacy}
              onInputHandler={inputHandler}
              name={"privacy"}
              options={[
                { name: "Public", value: "public" },
                { name: "Private", value: "private" },
              ]}
            />
          </div>
          {/* Collection Thumbnail Input */}
          <div className="w-[95%] sm:w-96 ">
            <Input
              type={"file"}
              placeholder="Upload image"
              label={"Collection Thumbnail (Optional)"}
              inputClass={"fileClass"}
              onInputHandler={imageHandler}
            />
          </div>

        </div>
        {/* Actions */}
        <div className="flex w-full px-4 sm:justify-between justify-evenly items-center">
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-primary-500 px-3 py-6 font-medium text-[16px] text-white cursor-pointer"
            onClick={onSubmit}
          >
            {loading ? <Loader /> : <span>{isEditing ? "Save" : "Create"}</span>}
          </button>
          <button
            className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-200 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <span>Cancel</span>
          </button>
        </div>
        </div>
    </Modal>
  );
};
export default CollectionModal;
