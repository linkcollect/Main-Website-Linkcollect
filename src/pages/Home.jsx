
import React, { useEffect, useState } from "react";
import Collectionitem from "../components/Collectionitem/Collectionitem";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import PageLoader from "../components/Loader/PageLoader";
import { Link,  useParams } from "react-router-dom";
import { dataSortByType } from "../utils/utils";
import { getByUsername } from "../api-services/userService";
import jwt from "jsonwebtoken"
import BookmarkItems from "../components/BookmarkItem/BookmarkItems";
const Home = ({user,handleSetUser,windowWidth}) => {
  const [tab, setTab] = useState(1);
  const { username } = useParams();
  const [vistiedUser, setVisitiedUser] = useState({})

  // gloabl collections
  const [collections, SetCollections] = useState([]);

  // Filterd/search collection that will be shown
  const [filteredCollection, setFiltererdCollection] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getCollections = async () => {
      try {
        const res = await getByUsername(username);
        const sorteData = dataSortByType(res.data.data.collections);
        let publicCollection = 0;
        let privateCollection = 0;
        sorteData.map((data) => (data.isPublic ? publicCollection++ : privateCollection++));
        SetCollections(sorteData);
        setFiltererdCollection(sorteData);
      
        if(user.isLoggedIn){
          if(username===user.username){
            //Means Loggedin user visintig their own profile so no need of fetching the data of the user
            setVisitiedUser({
              username:res.data.data.username,
              name:res.data.data.name,
              email:res.data.data.email,
              isLoggedIn:true,
              isOwner:true,
              link:{
                publicCollection,
                privateCollection,
              }
            })
          }else {
            // Loggedin user has Vistied others profile so need to get the user info
            // api call
            setVisitiedUser({
              username:res.data.data.username,
              name:res.data.data.name,
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
          setVisitiedUser({
            username:res.data.data.username,
            name:res.data.data.name,
            isLoggedIn:false,
            isOwner:false,
            link:{
              publicCollection,
              privateCollection,
            }
          })
        }

        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    };

    getCollections();
  }, [user]);

  // useEffect(() => {
  //   console.log(tab);
  //   if (tab === 1) {
  //     // Api calls for the own collections
  //     setCollectionsItems(collections);
  //   } else {
  //     // Api calls for the global collections
  //     setCollectionsItems(collectionsGlobal);
  //   }
  // }, [tab]);

  // const upVoteHadnler = (id) => {
  //   //call api for backend update
  //   const copiedCollection = [...collectionItems];
  //   const updatedCollectionIndex = copiedCollection.findIndex(
  //     (collection) => id.toString() === collection.id
  //   );
  //   console.log(updatedCollectionIndex);
  //   copiedCollection[updatedCollectionIndex].upvoate = copiedCollection[
  //     updatedCollectionIndex
  //   ].upvoate
  //     ? false
  //     : true;
  //   setCollectionsItems(copiedCollection);
  // };

  const tabHander = (index) => {
    setTab(index);
  };

  const searchHnadeler = (e) => {
    e.preventDefault();
      // As we need to search in global collections
      const tempCollections = [...collections];
      let newfilteredCollection = tempCollections;
      if (e.target.value !== "") {
        newfilteredCollection = tempCollections.filter((collection) =>
          collection.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
      }
      setFiltererdCollection(newfilteredCollection);
  };

  return (
    
    <div className={`flex bg-bgSecondary ${ windowWidth < 700 ? "flex-col" : "" }`}>
      <div className={`flex-1`}>
        <Sidebar
          user={vistiedUser}
          handleSetUser={handleSetUser}
          windowWidth={windowWidth}
        />
      </div>
      <div className="w-full flex-2 max-h-none sm:h-screen  overflow-y-hidden">
        {/* Top bar */}
        <div className="px-8 bg-bgPrimary">
        {/* Modify this */}
          <div className="flex w-full justify-between items-center">
          <p className={`text-left font-bold text-[30px] pt-10 ${windowWidth < 700 ? "hidden" : ""}`}>
            Ohayo, {user?.username}
          </p> 
         { windowWidth > 700 && <>
          {!user.isLoggedIn && (
          <div className="flex space-x-2">
              <Link to="/login" className="lexend text-base text-primary rounded-lg border-primary border-2 px-3 py-2 sm:px-7 sm:py-2">
                Log in
              </Link>
              <Link to="/signup" className="lexend text-base bg-primary rounded-lg border-primary border-2 px-3 py-2 sm:px-7 sm:py-2  text-bgPrimary">
                Sign up
              </Link>
            </div>
        )}
        </>}
          </div>
          
          <div className={`w-full mt-3 ${windowWidth < 700 ? "hidden" : ""}`}>
            <form onSubmit={searchHnadeler}>
              <Search
                onSearch={searchHnadeler}
              />
            </form>
          </div>

          {/* Tabs */}
          <div className={`mt-10 text-left font-semibold flex relative ${windowWidth < 700 ? "hidden" : ""} `}>
            <div
              className={`p-2 cursor-pointer ${
                tab === 1 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(1)}
            >
              {vistiedUser.isOwner ? "My Collections" : "Collections"}
            </div>
            {/* <div
              className={`p-2 cursor-pointer ${
                tab === 2 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(2)}
            >
              Explore all
            </div> */}
          </div>
        </div>
        {/* Collections */}
        <div className=" w-full h-[65%]">
          {loading ? (
            <div className="flex h-full w-full justify-center items-center">
              <PageLoader />
            </div>
          ) : filteredCollection.length > 0 ? (
            <div className="w-full mx-auto h-full overflow-y-scroll py-4">
              <div className="w-[95%] mx-auto flex flex-wrap gap-2">
                {filteredCollection.map((collections) => (
                  <Collectionitem
                    id={collections._id}
                    image={collections.image}
                    title={collections.title}
                    links={collections.timelines.length}
                    type={collections.isPublic}
                    description={collections.description}
                    username={collections.username}
                    windowWidth={windowWidth}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <p className="text-textPrimary text-5xl mb-5">
                No Collection Found
              </p>
              <p className="text-textPrimary">You can add it from extension</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;