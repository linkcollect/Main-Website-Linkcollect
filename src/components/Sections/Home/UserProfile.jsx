import React, { useEffect, useState } from "react";
import PageLoader from "../../UI/Loader/PageLoader";
import ProfileHeader from "./ProfileHeader";
import CollectionitemV2 from "../../Common/CollectionCard";
import { dataSortByType } from "../../../utils/utils";
import { getByUsername } from "../../../api-services/userService";
import BaseLayout from "../../Layout/BaseLayout/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserCollection } from "../../../store/actions/collection.action";

const UserProfile = ({ username,windowWidth }) => {
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collection);
  useEffect(() => {
    dispatch(getUserCollection({ username}));
  },[]);


  return (
    <BaseLayout>
      {collection.isFetching ? (
        <div className="flex items-center justify-center w-full h-full">
          <PageLoader />
        </div>
      ) : (
        <div className="w-full">
          <ProfileHeader
            username={username}
            name={collection.user.name}
            totalViews={collection.user.totalViews}
            totalCollections={collection.user.totalCollections}
          />
           <div className=" w-full h-[70%]">
          {collection.collections.length > 0 ? (
            <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
              <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
                {collection.collections.map((collections) => (
                  <CollectionitemV2
                    id={collections._id}
                    image={collections.image}
                    title={collections.title}
                    links={collections.timelines.length}
                    isPublic={collections.isPublic}
                    isPinned={collections.isPinned}
                    tags={collections.tags}
                    username={username}
                    windowWidth={windowWidth}
                    isOwner={false}
                    upvotes={collections.upvotes}
                    views={collections.views}
                    isSavedOptionVisible={true}
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
      )}
    </BaseLayout>
  );
};

export default UserProfile;
