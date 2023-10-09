import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLoader from '../components/UI/Loader/PageLoader';
import CollectionModal from '../components/Common/CollectionModal';
import BookmarkItem from '../components/Sections/Bookmarks/BookmarkItem';
import Delete from '../components/Sections/Bookmarks/DeleteModal';
import EcBookamrkModal from '../components/Sections/Bookmarks/ECBookmarkModal';
import BaseLayout from '../components/Layout/BaseLayout/BaseLayout';
import Search from '../components/Common/Search';
import CollectionInfoHeader from '../components/Sections/Bookmarks/CollectionInfoHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks } from '../store/actions/bookmarks.action';
import { togglePin } from '../api-services/timelineService';
import {
  setTogglePinBookmark,
  sortBookmarksByType,
} from '../store/Slices/bookmarks.slice';
import { SortActions, SortVeiw } from '../components/Common/ActiondropDown';
import SEO from '../components/SEO/SEO';
import { useContext } from 'react';
import { switchMode } from '../hooks/switchMode';
import MoreFromUser from '../components/Sections/Bookmarks/MoreFromUser';
import BookmarkItemGrid from '../components/Sections/Bookmarks/BookmarkItemGrid';
import useDropdown from '../hooks/useDropdown.js';

const Bookmarks = ({ windowWidth }) => {
  const navigation = useNavigate();
  const { collectionId, username } = useParams();

  // Modal State: Collection
  const [editCollectionModalOpen, setEditCollectionModalOpen] = useState(false);
  const [deleteCollectionModal, setDeleteCollectionModal] = useState(false);
  // Modal State: Bookmarks
  const [openCreateBookmarkModal, setOpenCreateBookmarkModal] = useState(false);
  // const [isGridView, setIsGridView] = useState('GRID_VIEW');
  const [isGridView, setIsGridView] = useState(
    windowWidth >= 768 ? 'GRID_VIEW' : 'LIST_VIEW'
  );

  // Sorting State
  const [sortingType, setSortingType] = useState('RECENETLY_UPDATED');

  // search query
  const [query, setQuery] = useState('');
  //For handiling click event on the bookmarkItem
  const [clickedId, setClickedId] = useState(null);
  const auth = useSelector(state => state.auth);
  const collectionData = useSelector(state => state.collectionData);
  const dispatch = useDispatch();

  const {
    isSortByDropdownOpen,
    isViewDropdownOpen,
    toggleSortByDropdown,
    toggleViewDropdown,
  } = useDropdown();
  useEffect(() => {
    dispatch(getBookmarks({ collectionId }));
  }, [collectionId]);

  const editCollectionModalHandler = () => {
    setEditCollectionModalOpen(prev => !prev);
  };

  const deleteCollectionModalHandler = () => {
    setDeleteCollectionModal(prev => !prev);
  };

  const bookmarkCreateModalHandler = () => {
    setOpenCreateBookmarkModal(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener('click', e => {
      if (
        !e.target.className.includes('threedotbutton') &&
        clickedId !== null
      ) {
        setClickedId(null);
      }
    });

    return document.removeEventListener('click', e => {});
  }, [clickedId]);

  const backHandler = e => {
    e.preventDefault();
    if (!auth.isLoggedIn) {
      navigation('/login');
    } else {
      navigation(-1);
    }
  };

  // Bookmark Toggle Pin
  const toggleBookmarkPin = async bookmarkID => {
    dispatch(setTogglePinBookmark({ bookmarkID, sortType: sortingType }));
    // console.log(collection);
    try {
      const res = await togglePin(collectionId, bookmarkID);
    } catch (error) {
      console.error(error);
    }
  };

  const sortdata = sortType => {
    setSortingType(sortType);
    dispatch(sortBookmarksByType({ sortType }));
  };
  const sortList = sortType => {
    setIsGridView(sortType);
    // dispatch(sortBookmarksByType({ sortType }));
  };
  const menuItem = [
    {
      name: 'Recently Updated',
      onClick: sortdata,
      type: 'RECENETLY_UPDATED',
    },
    {
      name: 'Alphabetically',
      onClick: sortdata,
      type: 'ALPHABETICAlLY',
    },
  ];
  const GridmenuItem = [
    {
      name: 'Grid view',
      onClick: sortList,
      type: 'GRID_VIEW',
    },
    {
      name: 'List view',
      onClick: sortList,
      type: 'LIST_VIEW',
    },
  ];

  // Logic for search
  const filteredBookmarks = useMemo(() => {
    return !collectionData.isFetching &&
      collectionData.collectionData.timelines?.length > 0
      ? collectionData.collectionData.timelines.filter(tItem =>
          tItem.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];
  }, [query, collectionData.collectionData, collectionData.isFetching]);
  // dark and light mode switch
  const { selectedMode } = useContext(switchMode);

  return (
    <BaseLayout>
      <SEO
        title={
          collectionData.collectionData?.title
            ? collectionData.collectionData?.title
            : null
        }
        description={
          collectionData.collectionData?.description
            ? collectionData.collectionData?.description
            : 'This is an amazing collection of links, curated by ' +
              collectionData.collectionData?.username
        }
        image={
          collectionData.collectionData?.image
            ? collectionData.collectionData?.image
            : null
        }
      ></SEO>
      <div className="flex flex-col w-full h-[calc(100%)] mx-auto mb-[0.5rem] overflow-y-auto scrollbar-hide">
        {/* Collection Edit Modal */}
        {!collectionData.isFetching && (
          <CollectionModal
            isOpen={editCollectionModalOpen}
            modalCloseHandler={editCollectionModalHandler}
            isEditing={true}
            originalCollectionData={{
              title: collectionData.collectionData?.title,
              description: collectionData.collectionData?.description,
              tags: collectionData.collectionData?.tags,
              isPublic: collectionData.collectionData?.isPublic,
              image: collectionData.collectionData?.image,
            }}
            collectionId={collectionId}
          />
        )}
        {!collectionData.isFetching && (
          <Delete
            isOpen={deleteCollectionModal}
            onClose={deleteCollectionModalHandler}
            collectionID={collectionId}
            heading="Delete Collection"
            subheading={`Delete the collection - ${collectionData.collectionData?.title}`}
            mode="collectionDelete"
          />
        )}

        {/* Bookmarks */}
        {/* Create Bookamrk */}
        {!collectionData.isFetching && (
          <EcBookamrkModal
            isOpen={openCreateBookmarkModal}
            onClose={bookmarkCreateModalHandler}
            isEditing={false}
            collectionID={collectionId}
          />
        )}

        <div className="flex flex-col w-full px-8 lg:px-[5rem]">
          <div className="">
            {/* Header : Collection Details , Actions */}
            <div className="w-full pt-2 mx-auto ">
              <CollectionInfoHeader
                windowWidth={windowWidth}
                onBack={backHandler}
                collectionName={collectionData.collectionData?.title}
                collectionDesc={collectionData.collectionData?.description}
                noOfLinks={collectionData.collectionData?.timelines?.length}
                image={collectionData.collectionData?.image}
                tags={collectionData.collectionData?.tags}
                isPublic={collectionData.collectionData?.isPublic}
                isOwner={collectionData.collectionData.userId === auth.userId}
                editCollectionModalOpener={editCollectionModalHandler}
                createBookmarkModalOpener={bookmarkCreateModalHandler}
                deleteCollectionModalHandler={deleteCollectionModalHandler}
                collectionId={collectionId}
                upvotes={collectionData.collectionData.upvotes}
                collectionUsername={collectionData.collectionData.username}
              />
              {/* Search Bar and Filter */}
              <div className="w-[100%] sticky z-[99]">
                <div className="relative flex flex-row items-end gap-2 mt-5 sm:flex-row">
                  <Search query={query} setQuery={setQuery} />

                  {/* sort by */}
                  <SortActions
                    name="View"
                    menuItems={GridmenuItem}
                    isOpen={isViewDropdownOpen}
                    toggleDropDown={toggleViewDropdown}
                  />
                  <SortActions
                    name="Sort By"
                    menuItems={menuItem}
                    isOpen={isSortByDropdownOpen}
                    toggleDropDown={toggleSortByDropdown}
                  />
                </div>
              </div>
            </div>

            {/* Checked Items : Number of CheckItems, Action Select All and Uncheck All, Move and Delete */}
            {/* Selecet Unslect Component will be shown here */}
          </div>

          {/* Bookmarks Container */}
          <div className="w-full h-[max] mx-auto ">
            {collectionData.isFetching ? (
              <div className="flex items-center justify-center w-full h-full">
                <PageLoader />
              </div>
            ) : collectionData.collectionData &&
              filteredBookmarks?.length > 0 ? (
              isGridView === 'GRID_VIEW' ? (
                <div className="w-full h-[calc(100%-55px)] py-10 scrollbar-hide">
                  <div className="w-[100%] h-[calc(100%-65px)] space-y-2">
                    <div className="grid justify-start w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-6 ">
                      {filteredBookmarks.map(timeline => (
                        <BookmarkItemGrid
                          key={timeline._id}
                          id={timeline._id}
                          name={timeline.title}
                          url={timeline.link}
                          note={!timeline.note ? '' : timeline.note}
                          favicon={timeline.favicon}
                          windowWidth={windowWidth}
                          updatedAt={timeline.updatedAt}
                          isOwner={
                            collectionData.collectionData.userId === auth.userId
                          }
                          clickedId={clickedId}
                          setClickedId={setClickedId}
                          isSelected={timeline.isSelected}
                          collectionId={collectionId}
                          toggleBookmarkPin={toggleBookmarkPin}
                          isPinned={timeline.isPinned}
                          collectionName={collectionData.collectionData.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[calc(100%-55px)] py-4 scrollbar-hide">
                  <div className="w-[100%] z-0 h-[calc(100%-65px)] space-y-2">
                    {filteredBookmarks.map(timeline => (
                      <BookmarkItem
                        key={timeline._id}
                        id={timeline._id}
                        name={timeline.title}
                        url={timeline.link}
                        note={!timeline.note ? '' : timeline.note}
                        favicon={timeline.favicon}
                        windowWidth={windowWidth}
                        updatedAt={timeline.updatedAt}
                        isOwner={
                          collectionData.collectionData.userId === auth.userId
                        }
                        clickedId={clickedId}
                        setClickedId={setClickedId}
                        isSelected={timeline.isSelected}
                        collectionId={collectionId}
                        toggleBookmarkPin={toggleBookmarkPin}
                        isPinned={timeline.isPinned}
                        collectionName={collectionData.collectionData.title}
                      />
                    ))}
                    <div className="h-[60px]"></div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full py-20">
                <p
                  className={`mb-5 text-5xl ${
                    selectedMode === 'light'
                      ? 'text-textPrimary'
                      : 'text-neutral-300'
                  }  `}
                >
                  No bookmarks Found
                </p>
                <p
                  className={`text-textPrimary ${
                    selectedMode === 'light'
                      ? 'text-textPrimary'
                      : 'text-neutral-300'
                  } `}
                >
                  You can add it from extension
                </p>
                <a
                  className="text-primary-400"
                  href="https://chrome.google.com/webstore/detail/linkcollect-save-share-bo/knekpacpcgkieomkhhngenjeeokddkif"
                >
                  {' '}
                  Click To Install{' '}
                </a>
              </div>
            )}
          </div>
        </div>
        {!collectionData.isFetching && (
          <MoreFromUser
            collectionData={collectionData}
            user={collectionData?.collectionData?.username}
          ></MoreFromUser>
        )}
      </div>
    </BaseLayout>
  );
};

export default Bookmarks;
