import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLoader from "../components/Loader/PageLoader";
import CollectionModal from "../components/Common/CollectionModal";
import BookmarkItem from "../components/Sections/Bookmarks/BookmarkItem";
import deleteIcon from "../assets/delete2.svg";
import moveIcon from "../assets/move.svg";
import { Delete } from "../components/DeleteModal/Delete";
import Move from "../components/MoveModal/Move";
import EcBookamrkModal from "../components/Sections/Bookmarks/ECBookmarkModal";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
import Search from "../components/Common/Search";
import CollectionInfoHeader from "../components/Sections/Bookmarks/CollectionInfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../store/actions/bookmarks.action";
const Bookmarks = ({ user, handleSetUser, windowWidth }) => {
  const navigation = useNavigate();
  const { collectionId, username } = useParams();
  const [collection, setCollection] = useState([]);


  const [filteredCollection, setFilteredCollection] = useState([]);

  // Number Selected bookmarks
  const [numberOfSelectedLinkes, setNumberOfSelectedLinks] = useState(0);

  // Modal State: Collection
  const [editCollectionModalOpen, setEditCollectionModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Modal State: Bookmarks
  const [openCreateBookmarkModal, setOpenCreateBookmarkModal] = useState(false);

  // Sorting Dropdown State
  const [showDropdown, setShowDropdown] = useState(false)
  const [query, setQuery] = useState("");
  //For handiling click event on the bookmarkItem
  const [clickedId, setClickedId] = useState(null);

  const auth = useSelector(state => state.auth);
  const collectionData = useSelector(state => state.collectionData)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarks({ collectionId }))
  }, []);


  const editCollectionModalHandler = () => {
    setEditCollectionModalOpen((prev) => !prev);
  };

  const bookmarkCreateModalHandler = () => {
    console.log("hhelo")
    setOpenCreateBookmarkModal(prev => !prev);
  }



  // Delete Modal Open/CLose
  // const deleteModalHandler = () => {
  //   setOpenDeleteModal((prev) => !prev);
  // };

  // // Move Modal Open/Close
  // const moveModalHandler = () => {
  //   setOpenMoveModal((prev) => !prev);
  // };


  const backHandler = (e) => {
    e.preventDefault();
    navigation(`/${username}`);
  };

  // Logic for search 


  // Logic for Select and Unselect
  // All bookmarks selected handler
  const allBookmarksSelelectHandler = (e) => {
    // need to update the filtered list;
    const newSelectedFilteredTimelines = { ...filteredCollection };
    const newSelectedCollectionTimlines = { ...collection };
    let newNumberOfSeletecedLinks = numberOfSelectedLinkes;
    if (e.target.checked) {
      newSelectedFilteredTimelines.timelines.map((tl) => {
        if (!tl.isSelected) {
          tl.isSelected = true;
          newNumberOfSeletecedLinks++;
        }
      });
    } else {
      newSelectedFilteredTimelines.timelines.map((tl) => {
        tl.isSelected = false;
        newNumberOfSeletecedLinks--;
      });
    }
    setNumberOfSelectedLinks(newNumberOfSeletecedLinks);
    newSelectedCollectionTimlines.timelines.map((tlFil) => {
      const timeLineIndex = newSelectedCollectionTimlines.timelines.findIndex(
        (tlCol) => tlCol._id === tlFil._id
      );
      newSelectedCollectionTimlines.timelines[timeLineIndex].isSelected =
        tlFil.isSelected;
    });
    setFilteredCollection(newSelectedFilteredTimelines);
    // setCollection(newSelectedCollectionTimlines);
  };

  // Unselect all bookmarks
  const unSelectAllBookamrks = () => { };

  // Bookmark Select handler
  const addSelectedBookmarks = (id) => {
    setNumberOfSelectedLinks((prev) => prev + 1);
    toogleSelectBookmarks(id);
  };

  // Bookmark Unselect Handler
  const removeBookBarkFromSelectedList = (id) => {
    toogleSelectBookmarks(id);
    setNumberOfSelectedLinks((prev) => prev - 1);
  };

  // Bookamrk select/unselect toggler
  const toogleSelectBookmarks = (id) => {
    let newCollection = { ...collection };
    let newfilteredCollection = { ...filteredCollection };
    let indexToBeSelected = newfilteredCollection.timelines.findIndex(
      (timeline) => timeline._id === id
    );
    newfilteredCollection.timelines[indexToBeSelected].isSelected =
      newfilteredCollection.timelines[indexToBeSelected].isSelected
        ? false
        : true;

    let indexToBeSelectedInOriginal = newCollection.timelines.findIndex(
      (timeline) => timeline._id === id
    );
    newCollection.timelines[indexToBeSelectedInOriginal].isSelected =
      newfilteredCollection.timelines[indexToBeSelected].isSelected;

    setFilteredCollection(newfilteredCollection);
    setCollection(newCollection);
  };

  const getNumberOfFilterdSelectedList = () => {
    let cnt = 0;
    collection.timelines &&
      filteredCollection.timelines.map((tl) => {
        if (tl.isSelected) cnt++;
      });
    return cnt;
  };
  const numberOfSelectedLinksFromFilter = getNumberOfFilterdSelectedList();

  return (
    <BaseLayout>
      <div className="flex w-full min-h-screen">
        {/* Collection Edit Modal */}
        {!collectionData.isFetching && <CollectionModal
          isOpen={editCollectionModalOpen}
          modalCloseHandler={editCollectionModalHandler}
          isEditing={true}
          originalCollectionData={{
            title: collectionData.collectionData?.title,
            description: collectionData.collectionData?.description,
            tags: collectionData.collectionData?.tags,
            isPublic: collectionData.collectionData?.isPublic,
            image: collectionData.collectionData?.image
          }}
          collectionId={collectionId}
        />}

        {/* Delete Modal */}
        {/* <Delete
        isOpen={openDeleteModal}
        onClose={deleteModalHandler}
        numberOfSelectedLinkes={numberOfSelectedLinkes}
        nameOfTheCollection={collection?.title}
      /> */}

        {/* Move Modal */}
        {/* <Move
        isOpen={openMoveModal}
        onClose={moveModalHandler}
        numberOfSelectedLinkes={numberOfSelectedLinkes}
        nameOfTheCollection={collection?.title}
      /> */}

        {/* Bookmarks */}
        {/* Create Bookamrk */}
        <EcBookamrkModal isOpen={openCreateBookmarkModal} onClose={bookmarkCreateModalHandler} isEditing={false} collectionID={collectionId}/>

        <div className="flex flex-col w-full h-screen overflow-y-hidden">
          <div className="px-10">
            {/* Header : Collection Details , Actions */}
            <div className="w-full pt-2 mx-auto ">
              <CollectionInfoHeader
                windowWidth={windowWidth}
                onBack={backHandler}
                collectionName={collectionData.collectionData?.title}
                collectionDesc={collectionData.collectionData?.description}
                noOfLinks={collectionData.collectionData?.length}
                image={collectionData.collectionData?.image}
                tags={collectionData.collectionData?.tags}
                isPublic={collectionData.collectionData?.isPublic}
                isOwner={username == auth.username}
                editCollectionModalOpener={editCollectionModalHandler}
                createBookmarkModalOpener={bookmarkCreateModalHandler}
              />
              {/* Search Bar and Filter */}
              <div className=" w-[100%]">
                <div className="flex mt-5 gap-2">
                  <Search query={query} setQuery={setQuery} />
                  {/* <div onClick={() => setShowDropdown(!showDropdown)} className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-neutral-200 gap-2 border">
                <img src={SortByIcon} alt="" />
                <span className="text-sm font-medium">Sort by</span> */}

                  {/* dropdown */}
                  {/* {showDropdown &&
                  <div className="w-[188px] rounded border absolute z-50 bottom-[-105px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                    <p className="text-base font-normal text-neutral-800">Recently Added</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800">Alphabetically</p>
                  </div>
                }
              </div> */}
                </div>
              </div>
            </div>

            {/* Checked Items : Number of CheckItems, Action Select All and Uncheck All, Move and Delete */}
            {numberOfSelectedLinkes > 0 && (
              <div className="flex justify-between w-full">
                {/*  Checked Items : Number of CheckItems, Action Select All and Uncheck All*/}
                <div className="flex items-center gap-5">
                  {/* Number items and uncheck all */}
                  <div>
                    <input
                      type="checkbox"
                      checked={numberOfSelectedLinkes > 0}
                      onClick={unSelectAllBookamrks}
                    />
                    <span className="ml-1 text-neutral-800">{`${numberOfSelectedLinkes}/${collection.timelines.length}`}</span>
                  </div>
                  {/* Select All */}
                  <div>
                    <input
                      type="checkbox"
                      checked={
                        numberOfSelectedLinksFromFilter ===
                        filteredCollection.timelines.length
                      }
                      onClick={allBookmarksSelelectHandler}
                    />
                    <span className="ml-1 text-neutral-800">Select All</span>
                  </div>
                </div>

                {/* Actions: Move and Delete  */}
                <div className="flex items-center gap-5">
                  <button
                    // onClick={deleteModalHandler}
                    className="w-auto px-[7px] py-[6px] flex items-center justify-center bg-neutral-200 border border-neutral-300 rounded-md gap-1"
                  >
                    <img src={deleteIcon} alt="delete" />
                    <span>Delete</span>
                  </button>
                  <button
                    // onClick={moveModalHandler}
                    className="w-auto px-[7px] py-[6px] flex items-center justify-center bg-neutral-200 border border-neutral-300 rounded-md gap-1"
                  >
                    <img src={moveIcon} alt="move" />
                    <span>Move</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bookmarks Container */}
          <div className="w-full h-[60%] mx-auto">
            {collectionData.isFetching ? (
              <div className="flex items-center justify-center w-full h-full">
                <PageLoader />
              </div>
            ) : collectionData.collectionData && collectionData.collectionData.timelines?.length > 0 ? (
              <div className="w-full h-[calc(100%-55px)] py-4 overflow-y-scroll scrollbar-hide">
                <div className="w-[100%] h-[calc(100%-65px)] space-y-2 px-10">
                  {collectionData.collectionData.timelines.map((timeline) => (
                    <BookmarkItem
                      key={timeline._id}
                      id={timeline._id}
                      name={timeline.title}
                      url={timeline.link}
                      favicon={timeline.favicon}
                      windowWidth={windowWidth}
                      updatedAt={timeline.updatedAt}
                      // isOwner={visitedUser}
                      clickedId={clickedId}
                      setClickedId={setClickedId}
                      isSelected={timeline.isSelected}
                      isStillOneBookmarkSelected={numberOfSelectedLinkes > 0}
                      onSelectedBookmark={addSelectedBookmarks}
                      onUnSelectBookamrk={removeBookBarkFromSelectedList}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="mb-5 text-5xl text-textPrimary">
                  No bookmarks Found
                </p>
                <p className="text-textPrimary">You can add it from extension</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Bookmarks;
