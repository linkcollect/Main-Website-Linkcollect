import React, { useState } from "react";
import Modal from "../../UI/Modal/Modal";
import cancelIcon from "../../../assets/cancel.svg"
import CancelWhite from '../../../assets/darkMode/cancelWhite.svg'
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCollection } from "../../../api-services/collectionService";
import { deleteBookMark } from "../../../store/Slices/bookmarks.slice";
import { deleteTimeline } from "../../../api-services/timelineService";
import { useContext } from "react";
import { switchMode } from "../../../hooks/switchMode";
export const Delete = ({ isOpen, onClose, heading, subheading, mode, collectionID, bookmarkID }) => {
  const [loading, setIsLoadig] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      if (mode === "collectionDelete") {
        // call api for delete
        setIsLoadig(true);
        await deleteCollection(collectionID);
        setIsLoadig(false);
        onClose();
        navigate("/" + auth.username);
      } else {
        dispatch(deleteBookMark({ bookmarkID }));
        // for instatant UI response we are not awaiting for the response to be fullfilled
        deleteTimeline(collectionID, bookmarkID);
        onClose();
      }
    } catch (e) {
      console.log(e);
      setIsLoadig(false);
    }
  }

  // getting current selected mode
  const {selectedMode} = useContext(switchMode)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 px-3 overflow-hidden">
        {/* Header  */}
        <div className="flex justify-between w-full">
          <h1 className={`text-start text-clip font-medium text-[20px] ${selectedMode === 'light' ? "text-black" : "text-neutral-50"} `}>
            {heading}
          </h1>
          <button className="flex" onClick={onClose}>
            {selectedMode === 'light' ?
              <img src={cancelIcon} name="cancel" />
              :
              <img src={CancelWhite} name="cancel" />
            }
          </button>
        </div>

        <hr className={`w-[97%] border ${selectedMode === 'light' ? "border-neutral-300" : "border-dark-secondary"} `} />

        {/* Content  */}
        <div>
          <p className={` ${selectedMode === 'light' ? "text-black" : "text-neutral-100"}`}>{subheading}</p>
          <small className="text-xs text-error-500">
            *Note that this action is irreversible. All links and data will be lost
          </small>


        </div>
        {/* Actions */}
        <div className="w-full">
          <Button
            variant="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default Delete;
