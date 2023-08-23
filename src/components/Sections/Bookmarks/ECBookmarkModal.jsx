import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import cancelIcon from "../../../assets/cancel.svg";
import Input, { Label } from "../../UI/Input/Input"
import Loader from "../../UI/Loader/Loader"
import { createTimeline, updateTimeline } from "../../../api-services/timelineService";
import { useDispatch } from "react-redux";
import { createBookmark, updateBookmark } from "../../../store/Slices/bookmarks.slice";
import Button from "../../UI/Button/Button";

const EcBookamrkModal = ({ isOpen, onClose, isEditing, originalData = {}, collectionID = null, bookmarkID = null }) => {
    const [data, setData] = useState({
        title: "",
        link: "",
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


    const isValidName = data.title.length >= 3 && data.title.length <= 40
    const isValidURL = (() => { try { new URL(data.link); return true } catch { return false } })()
    const isValidData = isValidName && isValidURL

    const sameObjectChecker = () => {
        return originalData.title === data.title &&
            originalData.link == data.link
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
        const timeline = { link: data.link, title: data.title, favicon: `${favIconBaseURL}${origin}` };
        let res = {};
        try {
            if (isEditing) {
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
        setData({
            title: "",
            link: ""
        })
        setIsLoading(false);
        onClose();
    }
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
                <div className="w-[100%]">
                    <div className="flex w-full justify-between items-center">
                        <Label name="Collection Title" htmlFor="title" />
                        <small className="text-xs">
                            <span
                                className={`${data.title.length > 30 ? "text-error-500" : ""
                                    }`}
                            >
                                {data.title.length}
                            </span>
                            /{30}
                        </small>
                    </div>
                    <Input
                        type="text"
                        name="title"
                        onChange={onChangeHandler}
                        value={data.title}
                    />
                </div>
                <div className="w-[100%]">
                    <Label name="Bookmark URL" htmlFor="link" />
                    <Input
                        type="text"
                        name="link"
                        onChange={onChangeHandler}
                        value={data.link}
                    />
                    {data.link?.length > 3 && !isValidURL && (
                        <small className="text-xs text-error-500">
                            Please Provide a Valid Url
                        </small>
                    )}
                </div>
                {/* Actions */}
                <div className="flex w-full sm:justify-between justify-evenly items-center gap-2">
                    <Button
                        variant="primary"
                        disabled={!isValidData || isSameData} // button will be disabled untli all required data is correct
                        onClick={onSubmit}
                        isLoading={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <span>{isEditing ? "Update" : "Add Bookbark"}</span>
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
