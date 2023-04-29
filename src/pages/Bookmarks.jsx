import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import BookmarkItems from "../components/BookmarkItem/BookmarkItems";
import TopBar from "../components/Topbar/TopBar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCollection } from "../api-services/collectionService";
import PageLoader from "../components/Loader/PageLoader";
import { getByUsername } from "../api-services/userService";


const Bookmarks = ({user,handleSetUser}) => {
  const navigation = useNavigate();
  const { collectionId,username } = useParams();
  const location = useLocation();
  const [collection, setCollection] = useState([]);
  const [filteredCollection,setFilteredCollection] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [visitedUser,setVisitedUser] = useState({});
  let width;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  const [windowWidth, setWindowWidth] = useState(width);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () =>{
      try {
        const res = await getByUsername(username);
        const collection = await getCollection(collectionId);
        let publicCollection = 0;
        let privateCollection = 0;
        res.data.data.collections.map((data) => (data.isPublic ? publicCollection++ : privateCollection++));
        setCollection(collection.data.data);
        setFilteredCollection(collection.data.data)
        if(user.isLoggedIn){
          if(username===user.username){
            //Means Loggedin user visintig their own profile so no need of fetching the data of the user
            setVisitedUser({
              username:username,
              isLoggedIn:true,
              email:res.data.data.email,
              isOwner:true,
              link:{
                publicCollection,
                privateCollection,
              }
            })
          }else {
            // Loggedin user has Vistied others profile so need to get the user info
            // api call
            setVisitedUser({
              username:username,
              isLoggedIn:true,
              isOwner:false,
              link:{
                publicCollection,
                privateCollection,
              }
            })
          }
        }
        // Not loogedIn
        else{
          setVisitedUser({
            username:username,
            isLoggedIn:false,
            isOwner:false,
            link:{
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

  // For responsive
  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", watchWidth);
  }, [windowWidth]);

  const backHandler = (e) => {
    e.preventDefault();
    navigation(-1);
  };

  const searchHnadeler = (e) => {
    e.preventDefault();
      // As we need to search in global collections
      const tempCollection = {...collection};
      let newfilteredCollection = tempCollection;
      let newfilteredBookmarks = []
      if (e.target.value !== "") {
        newfilteredBookmarks = tempCollection.timelines.filter((collection) =>
          collection.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        newfilteredCollection.timelines=newfilteredBookmarks;
      }
      setFilteredCollection(newfilteredCollection)
  };
  // If I am visting the collections from link
  if (!location.state && !collection.timelines) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="bg-bgSecondary min-h-screen w-full flex">
      {windowWidth > 800 && (
        <div className="flex-1">
          <Sidebar user={visitedUser} handleSetUser={handleSetUser}/>
        </div>
      )}
      <div className="h-screen w-full flex flex-col overflow-y-hidden">
        <div className="bg-bgPrimary pt-2 flex justify-center items-center w-full mx-auto ">
          <TopBar
            windowWidth={windowWidth}
            onBack={backHandler}
            collectionName={location.state?.title || collection?.title}
            collectionDesc={
              location.state?.description || collection?.description
            }
            noOfLinks={location.state?.links || collection.timelines?.length}
            image={location.state?.image || collection?.image}
            isLoggedIn={user.isLoggedIn}
            searchHnadeler={searchHnadeler}
          />
        </div>
        <div className="w-full h-[80%] mx-auto">
          {isLoading ? (
            <div className="flex h-full w-full justify-center items-center">
              <PageLoader />
            </div>
          ) : collection.timelines && collection.timelines.length > 0 ? (
            <div className="w-full mx-auto h-full  overflow-y-scroll scrollbar-hide py-4">
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
            <div className="flex flex-col h-full w-full justify-center items-center">
              <p className="text-textPrimary text-5xl mb-5">
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
