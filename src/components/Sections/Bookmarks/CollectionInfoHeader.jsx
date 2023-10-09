// Package Imports
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Assets imports
import backarrow from '../../../assets/back-arrow.svg';
import share from '../../../assets/share.svg';
import MainLogo from '../../../assets/mainLogo.svg';
import defultCollectionImage from '../../../assets/defaultCollectio.svg';
import editIcon from '../../../assets/edit-primary.svg';
import addIcon from '../../../assets/add.svg';
import AddPrimary from '../../../assets/add-primary.svg';
import deleteIcon from '../../../assets/delete-primary.svg';
import upvoteIcon from '../../../assets/upvoteIcon-primary.svg';
import upvotedIcon from '../../../assets/upvoted.svg';
import savedIcon from '../../../assets/saved.svg';
import saveIcon from '../../../assets/save-primary.svg';
import ShareDarkMode from '../../../assets/darkMode/share.svg';
import SharePrimary from '../../../assets/share-primary.svg';

import AddWhite from '../../../assets/darkMode/addIcon.svg';
import EditDarkMode from '../../../assets/darkMode/editicon.svg';
import DeleteIcon from '../../../assets/darkMode/deleteicon.svg';
import WhiteBackArrow from '../../../assets/darkMode/WhiteBackArrow.svg';
// Utilites/Fuctions Import
import { nameShortner } from '../../../utils/utils';

// Components
import Chip from '../../UI/Chip/Chip';
import Button from '../../UI/Button/Button';
import IconButton from '../../UI/IconButton/IconButton';

// Actions
import {
  upvoteAction,
  downvoteAction,
  saveAction,
  unsaveAction,
} from '../../../store/actions/bookmarks.action';
import ShareCollectionModal from './ShareCollectionModal';
import BackgroundGradient from '../../UI/BackgroundGraident/BackgroundGradient';
import { switchMode } from '../../../hooks/switchMode';

const CollectionInfoHeader = ({
  windowWidth,
  onBack,
  collectionName,
  collectionDesc,
  noOfLinks,
  image,
  isOwner,
  editCollectionModalOpener,
  createBookmarkModalOpener,
  deleteCollectionModalHandler,
  tags,
  isPublic,
  upvotes,
  collectionId,
  collectionUsername,
}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shareModelOpen, setShareMpdelOpen] = useState(false);

  useEffect(() => {
    const isUpvoted = upvotes?.findIndex(userId => auth.userId === userId) >= 0;
    const isSaved =
      auth.userData.savedCollections?.findIndex(
        saveId => saveId === collectionId
      ) >= 0;
    setIsSaved(isSaved);
    setIsUpvoted(isUpvoted);
  }, []);

  const upvoteHandler = () => {
    if (!auth.isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!isUpvoted) {
      setIsUpvoted(true);
      dispatch(upvoteAction(collectionId, auth.userId));
    } else {
      setIsUpvoted(false);
      dispatch(downvoteAction(collectionId, auth.userId));
    }
  };

  const saveHandler = () => {
    if (!auth.isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!isSaved) {
      setIsSaved(true);
      dispatch(saveAction(collectionId));
    } else {
      setIsSaved(false);
      dispatch(unsaveAction(collectionId));
    }
  };

  const shareModalOpenHandler = () => {
    setShareMpdelOpen(prev => !prev);
  };

  // getting selected mode for theme change
  const { selectedMode } = useContext(switchMode);

  return (
    <>
      <ShareCollectionModal
        onClose={shareModalOpenHandler}
        isOpen={shareModelOpen}
        collectionName={collectionName}
        tags={tags}
      />
      <div className="w-full pb-2 bg-bgPrimary">
        {/* Actions : Back */}
        <div className="flex justify-between mb-5 bg-bgPrimary">
          <div className="flex items-center">
            <Button
              onClick={onBack}
              variant={
                selectedMode === 'light' ? 'secondaryOutline' : 'darkOutlined'
              }
              className={`gap-0 px-4 ${
                selectedMode === 'light' ? 'bg-white' : 'bg-dark-primary'
              }`}
            >
              {selectedMode === 'light' ? (
                <img
                  src={backarrow}
                  className="w-[20px] h-[20px] mr-1"
                  alt=""
                />
              ) : (
                <img
                  src={WhiteBackArrow}
                  className="w-[20px] h-[20px] mr-1"
                  alt=""
                />
              )}

              <p>Back</p>
            </Button>
          </div>
        </div>

        {/* Collection Inormation */}
        <div className="flex flex-col sm:flex-row justify-between sm:gap-10 sm:mt-2">
          {/* Collection Details Section */}
          <div className="flex flex-col w-full gap-4 overflow-hidden sm:flex-row">
            {/* Collection Thumbnail */}
            {image !== 'undefined' && image !== undefined ? (
              <div className="flex justify-center rounded-sm items-center w-[100%] sm:w-[294px] sm:h-[137px]">
                <img
                  src={
                    image !== 'undefined' && image !== undefined ? image : ''
                  }
                  className="block object-cover rounded"
                  alt=""
                />
              </div>
            ) : (
              <BackgroundGradient
                hashValue={collectionId}
                title={collectionName}
                className="sm:w-[294px] sm:h-[137px]"
              />
            )}

            {/* Collection Info */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex flex-col gap-2 sm:flex-row align-center">
                {/* Collection Title, Links, Share */}
                <div className="flex items-baseline justify-between gap-2 mb-1 sm:justify-start">
                  <h1
                    className={`text-xl font-bold lexend ${
                      selectedMode === 'light'
                        ? 'text-neutral-700'
                        : 'text-neutral-300'
                    }`}
                  >
                    {windowWidth < 640
                      ? nameShortner(collectionName, 50)
                      : collectionName}
                  </h1>
                  <h1
                    className={`w-[5rem] text-base ${
                      selectedMode === 'light'
                        ? 'text-neutral-500'
                        : 'text-neutral-400'
                    }`}
                  >
                    {noOfLinks} links
                  </h1>
                </div>
                {windowWidth > 680 ? (
                  isOwner ? (
                    <button
                      // onClick={onBack}
                      onClick={shareModalOpenHandler}
                      className={`flex items-center justify-center px-4 w-min h-[24px] ${
                        selectedMode === 'light'
                          ? 'bg-neutral-200'
                          : 'bg-dark-primary'
                      } border border-primary-500 rounded-[40px] p-2`}
                    >
                      {selectedMode === 'dark' ? (
                        <img
                          src={ShareDarkMode}
                          className="w-[20px] h-[20px] mr-1"
                          alt=""
                        />
                      ) : (
                        <img
                          src={share}
                          className="w-[20px] h-[20px] mr-1"
                          alt=""
                        />
                      )}
                      <p
                        className={`text-[14px] ${
                          selectedMode === 'light'
                            ? ' text-neutral-700'
                            : 'text-neutral-200'
                        }`}
                      >
                        Share
                      </p>
                    </button>
                  ) : (
                    <Link
                      to={`/${collectionUsername}`}
                      state={{ fromCollection: true }}
                      className={`sm:mt-[2px] ${
                        selectedMode === 'light'
                          ? 'text-primary-400'
                          : 'text-primary-200 '
                      }`}
                    >
                      by <span>{collectionUsername}</span>
                    </Link>
                  )
                ) : (
                  <></>
                )}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Chip name={isPublic ? 'Public' : 'Private'} />
                {tags?.length > 0 && tags.map(tag => <Chip name={tag} />)}
              </div>

              <p
                className={`w-full mt-2 text-sm ${
                  selectedMode === 'light'
                    ? 'text-black'
                    : 'text-dark-placeholder'
                } `}
              >
                {windowWidth > 640
                  ? nameShortner(collectionDesc, 500)
                  : collectionDesc}
              </p>
            </div>
          </div>

          {/* Collection Actions for logged In user*/}
          {auth.isLoggedIn && isOwner ? (
            <div className="flex items-start sm:justify-center gap-3 mt-[0.75rem] sm:mt-[-0.25rem]">
              {/* Add bookmark */}
              <IconButton onClick={createBookmarkModalOpener}>
                {selectedMode === 'dark' ? (
                  <img
                    src={AddPrimary}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-primary-800 rounded-[0.25rem]"
                  />
                ) : (
                  <img
                    src={AddPrimary}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-neutral-200 rounded-[0.25rem]"
                  />
                )}
              </IconButton>
              {/* Edit */}
              <IconButton onClick={editCollectionModalOpener}>
                {selectedMode === 'dark' ? (
                  <img
                    src={editIcon}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-primary-800 rounded-[0.25rem]"
                  />
                ) : (
                  <img
                    src={editIcon}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-neutral-200 rounded-[0.25rem]"
                  />
                )}
              </IconButton>
              {/* Delete */}
              <IconButton onClick={deleteCollectionModalHandler}>
                {selectedMode === 'dark' ? (
                  <img
                    src={deleteIcon}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-primary-800 rounded-[0.25rem]"
                  />
                ) : (
                  <img
                    src={deleteIcon}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-neutral-200 rounded-[0.25rem]"
                  />
                )}
              </IconButton>
              {windowWidth < 680 && (
                <IconButton>
                  {selectedMode === 'dark' ? (
                    <img
                      src={SharePrimary}
                      onClick={shareModalOpenHandler}
                      className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-primary-800 rounded-[0.25rem]"
                    />
                  ) : (
                    <img
                      src={SharePrimary}
                      onClick={shareModalOpenHandler}
                      className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-neutral-200 rounded-[0.25rem]"
                    />
                  )}
                </IconButton>
              )}
            </div>
          ) : (
            <div className="flex justify-start sm:justify-center mt-[0.75rem] sm:mt-[-0.25rem] gap-3 items-start">
              {/* Add bookmark */}
              <IconButton onClick={upvoteHandler}>
                <img
                  src={isUpvoted ? upvotedIcon : upvoteIcon}
                  className={`min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] ${
                    selectedMode === 'dark'
                      ? 'bg-primary-800'
                      : 'bg-neutral-200'
                  } rounded-[0.25rem]`}
                />
              </IconButton>
              {/* Edit */}
              <IconButton onClick={saveHandler}>
                <img
                  src={isSaved ? savedIcon : saveIcon}
                  className={`min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] ${
                    selectedMode === 'dark'
                      ? 'bg-primary-800'
                      : 'bg-neutral-200'
                  } rounded-[0.25rem]`}
                />
              </IconButton>
              {/* Delete */}
              {/* <IconButton onClick={shareModalOpenHandler}>
                <img src={share} className="w-[1.8rem] h-[1.8rem]" />
              </IconButton> */}
              {/* {windowWidth < 680 &&  */}
              <IconButton>
                {selectedMode === 'dark' ? (
                  <img
                    src={SharePrimary}
                    onClick={shareModalOpenHandler}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-primary-800 rounded-[0.25rem]"
                  />
                ) : (
                  <img
                    src={SharePrimary}
                    onClick={shareModalOpenHandler}
                    className="min-w-[1.8rem] min-h-[1.8rem] p-[0.25rem] bg-neutral-200 rounded-[0.25rem]"
                  />
                )}
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CollectionInfoHeader;
