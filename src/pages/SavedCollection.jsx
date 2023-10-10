import React, { useEffect, useState } from 'react';
import CollectionHeader from '../components/Common/CollectionHeader';
import BaseLayout from '../components/Layout/BaseLayout/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';
import CollectionitemV2 from '../components/Common/CollectionCard';
import PageLoader from '../components/UI/Loader/PageLoader';
import {
  downvoteAction,
  getSaveCollectionOfUser,
  unsaveAction,
  upvoteAction,
} from '../store/actions/save.actions';
import { SortActions } from '../components/Common/ActiondropDown';
import Search from '../components/Common/Search';
import { useContext } from 'react';
import { switchMode } from '../hooks/switchMode';
import useDropdown from '../hooks/useDropdown';

const SavedCollection = ({ windowWidth }) => {
  const dispatch = useDispatch();
  const collection = useSelector(state => state.save);
  const [query, setQuery] = useState('');
  const auth = useSelector(state => state.auth);
  const { selectedMode } = useContext(switchMode);
  const { isSortByDropdownOpen, toggleSortByDropdown } = useDropdown();

  useEffect(() => {
    dispatch(getSaveCollectionOfUser(auth.userId));
  }, [dispatch]);
  const menuItem = [
    {
      name: 'Recently Updated',
      onClick: '',
      tag: 'RECENETLY_UPDATED',
    },
    {
      name: 'Most Upvotes',
      onClick: '',
      tag: 'RECENETLY_UPDATED',
    },
    {
      name: 'Most Links',
      onClick: '',
      tag: 'RECENETLY_UPDATED',
    },
  ];
  return (
    <BaseLayout>
      <div className="flex flex-col items-start justify-center w-full gap-4 mx-auto 3xl:px-0 px-8 max-w-[1500px]">
        <CollectionHeader
          windowWidth={windowWidth}
          isOwner={true}
          name="Saved Collections"
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
          />{' '}
        </div>
      </div>

      {/* Collection Items */}
      <div className=" w-full pb-6 mt-[1rem] h-full overflow-y-scroll 3xl:px-0 px-8">
        {collection.isFetching ? (
          <div className="flex items-center justify-center w-full h-full">
            <PageLoader />
          </div>
        ) : collection.collections.length > 0 ? (
          <div className="flex items-start justify-start w-full h-full mx-auto 3xl:pl-0 3xl:justify-center">
            <div className="w-full justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 2xl:gap-6 max-w-[1500px]">
              {collection.collections.map((collectionItem, index) => (
                <CollectionitemV2
                  key={collectionItem._id}
                  id={collectionItem._id}
                  image={collectionItem.image}
                  title={collectionItem.title}
                  links={collectionItem.timelines.length}
                  isPublic={collectionItem.isPublic}
                  isPinned={collectionItem.isPinned}
                  description={collectionItem.description}
                  tags={collectionItem.tags}
                  username={collectionItem.username}
                  windowWidth={windowWidth}
                  isOwner={false}
                  upvotes={collectionItem.upvotes}
                  views={collectionItem.views}
                  isSavedOptionVisible={true}
                  removeCollectionItemOnUnsave={true}
                  onUnsave={unsaveAction}
                  onUpvote={upvoteAction}
                  onDownVote={downvoteAction}
                  userId={collectionItem.userId}
                  isDuplicate={true}
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
            <p>You can save from explore page</p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default SavedCollection;
