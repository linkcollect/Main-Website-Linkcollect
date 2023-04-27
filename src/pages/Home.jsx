import React, { useEffect, useState } from "react";
import Collectionitem from "../components/Collectionitem/Collectionitem";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import PageLoader from "../components/Loader/PageLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllCollections } from "../api-services/collectionService";
import { dataSortByType } from "../utils/utils";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // gloabl collections
  const [collections, SetCollections] = useState([]);

  // Filterd/search collection that will be shown
  const [filteredCollection, setFiltererdCollection] = useState([]);

  const [loading, setLoadeing] = useState(true);

  const [linkData, setLinkData] = useState({
    publicLink: 0,
    privateLink: 0,
  });
  useEffect(() => {
    if (!auth.token) {
      return navigate("/");
    }
    setLoadeing(true);
    const getCollections = async () => {
      try {
        const res = await getAllCollections();
        const sorteData = dataSortByType(res.data.data);
        let publicLink = 0;
        let privateLink = 0;
        console.log(res.data.data)
        sorteData.map((data) => (data.isPublic ? publicLink++ : privateLink++));
        setLinkData({
          privateLink: privateLink,
          publicLink: publicLink,
        });
        SetCollections(sorteData);
        setFiltererdCollection(sorteData);
        setLoadeing(false);
      } catch (error) {
        setLoadeing(false);
      }
    };
    getCollections(auth.token);
  }, []);

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
    console.log(searchQuery);
    // Api call and state upadte
  };

  return (
    <div className="flex bg-bgSecondary">
      <div className="flex-1">
        <Sidebar
          numberOfPublicLink={linkData.publicLink}
          numberOfPrivateLink={linkData.privateLink}
          numberOfLinks={linkData.privateLink+linkData.publicLink}
          profileView={true}
        />
      </div>
      <div className="w-full flex-2 h-screen overflow-y-hidden">
        {/* Top bar */}
        <div className="px-8 bg-bgPrimary">
          <p className="text-left font-bold text-[30px] pt-10">
            Ohayo, {auth.user.username}
          </p>
          <div className="w-full mt-3">
            <form onSubmit={searchHnadeler}>
              <Search
                onSearch={searchHnadeler}
                onChnageHandler={setSearchQuery}
              />
            </form>
          </div>

          {/* Tabs */}
          <div className="mt-10 text-left font-semibold flex relative">
            <div
              className={`p-2 cursor-pointer ${
                tab === 1 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(1)}
            >
              My Collections
            </div>
            <div
              className={`p-2 cursor-pointer ${
                tab === 2 ? "border-b-2 border-b-primary" : null
              }`}
              onClick={() => tabHander(2)}
            >
              Explore all
            </div>
          </div>
        </div>
        {/* Collections */}
        <div className=" w-full h-[75%]">
          {loading ? (
            <div className="flex h-full w-full justify-center items-center">
              <PageLoader />
            </div>
          ) : filteredCollection.length > 0 ? (
            <div className="w-full mx-auto h-full overflow-y-scroll py-4">
              <div className="w-[90%] mx-auto flex flex-wrap gap-2">
                {filteredCollection.map((collections) => (
                  <Collectionitem
                    id={collections._id}
                    image={collections.image}
                    title={collections.title}
                    links={collections.timelines.length}
                    type={collections.isPublic}
                    description={collections.description}
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
