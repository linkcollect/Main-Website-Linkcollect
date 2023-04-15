import React, { useEffect, useState } from "react";
import Collectionitem from "../components/Collectionitem/Collectionitem";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import collectionImage from "../assets/collectionImage.png";
import { upload } from "@testing-library/user-event/dist/upload";
const collections = [
  {
    id: "1",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Private",
  },
  {
    id: "2",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Private",
  },
  {
    id: "3",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Private",
  },
  {
    id: "4",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Public",
  },
  {
    id: "5",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Public",
  },
  {
    id: "7",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    type: "Public",
  },
];
const collectionsGlobal = [
  {
    id: "1",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "36",
    upvoate: false
  },
  {
    id: "2",
    image: collectionImage,
    title: "Fav Ideas",
    links: "35",
    upvoate: false
  },
  {
    id: "3",
    image: collectionImage,
    title: "Fav  Ideas",
    links: "28",
    upvoate: false
  },
  {
    id: "4",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "27",
    upvoate: false
  },
  {
    id: "5",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    upvoate: false
  },
  {
    id: "7",
    image: collectionImage,
    title: "Fav Buildspace Ideas",
    links: "28",
    upvoate: false
  },
  {
    id: "8",
    image: collectionImage,
    title: "Fav Buildspace Ideas 2",
    links: "39",
    upvoate: false
  },
];

const Home = () => {
  const [collectionItems, setCollectionsItems] = useState([]);
  const [tab, setTab] = useState(1);

  const userName = "hasrh";

  useEffect(() => {
    if (tab == 1) {
      // Api calls for the own collections
      setCollectionsItems(collections);
    } else {
      // Api calls for the global collections
      setCollectionsItems(collectionsGlobal);
    }
  }, [tab]);

  const upVoteHadnler = (id) => {
    //call api for backend update
    const copiedCollection = [...collectionItems];
    const updatedCollectionIndex = copiedCollection.findIndex(collection => id.toString()===collection.id);
    console.log(updatedCollectionIndex)
    copiedCollection[updatedCollectionIndex].upvoate = copiedCollection[updatedCollectionIndex].upvoate ? false : true 
    setCollectionsItems(copiedCollection);

  };

  const tabHander = (index) => {
    setTab(index);
  };

  return (
    <div className="grid grid-cols-6">
      <Sidebar />
      <div className="w-full h-screen bg-bgSecondary col-span-5 py-10 px-20">
        <p className="text-left font-bold text-[30px]">Ohayo, {userName}</p>
        <div className="w-full mt-3">
          <Search />
          {/* Need to add filter option here */}
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

        <div className="flex flex-wrap w-full gap-2 mt-5">
          {collectionItems.map((collections) => (
            <Collectionitem
              id={collections.id}
              image={collections.image}
              title={collections.title}
              links={collections.links}
              type={tab == 1 ? collections.type : null}
              explore={tab == 2 ? true : false}
              isUpvoted={tab==2 ? collections.upvoate : null}
              upVote={tab==2 ?  upVoteHadnler : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
