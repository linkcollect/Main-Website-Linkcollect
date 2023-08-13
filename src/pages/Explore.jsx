import React, { useCallback, useEffect, useRef, useState } from "react";
import CollectionHeader from "../components/Common/CollectionHeader";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import CollectionitemV2 from "../components/Common/CollectionCard";
import PageLoader from "../components/UI/Loader/PageLoader";
import {
  upvoteAction,
  downvoteAction,
  getAllExplore,
  saveAction,
  unsaveAction,
} from "../store/actions/explore.action";
import Search from "../components/Common/Search";
import { FilterActions } from "../components/Common/ActiondropDown";
import Loader from "../components/Loader/Loader";
const Explore = ({ windowWidth }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const collection = useSelector((state) => state.explore);
  useEffect(() => {
    collection.collections.length == 0 && dispatch(getAllExplore());
  }, []);

  
  const observer = useRef()
  const lastCollectionElementRef = useCallback(node => {
    if (collection.isFetching) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(getAllExplore(collection.page+1));
      }
    })
    if (node) observer.current.observe(node)
  }, [collection.isFetching])
  const fetchMoreData = () =>{
    dispatch(getAllExplore(collection.page+1))
  }


  const getSearchResult = (e) =>{
    e.preventDefault();
    
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-start justify-center w-full gap-4 mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        <CollectionHeader
          windowWidth={windowWidth}
          name="Explore"
        />
        <div
          className={`w-full flex items-start justify-between gap-6 ${
            windowWidth < 700 ? "hidden" : ""
          }`}
        >
          <div className=" w-[calc(100%-212px)]">
            <form onSubmit={getSearchResult}>
            <Search query={query} setQuery={setQuery} />
            </form>
          </div>

          {/* Filter By*/}
          {/* <FilterActions menuItems={}/> */}

        </div>
      </div>

      {/* Collection Items */}
      <div className=" w-full h-[70%]">
        {/* At fisrt reandering when I am going to get first page loading */}
        {collection.collections.length == 0 && collection.isFetching ? (
          <div className="flex items-center justify-center w-full h-full">
            <PageLoader />
          </div>
        ) : collection.collections.length > 0 ? (
          <div
            id="scrollableDiv"
            className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center"
          >
            <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
              {collection.collections.map((collectionItem,index) => (
                <CollectionitemV2
                  key={collectionItem._id+"-"+index}
                  id={collectionItem._id}
                  image={collectionItem.image}
                  title={collectionItem.title}
                  links={collectionItem.timelines.length}
                  isPublic={collectionItem.isPublic}
                  isPinned={collectionItem.isPinned}
                  tags={collectionItem.tags}
                  username={collectionItem.username}
                  windowWidth={windowWidth}
                  isOwner={false}
                  upvotes={collectionItem.upvotes}
                  views={collectionItem.views}
                  isSavedOptionVisible={true}
                  onUpvote={upvoteAction}
                  onDownVote={downvoteAction}
                  onSave={saveAction}
                  onUnsave={unsaveAction}
                  ref={index!==collection.collections.length -1 ? lastCollectionElementRef : null}
                />
              ))}

              {collection.isFetching && collection.page>1 && 
              <div className="flex w-full justify-center items-center my-3">

              <Loader/>
              </div>}

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
    </BaseLayout>
  );
};

export default Explore;
