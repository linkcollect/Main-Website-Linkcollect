import React, { useContext, useEffect, useMemo, useState } from 'react';
import { dataSortByType } from '../../../utils/utils';
import CollectionitemV2 from '../../Common/CollectionCard';
import BaseLayout from '../../Layout/BaseLayout/BaseLayout';
import CollectionHeader from '../../Common/CollectionHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getByUsername } from '../../../api-services/userService';
import Search from '../../Common/Search';

import {
  collectionFetchingFailed,
  collectionFetchingSuccess,
  collectionFething,
  sortCollectionByType,
  pinCollectionToggle,
} from '../../../store/Slices/collection.slice';
import PageLoader from '../../UI/Loader/PageLoader';
import {
  downvoteAction,
  upvoteAction,
} from '../../../store/actions/collection.action';
import { SortActions } from '../../Common/ActiondropDown';
import { togglePin } from '../../../api-services/collectionService';
import SEO from '../../SEO/SEO';
import useDropdown from '../../../hooks/useDropdown';

import { switchMode } from '../../../hooks/switchMode';

const OwnerProfile = ({ username, windowWidth }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const collection = useSelector(state => state.collection);
  const user = useSelector(state => state.auth);
  const [sortingType, setSortingType] = useState('RECENETLY_UPDATED');
  const { toggleSortByDropdown, isSortByDropdownOpen } = useDropdown();

  useEffect(() => {
    // dispatch(getUserCollection({username}));
    async function getCollectionOfTheUser() {
      dispatch(collectionFething());
      try {
        const res = await getByUsername(username);
        const sortedData = dataSortByType(
          res.data.data.collections,
          sortingType
        );
        dispatch(
          collectionFetchingSuccess({ data: { collections: sortedData } })
        );
      } catch (e) {
        console.log(e);
        dispatch(collectionFetchingFailed());
      }
    }
    getCollectionOfTheUser();
  }, []);

  const filteredCollection = useMemo(() => {
    return (
      !collection.isFetching &&
      collection.collections.filter(cItem =>
        cItem.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, collection.collections, collection.isFetching]);

  // Sort actions
  const sortdata = sortType => {
    setSortingType(sortType);
    dispatch(sortCollectionByType({ sortType }));
  };
  const menuItem = [
    {
      name: 'Recently Updated',
      onClick: sortdata,
      type: 'RECENETLY_UPDATED',
    },
    {
      name: 'Most Upvotes',
      onClick: sortdata,
      type: 'MOST_UPVOTES',
    },
    {
      name: 'Most Links',
      onClick: sortdata,
      type: 'MOST_BOOKMARKED',
    },
  ];
  const navabrItem = [
    {
      name: 'Contact us',
      link: 'http://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
    },
    {
      name: 'FAQs',
      link: 'https://linkcollect.super.site/help',
    },
    {
      name: 'Feedback',
      link: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
    },
  ];

  const onPin = async (e, collectionId) => {
    e.stopPropagation();
    dispatch(pinCollectionToggle({ collectionId }));
    dispatch(sortCollectionByType({ sortType: sortingType }));
    try {
      const res = await togglePin(collectionId);
    } catch (error) {
      console.error(error);
    }
  };

  // getting current selected mode
  const { selectedMode } = useContext(switchMode);

  return (
    <BaseLayout>
      <SEO
        title={
          username
            ? `${user?.userData?.name} @(${username}) - User on linkcollect`
            : 'User Profile on linkcollect'
        }
        description={`@${username} on Linkcollect. ${
          user?.userData?.name
        } has ${
          collection.collections.length ? collection.collections.length : '0'
        } collections. Checkout his amazing collections`}
        image={
          user?.userData?.profilePic ? user?.userData?.profilePic : undefined
        }
      ></SEO>
      {/* Top bar */}
      <div className="flex flex-col items-start justify-center w-full gap-4 mb-[1rem] mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        <CollectionHeader
          windowWidth={windowWidth}
          isOwner={true}
          name="My Collection"
        />
        <div className="w-full flex items-start justify-between gap-6">
          <div
            className={`${
              windowWidth < 700 ? 'w-full' : 'w-[calc(100%-212px)]'
            }`}
          >
            <Search query={query} setQuery={setQuery} />
          </div>

          {/* sort by */}
          <SortActions
            name="Sort By"
            menuItems={menuItem}
            isOpen={isSortByDropdownOpen}
            toggleDropDown={toggleSortByDropdown}
          />
        </div>
      </div>
      {/* Collections */}
      <div className="w-full h-full px-8 pb-6 overflow-y-scroll 3xl:px-0">
        {collection.isFetching ? (
          <div className="flex items-center justify-center w-full">
            <PageLoader />
          </div>
        ) : filteredCollection.length > 0 ? (
          <div className="flex items-start justify-start w-full pb-5 mx-auto 3xl:pl-0 3xl:justify-center">
            <div className="w-full justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-6 max-w-[1500px]">
              {filteredCollection.map(collections => (
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
                  selectedMode={selectedMode}
                  userId={collection.userId}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center self-center justify-center w-full h-full ${
              selectedMode === 'dark' ? 'text-neutral-50' : 'text-black'
            } `}
          >
            <p className="mb-5 text-5xl text-textPrimary">
              No Collection Found
            </p>
            <p className="text-textPrimary">You can add it from extension</p>
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
    </BaseLayout>
  );
};

export default OwnerProfile;
