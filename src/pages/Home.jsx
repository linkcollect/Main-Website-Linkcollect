
import React, { useEffect, useState } from "react";
import Collectionitem from "../components/Collectionitem/Collectionitem";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import PageLoader from "../components/Loader/PageLoader";
import { Link, useParams } from "react-router-dom";
import { dataSortByType } from "../utils/utils";
import { getByUsername } from "../api-services/userService";
import jwt from "jsonwebtoken"
import BookmarkItems from "../components/BookmarkItem/BookmarkItems";
import { deleteCollection } from "../api-services/collectionService";
import approve from '../assets/approve.svg'
import { useRef } from "react";
import paste from '../assets/paste.svg'
import { Helmet } from "react-helmet";
import CollectionitemV2 from "../components/Collectionitem/CollectionCardV2";
import SortBy from '../assets/sortBy.svg'
import Plus from '../assets/plus.svg'
import NavbarV2 from "../components/NavbarV2/NavbarV2";
const Home = ({ user, handleSetUser, windowWidth }) => {
  const [tab, setTab] = useState(1);
  const { username } = useParams();

  const [vistiedUser, setVisitiedUser] = useState({})
  // sort by dropdown
  const [showDropdown, setShowDropdown] = useState(false)

  // gloabl collections
  const [collections, SetCollections] = useState([]);

  // Filterd/search collection that will be shown
  const [filteredCollection, setFiltererdCollection] = useState([]);

  // Name of User
  const [nameOfUser, setNameofUser] = useState('')

  const [loading, setLoading] = useState(true);
  const copyImageRef = useRef()

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
        setNameofUser(res.data.data.name)
        if (user.isLoggedIn) {
          if (username === user.username) {
            //Means Loggedin user visintig their own profile so no need of fetching the data of the user
            setVisitiedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              email: res.data.data.email,
              isLoggedIn: true,
              isOwner: true,
              link: {
                publicCollection,
                privateCollection,
              }
            })
          } else {
            // Loggedin user has Vistied others profile so need to get the user info
            // api call
            setVisitiedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              isLoggedIn: true,
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
          setVisitiedUser({
            username: res.data.data.username,
            name: res.data.data.name,
            isLoggedIn: false,
            isOwner: false,
            link: {
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
  // Bookmark delete handler
  const deleteHandler = async (collectionId) => {

    try {
      const newdata = collections.filter((collection) => collection._id !== collectionId);
      setFiltererdCollection(newdata)
      SetCollections(newdata)
      await deleteCollection(collectionId);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className={`flex bg-neutral-50 ${windowWidth < 700 ? "flex-col" : ""}`}>
      <Helmet>

        <title>{nameOfUser?.toUpperCase()} - (User on Linkcollect)</title>
      </Helmet>
      <div className={`flex-1`}>
        <Sidebar
          user={vistiedUser}
          handleSetUser={handleSetUser}
          windowWidth={windowWidth}
        />
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-5 overflow-y-hidden flex-2 max-h-none sm:h-screen">
        {/* navbar */}
        <NavbarV2 />


        {/* Top bar */}
        <div className="flex flex-col items-start justify-center w-full gap-8 mx-auto 3xl:px-0 px-8 max-w-[1500px]">


          {/* Search bar , add collection , sort by */}
          <div className="flex flex-col items-start justify-center w-full gap-4 ">
            {/* Modify this */}
            <div className="flex items-center justify-between w-full ">
              <p className={`text-left font-medium  text-[30px] text-neutral-700  ${windowWidth < 700 ? "hidden" : ""}`}>
                Ohayo, {user?.username}
              </p>
              <div className="w-48 cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg  bg-primary-500 gap-2 ">
                <img src={Plus} alt="" />
                <span className="text-sm font-medium text-white">Add collection</span>
              </div>

              {/* {windowWidth > 700 && <>
              {!user.isLoggedIn && (
                <div className="flex space-x-2">
                  <Link to="/login" className="px-3 py-2 text-base border-2 rounded-lg lexend text-primary border-primary sm:px-7 sm:py-2">
                    Log in
                  </Link>
                  <Link to="/signup" className="px-3 py-2 text-base border-2 rounded-lg lexend bg-primary border-primary sm:px-7 sm:py-2 text-bgPrimary">
                    Sign up
                  </Link>
                </div>
              )}
            </>} */}
            </div>

            <div className={`w-full flex items-start justify-between gap-6 ${windowWidth < 700 ? "hidden" : ""}`}>
              <div className=" w-[calc(100%-212px)]">
                <form onSubmit={searchHnadeler}>
                  <Search
                    onSearch={searchHnadeler}
                  />
                </form>
              </div>

              {/* sort by */}
              <div onClick={() => setShowDropdown(!showDropdown)} className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-neutral-200 gap-2 border">
                <img src={SortBy} alt="" />
                <span className="text-sm font-medium">Sort by</span>

                {/* dropdown */}
                {showDropdown &&
                  <div className="w-[188px] rounded border absolute z-50 bottom-[-140px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                    <p className="text-base font-normal text-neutral-800">Most upvotes</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800">Most links</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800">Recently updated</p>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* not in v2 design  */}
          {/* Tabs
          <div className={` text-left font-semibold flex relative ${windowWidth < 700 ? "hidden" : ""} `}>
            <div
              className={`p-2 cursor-pointer ${tab === 1 ? "border-b-2 border-b-primary" : null
                }`}
              onClick={() => tabHander(1)}
            >
              {vistiedUser.isOwner ? "My Collections" : "Collections"}
            </div>
            <div
              className={`p-2 cursor-pointer ${
                tab === 2 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(2)}
            >
              Explore all
            </div>
          </div> */}

        </div>
        {/* Collections */}
        <div className=" w-full h-[70%]">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <PageLoader />
            </div>
          ) : filteredCollection.length > 0 ? (
            <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
              <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
                {filteredCollection.map((collections) => (
                  // <Collectionitem
                  //   id={collections._id}
                  //   image={collections.image}
                  //   title={collections.title}
                  //   links={collections.timelines.length}
                  //   type={collections.isPublic}
                  //   description={collections.description}
                  //   username={collections.username}
                  //   windowWidth={windowWidth}
                  //   onDelete={deleteHandler}
                  //   isOwner={vistiedUser.isOwner}
                  //   vistiedUser={vistiedUser}

                  // />
                  <CollectionitemV2
                    id={collections._id}
                    image={collections.image}
                    title={collections.title}
                    links={collections.timelines.length}
                    type={collections.isPublic}
                    description={collections.description}
                    username={collections.username}
                    windowWidth={windowWidth}
                    onDelete={deleteHandler}
                    isOwner={vistiedUser.isOwner}
                    vistiedUser={vistiedUser}
                    votes={collections.votes}
                    views={collections.views}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="mb-5 text-5xl text-textPrimary">
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