import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import upvote from '../../assets/Upvote.svg';
import pinSvg from '../../assets/pinSvg.svg';
import filledPinSvg from '../../assets/filledPinSvg.svg';
import viewsSvg from '../../assets/views.svg';
import defultCollectionImage from '../../assets/defaultCollectio.svg';
import { nameShortner } from '../../utils/utils';
import bmSidebar from '../../assets/bmSidebar.svg';
import upvoted from '../../assets/upvoted.svg';
import saved from '../../assets/saved.svg';
import darkSaved from '../../assets/darkMode/darkmodeSaved.svg';
import darkUpvote from '../../assets/darkMode/darkmodeUpvote.svg';
import darkEye from '../../assets/darkMode/darkmodeEye.svg';
import Chip from '../UI/Chip/Chip';
import IconButton from '../UI/IconButton/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundGradient from '../UI/BackgroundGraident/BackgroundGradient';
import { switchMode } from '../../hooks/switchMode';
import duplicateSvg from '../../assets/duplicate-white.svg';
import { duplicateCollection } from '../../api-services/collectionService.js';
import toast, { Toaster } from 'react-hot-toast';
import { getUserById } from '../../api-services/authService';
import formatViews from '../../utils/utils';
import ToolTip from '../UI/ToolTip/ToolTip';

const CollectionitemV2 = React.forwardRef(
  (
    {
      id,
      image,
      title,
      links,
      isPublic,
      upvotes,
      isPinned,
      description,
      tags,
      username,
      windowWidth,
      isOwner,
      views,
      isSavedOptionVisible,
      onUpvote,
      onDownVote,
      onSave,
      onScrollPosi,
      onUnsave,
      onPin,
      isHoverable = true,
      isDuplicate = false,
      userId,
    },
    ref
  ) => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    // LOCAL STATE WILL HELP TO MUTATE THE ITEM SO QUICKLY WHEN IT COMES TO LARGE DATA
    const [isSaved, setIsSaved] = useState(false);
    const [hover, setHover] = useState(false);
    const [toolTip, setToolTip] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState({
      isClicked: false,
      number: 0,
    });
    useEffect(() => {
      if (!auth.isLoggedIn) {
        // in this case need to set the upvote length
        setIsUpvoted({
          isClicked: false,
          number: upvotes.length,
        });
        return;
      }
      const isUpvoted =
        upvotes?.findIndex(userId => auth.userId === userId) >= 0;
      const isSaved =
        auth.userData.savedCollections?.findIndex(saveId => saveId === id) >= 0;
      setIsSaved(isSaved);
      setIsUpvoted({
        isClicked: isUpvoted,
        number: upvotes.length,
      });
    }, []);
    const dispatch = useDispatch();

    //   const titleRef = useRef()

    //   useEffect(()=>{
    //       if (hover) {
    //         titleRef.current = title
    //       } else {
    //           titleRef.current = description
    //       }
    //   }, [hover])
    const upvoteHandler = e => {
      e.stopPropagation();
      if (!auth.isLoggedIn) {
        navigate('/login');
        return;
      }
      if (!isUpvoted.isClicked) {
        setIsUpvoted(prev => ({
          isClicked: true,
          number: prev.number + 1,
        }));
        dispatch(onUpvote(id, auth.userId));
      } else {
        setIsUpvoted(prev => ({
          isClicked: false,
          number: prev.number - 1,
        }));
        dispatch(onDownVote(id, auth.userId));
      }
    };

    const saveHandler = e => {
      e.stopPropagation();
      if (!auth.isLoggedIn) {
        navigate('/login');
        return;
      }
      if (!isSaved) {
        setIsSaved(true);
        dispatch(onSave(id));
      } else {
        setIsSaved(false);
        dispatch(onUnsave(id));
      }
    };

    const onClickUsername = async e => {
      e.stopPropagation();
      const getUser = await getUserById(userId);
      username = getUser.data.data.username;
      navigate(`/${username}`);
    };
    const onCardClick = async e => {
      // console.log("username", username)
      e.stopPropagation();
      if (onScrollPosi) {
        onScrollPosi();
      }
      navigate(`/${username}/c/${id}`);
    };

    const onDuplicate = async (e, id) => {
      e.stopPropagation();
      try {
        let dup = await duplicateCollection(id);
        toast.success('Collection Duplicated in your profile Successfully 😎', {
          style: {
            border: '1px solid #4B4C63',
            padding: '6px',
            color: '#713200',
            boxShadow: 'none',
            width: 'max-content',
            minWidth: 'max-content',
          },
        });
      } catch (error) {
        console.log(error);
        toast.error('Collection Duplication Failed 😫', {
          style: {
            border: '1px solid #4B4C63',
            padding: '6px',
            color: '#713200',
            boxShadow: 'none',
            width: 'max-content',
            minWidth: 'max-content',
          },
        });
      }
    };
    // getting current selected mode

    const { selectedMode } = useContext(switchMode);

    return (
      <>
        <div
          className={`relative bg-bgPrimary border ${
            selectedMode === 'dark'
              ? 'border-dark-secondary'
              : 'border-neutral-200 hover:shadow-md '
          }  rounded-lg w-full group 
        h-[210px] transition duration-300 ease-in-out cursor-pointer select-none`}
          ref={ref}
          onMouseEnter={() => {
            isHoverable && setHover(true);
          }}
          onMouseLeave={() => {
            isHoverable && setHover(false);
          }}
          onClick={e => onCardClick(e)}
        >
          <Toaster position="top-center" reverseOrder={true} />

          {isOwner && !isDuplicate && (
            <IconButton
              className={`z-10 absolute p-1 transition-all duration-500 rounded-sm bg-black/[0.20] top-2 left-2 ${
                !isPinned ? 'group-hover:opacity-100 opacity-0' : 'opacity-1'
              }`}
              onClick={e => onPin(e, id)}
            >
              {isPinned ? (
                <img src={filledPinSvg} alt="pin" />
              ) : (
                <img src={pinSvg} alt="pin" />
              )}
            </IconButton>
          )}

          {isDuplicate && (
            <IconButton
              className={`z-10 absolute p-1 transition-all duration-500 rounded-sm bg-black/[0.20] top-2 left-2 ${
                hover ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={e => onDuplicate(e, id)}
              onMouseEnter={() => setToolTip(true)}
              onMouseLeave={() => setToolTip(false)}
            >
              {toolTip && <ToolTip />}
              <img src={duplicateSvg} alt="pin" />
            </IconButton>
          )}

          {image !== 'undefined' &&
          image !== undefined &&
          image !== 'null' &&
          image !== null ? (
            <div className="w-full h-[109px] relative">
              <img
                src={
                  image !== 'undefined' &&
                  image !== undefined &&
                  image !== 'null' &&
                  image !== null
                    ? image
                    : defultCollectionImage
                }
                className="object-cover w-full h-full rounded-t-md"
                alt="collection img"
              />
              <div className="absolute rounded-t-md top-0 left-0 w-full h-full z-5 shadow-[inset_0_0_15px_5px_rgba(0,0,0,0.1)]"></div>
            </div>
          ) : (
            <BackgroundGradient
              hashValue={id}
              title={!hover ? title : description ? description : title}
            />
          )}
          <div className="flex  justify-between pt-2.5 px-1.5 ">
            <p
              className={`text-sm truncate font-normal ${
                selectedMode === 'dark'
                  ? 'text-neutral-200'
                  : 'text-neutral-800'
              }`}
            >
              {/* {windowWidth > 640
                ? windowWidth > 768 
                  ? windowWidth > 1024 
                    ? windowWidth > 1280 
                      ? nameShortner(title, 18)
                      : nameShortner(title, 22)
                    : nameShortner(title, 18)
                  : nameShortner(title, 22)
                : nameShortner(title, 28)} */}
              {title}
            </p>
            <p
              className={`text-sm text-right min-w-[4rem] max-h-[1rem] font-normal ${
                selectedMode === 'dark'
                  ? 'text-neutral-500'
                  : 'text-neutral-600'
              }`}
            >
              {links} Links
            </p>
          </div>

          <div className="flex items-start justify-between pt-2.5 px-1.5 gap-2 flex-col">
            <div
              className={`flex flex-wrap items-center gap-2 ${
                selectedMode === 'dark' ? 'text-neutral-50' : 'text-neutral-500'
              }`}
            >
              {isOwner && <Chip name={isPublic ? 'Public' : 'Private'} />}
              {tags?.length > 0
                ? tags?.map(tag => <Chip name={tag} isTag={true} />)
                : !isOwner && (
                    <button onClick={onClickUsername}>
                      {' '}
                      <Chip name={`by ${username}`} />
                    </button>
                  )}
            </div>
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center ">
                {/* veiws */}
                <div className="flex items-center m-1">
                  {selectedMode === 'dark' ? (
                    <img src={darkEye} alt="views" className="w-5 h-5 mr-1" />
                  ) : (
                    <img src={viewsSvg} alt="views" className="w-5 h-5 mr-1" />
                  )}
                  <p
                    className={`text-sm font-normal  ${
                      selectedMode === 'dark'
                        ? 'text-neutral-500'
                        : 'text-neutral-500'
                    }`}
                  >
                    {views ? formatViews(views) : 0}
                  </p>
                </div>
                {/* votes */}
                <IconButton
                  className={`m-1  text-sm font-normal ${
                    selectedMode === 'dark'
                      ? 'text-neutral-500'
                      : 'text-neutral-500'
                  }  `}
                  onClick={upvoteHandler}
                >
                  {selectedMode === 'dark' ? (
                    <img
                      src={isUpvoted.isClicked ? upvoted : darkUpvote}
                      alt="upvote"
                      className="w-5 h-5 mr-1 transition-all duration-200 hover:scale-110 "
                    />
                  ) : (
                    <img
                      src={isUpvoted.isClicked ? upvoted : upvote}
                      alt="upvote"
                      className="w-5 h-5 mr-1 transition-all duration-200 hover:scale-110"
                    />
                  )}
                  {isUpvoted.number}
                </IconButton>
              </div>

              {/* Saved  */}
              {isSavedOptionVisible && (
                <IconButton
                  className={`gap-1  ${
                    isSaved
                      ? 'text-primary-500'
                      : selectedMode === 'dark'
                      ? 'text-neutral-400'
                      : 'text-neutral-500'
                  }  text-[14px]`}
                  onClick={saveHandler}
                >
                  <img
                    alt="save"
                    src={
                      isSaved
                        ? saved
                        : selectedMode === 'light'
                        ? bmSidebar
                        : darkSaved
                    }
                    className="w-6 h-6 transition-all duration-200 hover:scale-110"
                  />
                  {isSaved ? '' : 'save'}
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default CollectionitemV2;
