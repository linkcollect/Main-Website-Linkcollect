import React, { useState, useEffect, useContext } from 'react';
import { getByUsername } from '../../../api-services/userService';
import CollectionitemV2 from '../../Common/CollectionCard';
import Carousel from '../LandingPageV2/components/Carousel';
import { useSelector } from 'react-redux';
import { switchMode } from '../../../hooks/switchMode';
import { useNavigate } from 'react-router-dom';

const MoreFromUser = ({ collectionData, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    async function fetchUserCollections() {
      try {
        // console.log("username", user)
        if (user && user !== 'undefined') {
          const getUserCollections = await getByUsername(user);
          setUserCollections(getUserCollections.data.data.collections);
        }
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }

    setIsLoading(true);
    fetchUserCollections();
    setIsLoading(false);

    return () => {};
  }, []);

  const { selectedMode } = useContext(switchMode);

  return (
    auth.username !== user &&
    userCollections?.length > 1 && (
      <div
        className={`w-full min-h-[200px] border-t-2 mt-10 ${
          selectedMode === 'dark'
            ? 'border-dark-secondary'
            : 'border-neutral-300'
        }`}
      >
        <div
          className={`${
            selectedMode === 'dark' ? 'text-white' : ''
          } flex flex-col w-full justify-items-center items-start pt-[5rem]`}
        >
          <h2 className="text-[1.75rem] px-[clamp(1rem,5vw,5rem)]">
            More from{' '}
            <a
              className="text-[1.75rem] text-primary-500"
              href={`https://linkcollect.io/${user}`}
            >
              {user}
            </a>
          </h2>
          <Carousel
            className={'px-[clamp(1rem,5vw,5rem)] pt-[2rem] pb-[5rem]'}
            fullWidth={false}
            isAutoScroll={false}
          >
            {userCollections
              ?.filter(collection => {
                return collection._id !== collectionData._id;
              })
              .map(collection => {
                return (
                  <div
                    key={collection._id}
                    className="min-w-[300px] max-w-[300px] rounded-md hover:scale-[103%] hover:shadow-xl transition"
                  >
                    <CollectionitemV2
                      id={collection._id}
                      image={collection.image}
                      title={collection.title}
                      links={collection.timelines.length}
                      username={collection.username}
                      isPublic={collection.isPublic}
                      isPinned={collection.isPinned}
                      description={collection.description}
                      tags={collection.tags}
                      isOwner={false}
                      upvotes={collection.upvotes}
                      views={collection.views}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </div>
    )
  );
};

export default MoreFromUser;
