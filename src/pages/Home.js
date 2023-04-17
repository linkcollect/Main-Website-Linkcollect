import React, { useEffect, useState } from "react";
import Collectionitem from "../components/Collectionitem/Collectionitem";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import collectionImage from "../assets/collectionImage.png";
import { upload } from "@testing-library/user-event/dist/upload";
import { collections, collectionsGlobal } from "../dummyData";

const Home = () => {
  const [collectionItems, setCollectionsItems] = useState([]);
  const [tab, setTab] = useState(1);
  const [searchQuery,setSearchQuery] = useState("");

  const userName = "hasrh";

  useEffect(() => {
    console.log(tab);
    if (tab === 1) {
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

  const searchHnadeler = (e) =>{
    e.preventDefault();
    console.log(searchQuery)
    // Api call and state upadte
  }


  return (
    <div className="flex bg-bgSecondary">
      <Sidebar/>
      <div className="w-full flex-2 pl-[22rem] col-span-5 py-10 pr-[7rem]">
      <div className="fixed w-[74vw] bg-bgSecondary top-0 pt-10 pb-3">
        <p className="text-left font-bold text-[30px]">Ohayo, {userName}</p>
        <div className="w-full mt-3">
          <form onSubmit={searchHnadeler}>
          <Search onSearch={searchHnadeler} onChnageHandler={setSearchQuery}/>
          </form>
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

      </div>
        <div className="flex flex-wrap w-full gap-2 mt-[13rem]">
          {collectionItems.map((collections) => (
            <Collectionitem
              id={collections.id}
              image={collections.image}
              title={collections.title}
              links={collections.links}
              type={tab === 1 ? collections.type : null}
              explore={tab === 2 ? true : false}
              isUpvoted={tab===2 ? collections.upvoate : null}
              upVote={tab===2 ?  upVoteHadnler : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
