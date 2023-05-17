import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import BookmarkItems from "../components/BookmarkItem/BookmarkItems";
import TopBar from "../components/Topbar/TopBar";
import { useParams, useNavigate } from "react-router-dom";
import { getCollection } from "../api-services/collectionService";
import PageLoader from "../components/Loader/PageLoader";
import { getByUsername } from "../api-services/userService";
import Modal from "../components/EditCollection/Modal";
import { updateCollection } from "../api-services/collectionService";

const Bookmarks = ({ user, handleSetUser, windowWidth }) => {
  const navigation = useNavigate();
  const { collectionId, username } = useParams();
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [visitedUser, setVisitedUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  //edit collection
  const [data, setData] = useState({
    title: "",
    privacy: "public",
    description: ""
  })
  const [image, setImage] = useState();
  const onInput = (e) => {
    e.preventDefault();
    setData(state => ({ ...state, [e.target.name]: e.target.value }));
  };
  const onInputFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0])
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await getByUsername(username);
        const collection = await getCollection(collectionId);
        let publicCollection = 0;
        let privateCollection = 0;
        res.data.data.collections.map((data) => (data.isPublic ? publicCollection++ : privateCollection++));
        setCollection(collection.data.data);
        setFilteredCollection(collection.data.data)
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
              }
            })
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
              }
            })
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
            }
          })
        }

        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
      }

    }
    getData();
  }, []);

  //edit collection
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  const handleEditCollection = async () => {
    if (data.title === "" || data.title.length > 40 || data.description.length > 240) return
    setLoading(true)
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
      setCollection(response.data.data)
      // Checking for collections
      // console.log(response.data.data)
    } catch (error) {

    }
    setImage(undefined)
    setData(data => ({ ...data, title: '', description: '', privacy: '' }))
    setIsOpen(false)
    setLoading(false)
  }

  const backHandler = (e) => {
    e.preventDefault();
    navigation(-1);
  };

  const searchHnadeler = (e) => {
    e.preventDefault();
    // As we need to search in global collections
    const tempCollection = { ...collection };
    let newfilteredCollection = tempCollection;
    let newfilteredBookmarks = []
    if (e.target.value !== "") {
      newfilteredBookmarks = tempCollection.timelines.filter((collection) =>
        collection.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      newfilteredCollection.timelines = newfilteredBookmarks;
    }
    setFilteredCollection(newfilteredCollection)
  };

  return (
    <div className="flex w-full min-h-screen bg-bgSecondary">


      {windowWidth > 800 && (
        <div className="flex-1">
          <Sidebar user={visitedUser} handleSetUser={handleSetUser} />
        </div>
      )}
      <div className="flex flex-col w-full h-screen overflow-y-hidden">
        <Modal
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
        <div className="flex items-center justify-center w-full pt-2 mx-auto bg-bgPrimary ">
          <TopBar
            windowWidth={windowWidth}
            onBack={backHandler}
            collectionName={collection?.title}
            collectionDesc={
              collection?.description
            }
            noOfLinks={collection.timelines?.length}
            image={collection?.image}
            isLoggedIn={user.isLoggedIn}
            isOwner={visitedUser.isOwner}
            searchHnadeler={searchHnadeler}
            isOpen={isOpen}
            close={close}
            open={open}
          />
        </div>
        <div className="w-full h-[65%] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <PageLoader />
            </div>
          ) : collection.timelines && collection.timelines.length > 0 ? (
            <div className="w-full h-full py-4 mx-auto overflow-y-scroll scrollbar-hide">
              <div className="w-[90%] mx-auto space-y-2">
                {filteredCollection.timelines.map((timeline) => (
                  <BookmarkItems
                    key={timeline._id}
                    id={timeline._id}
                    name={timeline.title}
                    url={timeline.link}
                    favicon={timeline.favicon}
                    windowWidth={windowWidth}
                    updatedAt={timeline.updatedAt}
                    user={visitedUser}
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
