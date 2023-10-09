import React, { useRef, useState, useEffect, useMemo, useContext } from 'react';
import { motion } from 'framer-motion';

import { useSelector } from 'react-redux';
import menuIcon from '../../../assets/3dot.svg';
import approveIcon from '../../../assets/approve.svg';

import pinIcon from '../../../assets/bookmarkPin.svg';
import { nameShortner, getOrigin, fromNow } from '../../../utils/utils';
import BackgroundGradient from '../../UI/BackgroundGraident/BackgroundGradient';
import whitePinIcon from '../../../assets/darkMode/pinIcon.svg';
import MenuWhiteIcon from '../../../assets/darkMode/MenuWhiteIcon.svg';
import RedirectWhiteIcon from '../../../assets/darkMode/RedirectWhiteIcon.svg';
import CopyWhiteIcon from '../../../assets/darkMode/whiteCopyIcon.svg';
import NoteIcon from '../../../assets/note.svg';
import WhiteNoteIcon from '../../../assets/darkMode/NoteIcon.svg';
import copyIcon from '../../../assets/copyIcon.svg';
import EcBookamrkModal from './ECBookmarkModal';
import { MenuItem } from '../../Common/ActiondropDown';
import Delete from './DeleteModal';
import IconButton from '../../UI/IconButton/IconButton';
import { switchMode } from '../../../hooks/switchMode';
import BookmarkNoteModal from './BookmarkNoteModal';
import { set } from 'react-ga';
const BookmarkItemGrid = ({
  id,
  name,
  url,
  note,
  favicon,
  windowWidth,
  updatedAt,
  isOwner,
  clickedId,
  setClickedId,
  isSelected,
  isPinned,
  isStillOneBookmarkSelected,
  onSelectedBookmark,
  onUnSelectBookamrk,
  collectionId,
  movebokmark,
  deleteBookmark,
  toggleBookmarkPin,
  collectionName,
}) => {
  const [jsonResponse, setJsonResponse] = useState({});

  // to see if checked or not
  const [checked, setChecked] = useState(false);
  const [openEditBookmarkModal, setOpenEditBookmarkModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [bookmarkDeleteModal, setBookmarkDeleteModal] = useState(false);
  const [bookmarkNoteModal, setBookmarkNoteModal] = useState(false);
  const auth = useSelector(state => state.auth);
  const bookmarkDeleteModalHandler = () => {
    setBookmarkDeleteModal(prev => !prev);
  };
  useEffect(() => {
    if (isSelected) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [isSelected]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://jsonlink.io/api/extract?url=${url}`;
      const backupApiUrl = `https://api.dub.co/metatags?url=${url}`;
      const backupLinkCollect = `https://dev.linkcollect.io/api/v1/analytics/getMetadata?url=${url}`;

      try {
        // Make the primary API request
        const response = await fetch(apiUrl);

        if (!response.ok) {
          await fetchAndSetBackup();
        } else {
          const data = await response.json();

          // Check if data.images.length is 0 or if data.description is empty or doesn't exist
          if (data?.images?.length === 0 || !data?.description) {
            await fetchAndSetBackup();
          }

          setJsonResponse(data);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();

    const fetchAndSetBackup = async () => {
      // const backupApiUrl = `https://api.dub.co/metatags?url=${url}`;
      const backupLinkCollect = `https://dev.linkcollect.io/api/v1/analytics/getMetadata?url=${url}`;

      // If the primary API request fails, fall back to the backup API
      const backupResponse = await fetch(backupLinkCollect);

      if (!backupResponse.ok) {
        throw new Error('Both API requests failed');
      }

      let data = {
        images: [],
        description:
          'This Link has no Description 😔, but hey do you know that with linkcollect you can save all tabs using just a command and share them with your friends like this collection ?',
      };

      const res = await backupResponse.json();

      console.log(res);

      if (res.data.description) {
        data.description = res.data.description;
      }
      if (res.data.images) {
        data.images = res.data.images;
      }

      setJsonResponse(data);
      console.log('-', data.images[0]);
    };
  }, [url, setJsonResponse]);
  const copyRef = useRef();

  const bookmarkEditModalHandler = () => {
    setOpenEditBookmarkModal(prev => !prev);
  };

  const onCopy = () => {
    if (copyRef) copyRef.current.src = approveIcon;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      try {
        copyRef.current.src = copyIcon;
      } catch (error) {
        // console.error(error)
      }
    }, 500);
  };

  const onActionClickeHandler = type => {
    switch (type) {
      case 'EDIT':
        bookmarkEditModalHandler();
        setClickedId(null);
        return;
      case 'DELETE':
        bookmarkDeleteModalHandler();
        setClickedId(null);
        return;
      case 'PIN':
        setClickedId(null);
        setBookmarkNoteModal(false);
        setHovered(false);
        toggleBookmarkPin(id);
        return;
      default:
    }
  };

  const handleBookmarkNoteModal = () => {
    setBookmarkNoteModal(prev => !prev);
  };

  useEffect(() => {
    if (hovered) {
      setBookmarkNoteModal(true);
    } else {
      setBookmarkNoteModal(false);
    }
  }, [hovered]);

  const getFaviconFromURL = link => {
    const favIconBaseURL =
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=';
    const origin = new URL(link).origin;
    return `${favIconBaseURL}${origin}`;
  };

  // Popup Action menu
  const popupActionMenu = useMemo(() => {
    return [
      {
        name: 'Edit',
        onClick: onActionClickeHandler,
        type: 'EDIT',
      },
      {
        name: !isPinned ? 'Pin' : 'Unpin',
        onClick: onActionClickeHandler,
        type: 'PIN',
      },
      // Move Menu will be here

      {
        name: 'Delete',
        onClick: onActionClickeHandler,
        type: 'DELETE',
      },
    ];
  }, [isPinned]);

  // dark and light mode switch
  const { selectedMode } = useContext(switchMode);

  return (
    <>
      {jsonResponse && (
        <>
          <EcBookamrkModal
            isOpen={openEditBookmarkModal}
            onClose={bookmarkEditModalHandler}
            isEditing={true}
            collectionID={collectionId}
            originalData={{
              title: name,
              link: url,
              note: note,
            }}
            bookmarkID={id}
          />
          <Delete
            onClose={bookmarkDeleteModalHandler}
            isOpen={bookmarkDeleteModal}
            collectionID={collectionId}
            bookmarkID={id}
            heading="Delete Bookmark"
            subheading={`Delete ${name} from ${collectionName}`}
          />
          {/* adding z index 100 below solves notes problem, but creates problem in sorting */}
          <div
            className={`relative bg-bgPrimary border ${
              selectedMode === 'light'
                ? 'border-neutral-200'
                : 'border-neutral-600'
            } hover:shadow-md transform ${
              clickedId === id ? 'z-[100]' : 'hover:z-[100] '
            } hover:scale-[1.04] rounded-lg w-full group h-[279px] transition duration-200 ease-in-out cursor-pointer select-none`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {note && bookmarkNoteModal && (
              <BookmarkNoteModal
                note={note}
                className={'absolute'}
              ></BookmarkNoteModal>
            )}

            <a
              // className=""
              href={url}
              rel="noreferrer"
              target="_blank"
            >
              {isPinned && (
                <div
                  className={`w-[20px] h-[20px] absolute z-[1] top-2 left-2 cursor-pointer border  ${
                    selectedMode === 'light'
                      ? 'border-neutral-300 bg-black/[0.20]'
                      : 'bg-dark-primary border-dark-secondary'
                  }  rounded-md`}
                >
                  {selectedMode === 'light' ? (
                    <img
                      key="pin-icon"
                      className=""
                      src={whitePinIcon}
                      alt=""
                    />
                  ) : (
                    <img
                      key="pin-icon"
                      className=""
                      src={whitePinIcon}
                      alt=""
                    />
                  )}
                </div>
              )}
              {/* <button className="flex items-center justify-center z-10 absolute p-1 transition-all duration-500 rounded-sm bg-black/[0.20] top-2 left-2 group-hover:opacity-100 opacity-0">
            <img src={whitePinIcon} alt="pinIcon" />
          </button> */}

              {note && !hovered && windowWidth > 1024 && (
                <div
                  className={`flex  items-center  justify-center absolute top-6 -translate-y-1/2 right-4 xl:right-4 ${
                    windowWidth < 1150 && ''
                  } transition-all duration-300 z-[1] xl:p-0.9 rounded-md border border-primary-500 p-1 text-xs xl:text-sm font-normal  ${
                    selectedMode === 'light'
                      ? 'text-white bg-black bg-opacity-70'
                      : 'bg-dark-primary text-neutral-50'
                  } `}
                >
                  {windowWidth > 1280 ? (
                    ' Note Attached'
                  ) : (
                    <>
                      {selectedMode === 'light' ? (
                        <img src={NoteIcon} alt="" className="" />
                      ) : (
                        <img src={WhiteNoteIcon} alt="" className="" />
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="w-full h-[105px] relative">
                {jsonResponse?.images?.[0] ? (
                  <img
                    src={jsonResponse?.images[0]}
                    alt=""
                    onError={() => {
                      setJsonResponse(prev => ({
                        ...prev,
                        images: [],
                      }));

                      // jsonResponse.images[0] =
                      //   'https://media.discordapp.net/attachments/1075034816849924166/1153938590192128040/Frame.jpg?ex=651e558f&is=651d040f&hm=dd966ebc52ebda4c53c4af3cb0cae55e02bad8c561f7f161307577a50d246e90&=&width=1934&height=1158';
                    }}
                    className="object-cover w-full h-full rounded-t-md"
                  />
                ) : (
                  <BackgroundGradient
                    hashValue={id}
                    title={
                      windowWidth < 640
                        ? nameShortner(getOrigin(url), 25)
                        : nameShortner(getOrigin(url), 40)
                    }
                  />
                )}
              </div>
            </a>
            <div
              className={`px-4 py-2 ${
                selectedMode === 'light'
                  ? ' hover:bg-neutral-100'
                  : ' hover:bg-neutral-800'
              }  transition-all duration-75`}
            >
              <a
                // className=""
                href={url}
                rel="noreferrer"
                target="_blank"
              >
                <p
                  className={`font-medium  ${
                    selectedMode === 'light'
                      ? 'text-neutral-700'
                      : 'text-neutral-300'
                  } text-start  line-clamp-2 min-h-[48px]`}
                >
                  {name}
                </p>
                {/* description */}
                {jsonResponse?.description ? (
                  <p
                    className={`mt-3 text-sm   ${
                      selectedMode === 'light'
                        ? 'text-neutral-500'
                        : 'text-neutral-400'
                    } font-light text-start line-clamp-3 min-h-[62px]`}
                  >
                    {jsonResponse.description}
                  </p>
                ) : (
                  <p
                    className={`mt-3 text-sm  ${
                      selectedMode === 'light'
                        ? 'text-neutral-500'
                        : 'text-neutral-400'
                    } font-light text-start line-clamp-3 min-h-[62px]`}
                  >
                    {name}
                  </p>
                )}
              </a>
              <hr className="my-2 border-[#7575756B]" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 ">
                  {/* Timestamp */}
                  <img src={favicon} alt="faviconIcon" className="w-4 h-4" />
                  <p
                    className={` text-xs font-medium whitespace-nowrap  ${
                      selectedMode === 'light'
                        ? 'text-neutral-500'
                        : 'text-dark-placeholder'
                    } `}
                  >
                    Added {fromNow(updatedAt)}
                  </p>
                </div>
                {!isStillOneBookmarkSelected && (
                  <div className="flex justify-end gap-3 ">
                    <IconButton
                      onClick={onCopy}
                      className="flex items-center justify-center "
                    >
                      {selectedMode === 'light' ? (
                        <img
                          ref={copyRef}
                          src={copyIcon}
                          alt=""
                          className="block mx-auto cursor-pointer"
                        />
                      ) : (
                        <img
                          ref={copyRef}
                          src={CopyWhiteIcon}
                          alt=""
                          className="block mx-auto cursor-pointer"
                        />
                      )}
                    </IconButton>
                    {/* <a
                className="items-center hidden sm:flex"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {selectedMode === "light" ?
                  <img
                    src={redirectIcon}
                    alt=""
                    className="block mx-auto cursor-pointer "
                  />
                  :
                  <img
                    src={RedirectWhiteIcon}
                    alt=""
                    className="block mx-auto cursor-pointer "
                  />
                }
              </a> */}
                    {auth.isLoggedIn && isOwner && (
                      <div className="relative">
                        <button
                          className="flex items-center"
                          onClick={() =>
                            setClickedId(prev => (prev === id ? null : id))
                          }
                        >
                          {selectedMode === 'light' ? (
                            <img
                              src={menuIcon}
                              alt=""
                              className="block mx-auto cursor-pointer threedotbutton"
                            />
                          ) : (
                            <img
                              src={MenuWhiteIcon}
                              alt=""
                              className="block mx-auto cursor-pointer threedotbutton"
                            />
                          )}
                        </button>
                        {clickedId === id && (
                          <motion.div
                            id="options"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`w-[135px] rounded border absolute z-[9990] top-[28px] p-2 right-0 ${
                              selectedMode === 'light'
                                ? 'border-neutral-300 bg-neutral-100'
                                : 'border-dark-border bg-dark-primary'
                            } `}
                          >
                            {popupActionMenu.map((menuItem, index) => (
                              <>
                                <MenuItem
                                  name={menuItem.name}
                                  onClick={menuItem.onClick}
                                  type={menuItem.type}
                                  key={menuItem.type}
                                />
                                {index !== popupActionMenu.length - 1 && (
                                  <div
                                    className={`w-full h-[1px] ${
                                      selectedMode === 'light'
                                        ? 'bg-neutral-300'
                                        : 'bg-dark-border'
                                    } mt-1 mb-1`}
                                  />
                                )}
                              </>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookmarkItemGrid;
