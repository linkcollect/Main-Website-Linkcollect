import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/TopBar";
import { useParams, useNavigate } from "react-router-dom";
import { getCollection } from "../api-services/collectionService";
import PageLoader from "../components/Loader/PageLoader";
import { getByUsername } from "../api-services/userService";
import CollectionModal from "../components/EditCollection/CollectionModal";
import { updateCollection } from "../api-services/collectionService";
import { Helmet } from "react-helmet";
import BookmarkItem from "../components/BookmarkItem/BookmarkItem";
const Bookmarks = ({ user, handleSetUser, windowWidth }) => {
  const navigation = useNavigate();
  const { collectionId, username } = useParams();
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visitedUser, setVisitedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [isAllBookmarksSeleted,setIsAllBookmarksSeleted] = useState(false);
  // this is for when i will search something and have selected some bookmarks;
  // const [searchedSelectedBookmarks,setSearchedBookmarks] = useState([]);
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
      // if anythng is selcted or not if yes add it to the filteredSeletedBookmarks
    }
    // addToFilterSelectedBookmarks(newfilteredBookmarks);
    setFilteredCollection(newfilteredCollection);
    //may be after search user has selected something
    checkIfAllBookmarskIsSelected();
  };

  

  // All bookmarks selected handler
  const isStillOneBookmarkSelected = selectedBookmarks.length>0;
  const allBookmarksSelelectHandler = (e) =>{
    console.log(e.target.checked);
    setIsAllBookmarksSeleted(true);
    if(e.target.checked){
    let allSelectedBookMarksId = []
    filteredCollection.timelines.map(timeline=>allSelectedBookMarksId.push(timeline._id))
    setSelectedBookmarks(allSelectedBookMarksId);
  }else{
    setIsAllBookmarksSeleted(false);
    setSelectedBookmarks([]);
  }
}


  // Bookmark Select handler
  const addSelectedBookmarks = (id) =>{
    // Not searched anyththg
    if(filteredCollection.timelines.length===collection.timelines.length){
      let newSelectedBookmarks = [...selectedBookmarks];
      newSelectedBookmarks.push(id);
      setSelectedBookmarks(newSelectedBookmarks);
      // console.log(newSelectedBookmarks);
    }else{

    }
    checkIfAllBookmarskIsSelected();
  }

  // Bookmark Unselect Handler
  const removeBookBarkFromSelectedList = (id) =>{
    // For example all the bookamarks is seletected then after
    // unselecting one bookmark, all bookamarks is no selected to make it false
    if(isAllBookmarksSeleted) setIsAllBookmarksSeleted(false);
    setSelectedBookmarks(prevData=>prevData.filter(prevId=>id!=prevId)) ; 
  }

  const checkIfAllBookmarskIsSelected = () =>{
    console.log(selectedBookmarks.length,selectedBookmarks);
    if(selectedBookmarks.length + 1 === collection.timelines.length){
      setIsAllBookmarksSeleted(true);
    }else{
      console.log("hello");
      setIsAllBookmarksSeleted(false);
    }
  }
 
  // For helmet purposes
  const { title, description } = collection;

  return (
    <div className="flex w-full min-h-screen ">
      <Helmet>
        <title>{collection.title}</title>

        {/* below is not working yet but above is !! */}
        {/* <meta property="og:image" content={defaultCollectionImage} />
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/> */}
      </Helmet>
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

      {windowWidth > 800 && (
        <div className="flex-1">
          <Sidebar user={visitedUser} handleSetUser={handleSetUser} />
        </div>
      )}

      <div className="flex flex-col w-full h-screen overflow-y-hidden mx-auto">
        <div className="px-[5rem]">
        {/* Header : Collection Details , Actions */}
        <div className="flex items-center justify-center w-full pt-2 mx-auto">
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

        {/* Checked Items : Number of CheckItems, Action Select All and Uncheck All */}
        {selectedBookmarks.length > 0 && <div className="flex items-center gap-5">
          {/* Number items and uncheck all */}
          <div>
          <input type="checkbox" checked={isStillOneBookmarkSelected}/>
            <span className="ml-1 text-neutral-800">{`${selectedBookmarks.length}/${collection.timelines?.length} Links Selected`}</span>
          </div>
          {/* Select All */}
          <div>
            <input type="checkbox" checked={isAllBookmarksSeleted} onClick={allBookmarksSelelectHandler}/>
            <span className="ml-1 text-neutral-800">Select All</span>
          </div>
        </div>}

        </div>
          
        {/* Bookmarks Container */}
        <div className="w-full h-[65%] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <PageLoader />
            </div>
          ) : collection.timelines && collection.timelines.length > 0 ? (
            <div className="w-full h-[calc(100%-16px)] py-4 overflow-y-scroll scrollbar-hide">
              <div className="w-[90%] h-[calc(100%-16px)] mx-auto space-y-2">
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
                    isAllBookmarksSeleted={isAllBookmarksSeleted}
                    isStillOneBookmarkSelected = {isStillOneBookmarkSelected}
                    isSelectedAlready={selectedBookmarks.findIndex(selectedBookmark => selectedBookmark === timeline._id)}
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
  );
};

export default Bookmarks;
