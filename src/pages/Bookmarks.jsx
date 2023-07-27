import React, { useState, useEffect } from "react";
import TopBar from "../components/Topbar/TopBar";
import { useParams, useNavigate } from "react-router-dom";
import { getCollection } from "../api-services/collectionService";
import PageLoader from "../components/Loader/PageLoader";
import { getByUsername } from "../api-services/userService";
import CollectionModal from "../components/EditCollection/CollectionModal";
import { updateCollection } from "../api-services/collectionService";
import { Helmet } from "react-helmet";
import BookmarkItem from "../components/BookmarkItem/BookmarkItem";
import deleteIcon from "../assets/delete2.svg";
import moveIcon from "../assets/move.svg";
import { Delete } from "../components/DeleteModal/Delete";
import Move from "../components/MoveModal/Move";
import EcBookamrkModal from "../components/ECBookmarkModal/EcBookamrkModal";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
const Bookmarks = ({ user, handleSetUser, windowWidth }) => {
  const navigation = useNavigate();
  const { collectionId, username } = useParams();
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visitedUser, setVisitedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberOfSelectedLinkes, setNumberOfSelectedLinks] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openMoveModal, setOpenMoveModal] = useState(false);
  //For handiling click event
  const [clickedId, setClickedId] = useState(null);

  //edit collection
  const [data, setData] = useState({
    title: "",
    privacy: "",
    description: "",
  });
  const [image, setImage] = useState();
  const onInput = (e) => {
    e.preventDefault();
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  const onInputFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await getByUsername(username);
        const collection = await getCollection(collectionId);
        let publicCollection = 0;
        let privateCollection = 0;
        res.data.data.collections.map((data) =>
          data.isPublic ? publicCollection++ : privateCollection++
        );
        // Adding isSeleceted filed to the data to manage the data
        // console.log(collection.data.data);
        const timeLineWithIsSelectedData = [];
        // const data = collection.data.data
        collection.data.data.timelines.map((timeline) => {
          const newTimeLine = {
            ...timeline,
            isSelected: false,
          };
          timeLineWithIsSelectedData.push(newTimeLine);
        });

        collection.data.data.timelines = timeLineWithIsSelectedData;

        setCollection(collection.data.data);
        setFilteredCollection(collection.data.data);
        if (user.isLoggedIn) {
          if (username === user.username) {
            //Means Loggedin user visintig their own profile so no need of fetching the data of the user
            setVisitedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              email: res.data.data.email,
              isOwner: true,
              link: {
                publicCollection,
                privateCollection,
              },
            });
          } else {
            // Loggedin user has Vistied others profile so need to get the user info
            // api call
            setVisitedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              isOwner: false,
              link: {
                publicCollection,
                privateCollection,
              },
            });
          }
        }
        // Not loogedIn
        else {
          setVisitedUser({
            username: res.data.data.username,
            name: res.data.data.name,
            isOwner: false,
            link: {
              publicCollection,
              privateCollection,
            },
          });
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  // Setting initial values to edit collection
  useEffect(() => {
    setData({
      ...data,
      title: collection.title,
      description: collection.description,
      privacy: collection.isPublic ? "public" : "private",
    });
  }, [collection]);
  //edit collection

  const editCollectionModalOpener = () => {
    setIsOpen((prev) => !prev);
  };

  // Delete Modal Open/CLose
  const deleteModalHandler = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  // Move Modal Open/Close
  const moveModalHandler = () => {
    setOpenMoveModal((prev) => !prev);
  };

  const handleEditCollection = async () => {
    if (
      data.title === "" ||
      data.title.length > 40 ||
      data.description.length > 240
    )
      return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", data.title);
      if (data.description !== "") {
        form.append("description", data.description);
      }
      form.append("isPublic", data.privacy === "public" ? true : false);
      if (image !== "") {
        form.append("image", image);
      }
      const response = await updateCollection(collectionId, form);
      setCollection(response.data.data);
    } catch (error) {}
    setImage(undefined);
    setData((data) => ({ ...data, title: "", description: "", privacy: "" }));
    setIsOpen(false);
    setLoading(false);
  };

  const backHandler = (e) => {
    e.preventDefault();
    navigation(`/${username}`);
  };

  const searchHnadeler = (e) => {
    e.preventDefault();
    // As we need to search in global collections
    const tempCollection = { ...collection };
    let newfilteredCollection = tempCollection;
    let newfilteredBookmarks = [];
    if (e.target.value !== "") {
      newfilteredBookmarks = tempCollection.timelines.filter((collection) =>
        collection.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      newfilteredCollection.timelines = newfilteredBookmarks;
    }
    setFilteredCollection(newfilteredCollection);
  };
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
  const unSelectAllBookamrks = () => {};

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

  // For helmet purposes
  const { title, description } = collection;

  return (
    <BaseLayout>
    <div className="flex w-full min-h-screen">
      {/* Collection Edit Modal */}
      <CollectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        inputHandler={onInput}
        imageHandler={onInputFile}
        image={image}
        data={data}
        onSubmit={handleEditCollection}
        loading={loading}
        windowWidth={windowWidth}
      />
      {/* Delete Modal */}
      <Delete
        isOpen={openDeleteModal}
        onClose={deleteModalHandler}
        numberOfSelectedLinkes={numberOfSelectedLinkes}
        nameOfTheCollection={collection?.title}
      />

      {/* Move Modal */}

      <Move
        isOpen={openMoveModal}
        onClose={moveModalHandler}
        numberOfSelectedLinkes={numberOfSelectedLinkes}
        nameOfTheCollection={collection?.title}
      />

      {/* Edit Bookamrk */}
      <EcBookamrkModal isOpen={false} onClose={()=>{}} isEditing={false} name={"Hello"} link="hello"/>

      <div className="flex flex-col w-full h-screen overflow-y-hidden">
        <div className="px-10">
          {/* Header : Collection Details , Actions */}
          <div className="flex items-center justify-center w-full pt-2 mx-auto ">
            <TopBar
              windowWidth={windowWidth}
              onBack={backHandler}
              collectionName={collection?.title}
              collectionDesc={collection?.description}
              noOfLinks={collection.timelines?.length}
              image={collection?.image}
              isLoggedIn={user.isLoggedIn}
              isOwner={visitedUser.isOwner}
              searchHnadeler={searchHnadeler}
              editCollectionModalOpener={editCollectionModalOpener}
            />
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
                  onClick={deleteModalHandler}
                  className="w-auto px-[7px] py-[6px] flex items-center justify-center bg-neutral-200 border border-neutral-300 rounded-md gap-1"
                >
                  <img src={deleteIcon} alt="delete" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={moveModalHandler}
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
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <PageLoader />
            </div>
          ) : collection.timelines && collection.timelines.length > 0 ? (
            <div className="w-full h-[calc(100%-55px)] py-4 overflow-y-scroll scrollbar-hide">
              <div className="w-[100%] h-[calc(100%-65px)] space-y-2 px-10">
                {filteredCollection.timelines.map((timeline) => (
                  <BookmarkItem
                    key={timeline._id}
                    id={timeline._id}
                    name={timeline.title}
                    url={timeline.link}
                    favicon={timeline.favicon}
                    windowWidth={windowWidth}
                    updatedAt={timeline.updatedAt}
                    user={visitedUser}
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
