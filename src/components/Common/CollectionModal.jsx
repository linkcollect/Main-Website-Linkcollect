import React, { useContext, useEffect, useState } from 'react';
import Input, { Label, TextArea } from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';
import Modal from '../UI/Modal/Modal';
import { useDispatch } from 'react-redux';
import cancelIcon from '../../assets/cancel.svg';
import CancelWhite from '../../assets/darkMode/cancelWhite.svg';
import IconButton from '../UI/IconButton/IconButton';
import Button from '../UI/Button/Button';
import {
  createCollection,
  updateCollection,
} from '../../api-services/collectionService';
import { addCollection } from '../../store/Slices/collection.slice';
import { updateCollectionData } from '../../store/Slices/bookmarks.slice';
import { switchMode } from '../../hooks/switchMode';

export const CollectionModal = ({
  isOpen,
  modalCloseHandler,
  originalCollectionData = {}, // it will be only availble if we edit a collection
  isEditing,
  collectionId = null, // it will be only availble if we edit a collection
}) => {
  const [isLoading, setIsLoding] = React.useState(false);

  const [collectionData, setCollectionData] = useState({
    title: '',
    description: '',
    tags: [],
    image: null,
    isPublic: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // If we are editing the data then only we need to set the data as default collection data
    if (isEditing) {
      setCollectionData({ ...originalCollectionData, image: null });
    }
  }, [isOpen]);

  // Privacy Handler
  const handleSwitchPrivacy = privacy => {
    setCollectionData(prevData => ({ ...prevData, isPublic: privacy }));
  };

  // Collection title, desc handler
  const onChangeHandler = e => {
    setCollectionData(prevCollectionData => ({
      ...prevCollectionData,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileUploadHandler = e => {
    setCollectionData(prevData => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Data validation
  const isValidName =
    collectionData.title?.length >= 3 && collectionData.title.length <= 40;
  const isValidDescription = collectionData.description?.length <= 240;
  const isValidTags = collectionData.tags?.length <= 3;
  // File max size
  const MAXED_ALLOWED_SIZE = 1 * 1024 * 1024;
  // if no file is selected that means iamge is null so it will be always true as image is not mandatory data
  const isValidFileSize = !collectionData.image
    ? true
    : collectionData.image.size <= MAXED_ALLOWED_SIZE;
  const isCorrectData =
    isValidName && isValidDescription && isValidTags && isValidFileSize;

  // it will be checked only when we are gonna edit the collection otherwise default value will be false
  const sameObjectChecker = () => {
    return (
      originalCollectionData.title === collectionData.title &&
      originalCollectionData.description === collectionData.description &&
      originalCollectionData.tags?.map(
        tag => collectionData.tags?.findIndex(tItem => tItem == tag) >= 0
      ) &&
      originalCollectionData.isPublic === collectionData.isPublic &&
      !collectionData.image
    );
  };
  const isSameData = isEditing ? sameObjectChecker() : false;
  const onSubmit = async () => {
    // If the data is not correct form will be not submitted
    if (!isCorrectData || isSameData) {
      return;
    }

    setIsLoding(true);
    try {
      // Preparing form data
      const { title, description, tags, image, isPublic } = collectionData;
      const collectionFormData = new FormData();
      collectionFormData.append('title', title);
      collectionFormData.append('description', description);
      collectionFormData.append('isPublic', isPublic);
      image && collectionFormData.append('image', image);
      tags?.length > 0 && collectionFormData.append('tags', tags);
      // As the model is taking care of both edit and new collection addition
      // that is why we need to send the request to different request-> according to that condition
      let res = {};
      if (isEditing) {
        res = await updateCollection(collectionId, collectionFormData);
        dispatch(updateCollectionData({ updatedCollection: res.data.data }));
      } else {
        res = await createCollection(collectionFormData);
        dispatch(addCollection({ collection: res.data.data }));
      }

      resetDataAndClose();
    } catch (e) {
      console.log(e);
      setIsLoding(false);
    }
  };

  // Before closing the modal we should reset all the data and then close if it is not in Editing mode
  // this function will colse the modal, before that it will reset all the state
  const resetDataAndClose = () => {
    setCollectionData({
      title: '',
      description: '',
      tags: [],
      image: null,
      isPublic: false,
    });
    setIsLoding(false);
    modalCloseHandler();
  };

  // getting current selected mode

  const { selectedMode } = useContext(switchMode);
  return (
    <Modal isOpen={isOpen} onClose={modalCloseHandler}>
      <div className="flex flex-col items-center justify-between h-full gap-3 px-3">
        {/* Heading */}
        <div className="flex justify-between w-full">
          <h1
            className={`text-start font-medium text-[20px] ${
              selectedMode === 'light' ? 'text-black' : 'text-neutral-50'
            } `}
          >
            {isEditing ? 'Edit Collection' : 'Create Collection'}
          </h1>
          <IconButton onClick={resetDataAndClose}>
            {selectedMode === 'light' ? (
              <img src={cancelIcon} name="cancel" />
            ) : (
              <img src={CancelWhite} name="cancel" />
            )}
          </IconButton>
        </div>
        <hr
          className={`w-[97%] border ${
            selectedMode === 'light'
              ? 'border-neutral-300'
              : 'border-dark-secondary'
          } `}
        />
        {/* Data */}
        <div className="flex flex-col items-center justify-center w-full gap-3">
          {/* Collection Name Input */}
          <div className="w-[100%]">
            <div className="flex items-center justify-between w-full">
              <Label name="Collection Title" htmlFor="title" />
              <small
                className={`text-xs ${
                  selectedMode === 'light' ? '' : 'text-neutral-300'
                } `}
              >
                <span
                  className={`${
                    collectionData.title?.length > 40 ? 'text-error-500' : ''
                  }`}
                >
                  {collectionData.title?.length}
                </span>
                /{40}
              </small>
            </div>
            <Input
              type="text"
              name="title"
              variant={selectedMode === 'light' ? '' : 'darkDefault'}
              onChange={onChangeHandler}
              value={collectionData.title}
            />
          </div>
          {/* Collection Description Input */}
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <Label name="Description" htmlFor="description" />
              <small
                className={`text-xs ${
                  selectedMode === 'light' ? '' : 'text-neutral-300'
                } `}
              >
                <span
                  className={`${
                    collectionData.description?.length > 240
                      ? 'text-error-500'
                      : ''
                  }`}
                >
                  {collectionData.description?.length}
                </span>
                /{240}
              </small>
            </div>
            <TextArea
              onChange={onChangeHandler}
              name="description"
              value={collectionData.description}
            />
          </div>

          {/* Collection Tag */}

          {/* Collection Thumbnail Input */}
          <div className="w-full">
            <Label name="Upload Thumnail" htmlFor="image" />
            <Input
              type={'file'}
              name="image"
              variant={selectedMode === 'light' ? 'file' : 'darkFile'}
              placeholder="Upload image"
              onChange={onFileUploadHandler}
              accept="image/*"
            />
            {!isValidFileSize && (
              <small className="text-xs text-error-500">
                image should be at most 1MB
              </small>
            )}
          </div>

          {/* Collection Privacy Input */}
          <div className="flex items-center justify-between w-full">
            <p
              className={`${
                selectedMode === 'light'
                  ? 'text-neutral-700'
                  : 'text-neutral-50'
              } `}
            >
              Select Privacy
            </p>
            {/* Switch */}
            <div
              className={`flex relative items-start justify-center gap-1.5 p-1 w-40 sm:w-40 h-[32px] ${
                selectedMode === 'light'
                  ? 'border-neutral-300 bg-neutral-300'
                  : 'border-dark-border bg-dark-secondary'
              } border-2 rounded-[100px]`}
            >
              <div
                className={`relative z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${
                  selectedMode === 'light'
                    ? !collectionData.isPublic
                      ? 'text-white'
                      : 'text-black'
                    : 'text-white'
                } text-sm sm:text-base font-normal`}
                onClick={() => handleSwitchPrivacy(false)}
              >
                <span>Private</span>
              </div>
              <div
                className={`relative z-10 rounded text-sm sm:text-base w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${
                  selectedMode === 'light'
                    ? collectionData.isPublic
                      ? 'text-white'
                      : 'text-black'
                    : 'text-white'
                }  font-normal`}
                onClick={() => handleSwitchPrivacy(true)}
              >
                <span>Public</span>
              </div>
              <div
                className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded-[102px] z-[1]  bg-primary-500 ${
                  !collectionData.isPublic
                    ? 'translate-x-[5%]'
                    : 'translate-x-[100%]'
                }`}
              ></div>
            </div>
          </div>
          <div className="text-neutral-600 w-full text-[0.8rem]">
            <span className="text-error-500">Note: </span>Public Collections
            will be featured on the explore page
          </div>
        </div>
        {/* Actions */}
        <div
          className={`flex w-full sm:justify-between justify-evenly items-center ${
            isEditing && 'gap-1'
          }`}
        >
          <Button
            variant={'primary'}
            disabled={!isCorrectData || isSameData} // button will be disabled untli all required data is correct
            onClick={onSubmit}
            isLoading={isLoading}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <span>{isEditing ? 'Save' : 'Create'}</span>
            )}
          </Button>
          {isEditing && (
            <Button
              variant={
                selectedMode === 'light' ? 'secondaryOutline' : 'darkOutlined'
              }
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
export default CollectionModal;
