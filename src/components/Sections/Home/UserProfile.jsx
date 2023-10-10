import React, { useContext, useEffect, useState } from 'react';
import PageLoader from '../../UI/Loader/PageLoader';
import ProfileHeader from './ProfileHeader';
import CollectionitemV2 from '../../Common/CollectionCard';
import formatViews, { dataSortByType } from '../../../utils/utils';
import { getByUsername } from '../../../api-services/userService';
import BaseLayout from '../../Layout/BaseLayout/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  collectionFetchingFailed,
  collectionFetchingSuccess,
  collectionFething,
} from '../../../store/Slices/collection.slice';
import {
  downvoteAction,
  saveAction,
  unsaveAction,
  upvoteAction,
} from '../../../store/actions/collection.action';
import SEO from '../../SEO/SEO';
import { switchMode } from '../../../hooks/switchMode';
const UserProfile = ({ username, windowWidth }) => {
  const dispatch = useDispatch();
  const collection = useSelector(state => state.collection);
  const [user, setUser] = useState({});

  const countTotalProfileViews = collections => {
    // keeping the default views 0
    let totalProfileViews = 0;

    // looping through collections to sum up the views
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      totalProfileViews += collection.views ? collection.views : 0;
    }

    // returning views in proper format
    return formatViews(totalProfileViews);
  };

  useEffect(() => {
    // dispatch(getUserCollection({ username}));
    async function getCollectionOfTheUser() {
      dispatch(collectionFething());
      try {
        const res = await getByUsername(username);
        const data = res.data.data;
        console.log(res);
        const user = {
          name: data.name,
          username: data.username,
          profilePic: data.profilePic ? data.profilePic : '',
          socials: data.socials ? data.socials : [],
          totalViews: countTotalProfileViews(data.collections),
          totalCollections: data.collections.length,
          bio: data.bio && data.bio !== 'undefined' ? data.bio : '',
        };
        setUser(user);
        dispatch(collectionFetchingSuccess({ data: data }));
      } catch (e) {
        console.log(e);
        dispatch(collectionFetchingFailed());
      }
    }
    getCollectionOfTheUser();
  }, [dispatch, username]);

  // getting selected mode for theme change
  const { selectedMode } = useContext(switchMode);

  return (
    <BaseLayout>
      <SEO
        title={
          username
            ? `${user?.name} @(${username}) - User on linkcollect`
            : 'User Profile on linkcollect'
        }
        description={`Meet ${user?.name} (@${username}) on Linkcollect. ${
          user?.name
        } has ${
          user?.totalCollections ? user?.totalCollections : '0'
        } collections and ${
          user?.totalViews
        } views on linkcollect. Checkout his amazing collections`}
        image={user?.profilePic ? user?.profilePic : undefined}
      ></SEO>
      {collection.isFetching ? (
        <div className="flex items-center justify-center w-full h-full">
          <PageLoader />
        </div>
      ) : (
        <div className="w-full h-full px-8 pb-6 overflow-y-scroll 3xl:px-0">
          <ProfileHeader
            username={user.username}
            name={user.name}
            imageUrl={user.profilePic}
            socials={user.socials}
            totalViews={user.totalViews}
            totalCollections={user.totalCollections}
            bio={user.bio}
          />
          <div className="w-full ">
            {collection.collections.length > 0 ? (
              <div className="flex justify-center w-full mx-auto 3xl:pl-0 3xl:justify-center">
                <div className="w-full justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-6 max-w-[1500px]">
                  {collection.collections.map(collections => (
                    <CollectionitemV2
                      key={collection._id}
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
                      isOwner={false}
                      upvotes={collections.upvotes}
                      views={collections.views}
                      isSavedOptionVisible={true}
                      onUpvote={upvoteAction}
                      onDownVote={downvoteAction}
                      onSave={saveAction}
                      onUnsave={unsaveAction}
                      userId={collections.userId}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col self-center items-center justify-center w-full h-full ${
                  selectedMode === 'dark' ? 'text-neutral-50' : 'text-black'
                }`}
              >
                <p className="mb-5 text-5xl">No Collection Found</p>
                <p className="">You can add it from extension</p>
                <a
                  className="text-primary-400"
                  href="https://chrome.google.com/webstore/detail/linkcollect-save-share-bo/knekpacpcgkieomkhhngenjeeokddkif"
                >
                  {' '}
                  Click To Install{' '}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default UserProfile;
