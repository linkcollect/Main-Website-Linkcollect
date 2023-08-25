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
import Loader from "../components/UI/Loader/Loader";
import { getSearch } from "../api-services/collectionService";
import { useSearchParams } from "react-router-dom";
import { searchedCollection } from "../store/Slices/explore.slice";

const Explore = ({ windowWidth }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [searchParams, setSearcParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingMore, setIsSearchingMore] = useState(false);
  const collection = useSelector((state) => state.explore);
  useEffect(() => {
    // collection.isSearched && !searchParams.get("queryFor") may user has navigate away after searhing something in this case we should do reload the original data
    if ((collection.isSearched && !searchParams.get("queryFor")) || collection.collections.length == 0) {
      dispatch(getAllExplore());
    }
  }, []);


  const observer = useRef()
  const lastCollectionElementRef = useCallback(node => {
    if (collection.isFetching) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && collection.hasMore) {
        searchParams.get("queryFor") ? fethingMoreSearchResult() : fetchMoreExploreDataData();
      }
    })
    if (node) observer.current.observe(node)
  }, [collection.isFetching, collection.hasMore])

  const fetchMoreExploreDataData = () => {
    dispatch(getAllExplore(collection.page + 1));
  }



  // Logic for searching like useGlobalSearch() ==> may be later on we can implememt hook for this while optimazation (if it is really necessary)

  const getSearchResult = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearcParams({ queryFor: query })
    try {
      const res = await getSearch(query);
      dispatch(searchedCollection({ data: { collections: res.data.data }, page: 1 }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsSearching(false);
    }
  }

  const fethingMoreSearchResult = async () => {
    setIsSearchingMore(true);
    try {
      const res = await getSearch(query, collection.page + 1);
      dispatch(searchedCollection({ data: { collections: res.data.data }, page: collection.page + 1 }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsSearchingMore(false);
    }
  }

  const onCancelSerchedHandler = (e) => {
    e.preventDefault();
    setQuery("")
    // If the user searched anything then we will reset the set otherwise no need to reset it
    if (!searchParams.get("queryFor")) {
      return
    }
    searchParams.delete("queryFor");
    setSearcParams(searchParams);
    dispatch(getAllExplore());
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-start justify-center w-full gap-4 mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        <CollectionHeader
          windowWidth={windowWidth}
          name={searchParams.get("queryFor") ? `Searched ${searchParams.get("queryFor")}` : "Explore"}
        />
        <div
          className={`w-full flex items-start justify-between gap-6 ${windowWidth < 700 ? "hidden" : ""
            }`}
        >
          <div className=" w-[100%]">
            <Search query={query} setQuery={setQuery} onCancel={onCancelSerchedHandler} onSubmit={getSearchResult} />
          </div>

          {/* Filter By*/}
          {/* <FilterActions menuItems={}/> */}

        </div>
      </div>

      {/* Collection Items */}
      <div className=" w-full h-full pb-6 overflow-y-scroll 3xl:px-0 px-8">
        {/* At fisrt reandering when I am going to get first page loading or if we will get search result for the first time*/}
        {(collection.collections.length === 0 && collection.isFetching) || isSearching ? (
          <div className="flex items-center justify-center w-full">
            <PageLoader />
          </div>
        ) : collection.collections.length > 0 ? (
          <>
            <div
              id="scrollableDiv"
              className="flex justify-center w-full"
            >
              <div className="w-full h-max justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-6 max-w-[1500px]">
                {collection.collections.map((collectionItem, index) => (
                  <CollectionitemV2
                    key={collectionItem._id + "-" + index}
                    id={collectionItem._id}
                    image={collectionItem.image}
                    title={collectionItem.title}
                    links={collectionItem.countOfLinks}
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
                    ref={index !== collection.collections.length - 1 ? lastCollectionElementRef : null}
                  />
                ))}



              </div>

            </div>
            {((collection.isFetching && collection.page > 1) || isSearchingMore) &&

              <div className="flex w-full justify-center items-center my-3">

                <Loader />

              </div>
            }
          </>
        ) : (
          <div className="flex flex-col self-center items-center justify-center w-full h-full">
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
