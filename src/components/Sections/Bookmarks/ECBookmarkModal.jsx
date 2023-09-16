import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import cancelIcon from "../../../assets/cancel.svg";
import CancelWhite from "../../../assets/darkMode/cancelWhite.svg";
import Input, { Label, TextArea } from "../../UI/Input/Input"
import Loader from "../../UI/Loader/Loader"
import { createTimeline, updateTimeline } from "../../../api-services/timelineService";
import { useDispatch } from "react-redux";
import { createBookmark, updateBookmark } from "../../../store/Slices/bookmarks.slice";
import Button from "../../UI/Button/Button";
import { useContext } from "react";
import { switchMode } from "../../../hooks/switchMode";

const EcBookamrkModal = ({ isOpen, onClose, isEditing, originalData = {}, collectionID = null, bookmarkID = null }) => {
    const [data, setData] = useState({
        title: "",
        link: "",
        note: "",
    });
    const [isLoading, setIsLoading] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        // If the user is editng the data then need to be set the data
        if (isEditing) {
            setData({ ...originalData });
        }
    }, [])
    const onChangeHandler = (e) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const isValidNote = data.note?.length < 150
    const isValidName = data.title.length >= 3 && data.title.length <= 200
    const isValidURL = (() => { try { new URL(data.link); return true } catch { return false } })()
    const isValidData = isValidName && isValidURL && isValidNote

    const sameObjectChecker = () => {
        return originalData.title === data.title &&
            originalData.link == data.link &&
                originalData.note == data.note
    }
    const isSameData = isEditing ? sameObjectChecker() : false

    const onSubmit = async () => {
        // Need to implement
        if (!isValidData && isSameData) {
            return
        }
        setIsLoading(true);
        const favIconBaseURL = "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="
        const origin = new URL(data.link).origin;
        let timeline = { link: data.link, title: data.title, note: data.note, favicon: `${favIconBaseURL}${origin}` };
        let res = {};
        try {
            if (isEditing) {
                if(data.link === originalData.link) {
                timeline = { link: data.link, title: data.title, note: data.note };
                }
                res = await updateTimeline(collectionID, bookmarkID, timeline);
                dispatch(updateBookmark({ updatedBookmark: res.data.data }));
            } else {
                // If we are creating a new bookmark then need to add time in the timeline object
                timeline.time = new Date();
                res = await createTimeline(collectionID, timeline);
                dispatch(createBookmark({ bookmarkData: res.data.data }))
            }
            resetDataAndClose();
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }

    }
    const resetDataAndClose = () => {
        // setData({
        //     title: "",
        //     link: "",
        //     note: ""
        // })
        setIsLoading(false);
        onClose();
    }

    // getting current selected mode
    const { selectedMode } = useContext(switchMode)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-5 px-3">
                {/* Header */}
                <div className="flex justify-between w-full">
                    <h1 className={`text-start font-medium text-[20px] ${selectedMode === 'light' ? "text-black" : "text-neutral-50"} `}>
                        {isEditing ? "Edit Bookmark" : "Create Bookmark"}
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

                {/* Content */}
                <div className="w-[100%]">
                    <div className="flex items-center justify-between w-full">
                        <Label name="Bookmark Title" htmlFor="title" />
                        <small className={`text-xs ${selectedMode === 'light' ? "" : "text-neutral-300"} `}>
                            <span
                                className={`${data.title?.length > 200
                                    ? "text-error-500"
                                    : ""
                                    }`}
                            >
                                {data.title?.length}
                            </span>
                            /{200}
                        </small>
                    </div>
                    <Input
                        type="text"
                        name="title"
                        variant={selectedMode === 'light' ? "" : "darkDefault"}
                        onChange={onChangeHandler}
                        value={data.title}
                    />
                </div>
                <div className="w-[100%]">
                    <Label name="Bookmark URL" htmlFor="link" />
                    <Input
                        type="text"
                        name="link"
                        variant={selectedMode === 'light' ? "" : "darkDefault"}
                        onChange={onChangeHandler}
                        value={data.link}
                    />
                    {data.link?.length > 3 && !isValidURL && (
                        <small className="text-xs text-error-500">
                            Please Provide a Valid Url
                        </small>
                    )}
                </div>
                <div className="w-[100%]">
                    <div className="flex items-center justify-between w-full">
                        <Label name="Note" htmlFor="note" />
                        <small className={`text-xs ${selectedMode === 'light' ? "" : "text-neutral-300"} `}>
                            <span
                                className={`${data.note?.length > 150
                                    ? "text-error-500"
                                    : ""
                                    }`}
                            >
                                {data.note?.length ? data.note?.length : 0}
                            </span>
                            /{150}
                        </small>
                    </div>
                    <TextArea
                        name="note"
                        variant={selectedMode === 'light' ? "" : "darkDefault"}
                        onChange={onChangeHandler}
                        value={data.note ? data.note : ""}
                    />
                    {data.note?.length > 150 && !isValidURL && (
                        <small className="text-xs text-error-500">
                            Maximum note length is 150 characters
                        </small>
                    )}
                </div>
                {/* Actions */}
                <div className="flex items-center w-full gap-2 sm:justify-between justify-evenly">
                    <Button
                        variant="primary"
                        disabled={!isValidData || isSameData} // button will be disabled untli all required data is correct
                        onClick={onSubmit}
                        isLoading={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <span>{isEditing ? "Update" : "Add Bookmark"}</span>
                        )}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="secondaryOutline"
                            onClick={resetDataAndClose}
                        >
                            <span>Cancel</span>
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default EcBookamrkModal;
