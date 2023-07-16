import React from "react";
import Search from "../../components/Search/Search";

import { Link, useParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import SortBy from "../../assets/sortBy.svg";


import PageLoader from "../Loader/PageLoader";
import { getByUsername } from "../../api-services/userService";
import { deleteCollection } from "../../api-services/collectionService";
import CollectionitemV2 from "../Collectionitem/CollectionCardV2";

import { dataSortByType } from "../../utils/utils";
import NavbarV2 from "../NavbarV2/NavbarV2";

const CollectionHeader = ({ user, handleSetUser, windowWidth,name }) => {
  const [tab, setTab] = useState(1);
  const { username } = useParams();

  const [vistiedUser, setVisitiedUser] = useState({});
  // sort by dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // gloabl collections
  const [collections, SetCollections] = useState([]);

  // Filterd/search collection that will be shown
  const [filteredCollection, setFiltererdCollection] = useState([]);

  // Name of User
  const [nameOfUser, setNameofUser] = useState("");

  const [loading, setLoading] = useState(true);
  const copyImageRef = useRef();

  useEffect(() => {
    setLoading(true);
    const getCollections = async () => {
      try {
        const res = await getByUsername(username);
        const sorteData = dataSortByType(res.data.data.collections);
        let publicCollection = 0;
        let privateCollection = 0;
        sorteData.map((data) =>
          data.isPublic ? publicCollection++ : privateCollection++
        );
        SetCollections(sorteData);
        setFiltererdCollection(sorteData);
        setNameofUser(res.data.data.name);
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
              },
            });
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
              },
            });
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
            },
          });
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
      const newdata = collections.filter(
        (collection) => collection._id !== collectionId
      );
      setFiltererdCollection(newdata);
      SetCollections(newdata);
      await deleteCollection(collectionId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    {/* <NavbarV2/> */}
      <div className="flex flex-col items-start justify-center w-full gap-8 mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        {/* Search bar , add collection , sort by */}
        <div className="flex flex-col items-start justify-center w-full gap-4 ">
          {/* Modify this */}
          <div className="flex items-center justify-between w-full ">
            <p
              className={`text-left font-medium  text-[30px] text-neutral-700  ${
                windowWidth < 700 ? "hidden" : ""
              }`}
            >
             {name}
            </p>
          
          </div>

          <div
            className={`w-full flex items-start justify-between gap-6 ${
              windowWidth < 700 ? "hidden" : ""
            }`}
          >
            <div className=" w-[calc(100%-212px)]">
              <form onSubmit={searchHnadeler}>
                <Search onSearch={searchHnadeler} />
              </form>
            </div>

            {/* sort by */}
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-neutral-200 gap-2 border"
            >
              <img src={SortBy} alt="" />
              <span className="text-sm font-medium">Sort by</span>

              {/* dropdown */}
              {showDropdown && (
                <div className="w-[188px] rounded border absolute z-50 bottom-[-140px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                  <p className="text-base font-normal text-neutral-800">
                    Most upvotes
                  </p>
                  <hr className="w-full border border-neutral-300" />
                  <p className="text-base font-normal text-neutral-800">
                    Most links
                  </p>
                  <hr className="w-full border border-neutral-300" />
                  <p className="text-base font-normal text-neutral-800">
                    Recently updated
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
    
    </div>
  );
};

export default CollectionHeader;
