import React, { useEffect, useMemo, useState } from "react";
import { dataSortByType } from "../../../utils/utils";
import CollectionitemV2 from "../../Common/CollectionCard";
import BaseLayout from "../../Layout/BaseLayout/BaseLayout";
import CollectionHeader from "../../Common/CollectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { getByUsername } from "../../../api-services/userService";
import Search from "../../Common/Search";
import {
  collectionFetchingFailed,
  collectionFetchingSuccess,
  collectionFething,
  sortCollectionByType,
  pinCollectionToggle
} from "../../../store/Slices/collection.slice";
import PageLoader from "../../UI/Loader/PageLoader";
import {
  downvoteAction,
  upvoteAction,
} from "../../../store/actions/collection.action";
import { SortActions } from "../../Common/ActiondropDown";
import { togglePin } from "../../../api-services/collectionService";
const OwnerProfile = ({ username, windowWidth }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const collection = useSelector((state) => state.collection);
  const [sortingType,setSortingType] = useState("RECENETLY_UPDATED")

  useEffect(() => {
    // dispatch(getUserCollection({username}));
    async function getCollectionOfTheUser() {
      dispatch(collectionFething());
      try {
        const res = await getByUsername(username);
        const sortedData = dataSortByType(res.data.data.collections,sortingType)
        dispatch(collectionFetchingSuccess({ data: {collections:sortedData} }));
      } catch(e) {
        console.log(e)
        dispatch(collectionFetchingFailed());
      }
    }
    getCollectionOfTheUser();
  }, []);

  const filteredCollection = useMemo(() => {
    return (
      !collection.isFetching &&
      collection.collections.filter((cItem) =>
        cItem.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, collection.collections,collection.isFetching]);

  // Sort actions
  const sortdata = (sortType)=>{
    setSortingType(sortType);
    dispatch(sortCollectionByType({sortType}));
  }
  const menuItem = [
    {
      name: "Recently Updated",
      onClick: sortdata,
      type: "RECENETLY_UPDATED",
    },
    {
      name: "Most Upvotes",
      onClick: sortdata,
      type: "MOST_UPVOTES",
    },
    {
      name: "Most Links",
      onClick: sortdata,
      type: "MOST_BOOKMARKED",
    },
  ];

  const onPin = async (e, collectionId) =>{
    e.stopPropagation()
    dispatch(pinCollectionToggle({ collectionId }))
    dispatch(sortCollectionByType({sortType:sortingType}))
    try {
      const res = await togglePin(collectionId);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <BaseLayout>
      {/* Top bar */}
      <div className="flex flex-col items-start justify-center w-full gap-4 mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        <CollectionHeader
          windowWidth={windowWidth}
          isOwner={true}
          name="My Collection"
        />
        <div
          className={`w-full flex items-start justify-between gap-6 ${
            windowWidth < 700 ? "hidden" : ""
          }`}
        >
          <div className=" w-[calc(100%-212px)]">
            <Search query={query} setQuery={setQuery} />
          </div>

          {/* sort by */}
          <SortActions name="Sort By" menuItems={menuItem} />
        </div>
      </div>
      {/* Collections */}
      <div className="w-full pb-6 h-full overflow-y-scroll 3xl:px-0 px-8">
        {collection.isFetching ? (
          <div className="flex items-center justify-center w-full">
            <PageLoader />
          </div>
        ) : filteredCollection.length > 0 ? (
          <div className="flex items-start justify-start w-full mx-auto 3xl:pl-0 3xl:justify-center pb-5">
            <div className="w-full justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-6 max-w-[1500px]">
              {filteredCollection.map((collections) => (
                <CollectionitemV2
                  key={collections._id}
                  id={collections._id}
                  image={collections.image}
                  title={collections.title}
                  links={collections.timelines.length}
                  isPublic={collections.isPublic}
                  isPinned={collections.isPinned}
                  description={collections.description}
                  tags={collections.tags}
                  username={username}
                  windowWidth={windowWidth}
                  isOwner={true}
                  upvotes={collections.upvotes}
                  views={collections.views}
                  onUpvote={upvoteAction}
                  onDownVote={downvoteAction}
                  onPin={onPin}
                />
              ))}
            </div>
          </div>
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

export default OwnerProfile;
