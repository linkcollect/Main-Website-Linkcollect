import React, { useEffect } from 'react'
import CollectionHeader from '../components/Common/CollectionHeader'
import BaseLayout from '../components/Layout/BaseLayout/BaseLayout'
import { useDispatch, useSelector } from 'react-redux'
import CollectionitemV2 from '../components/Common/CollectionCard'
import PageLoader from '../components/UI/Loader/PageLoader'
import { downvoteAction, getSaveCollectionOfUser, unsaveAction, upvoteAction } from '../store/actions/save.actions'
const SavedCollection = ({windowWidth}) => {
    const dispatch = useDispatch();
    const collection = useSelector(state=>state.save);
    console.log(collection)
    const auth = useSelector(state=>state.auth);
    useEffect(()=>{
       dispatch(getSaveCollectionOfUser(auth.userId))
    },[dispatch])
    return (
       <BaseLayout>
          <CollectionHeader name={'Explore'}  />
      
          {/* Collection Items */}
          <div className=" w-full h-[70%]" >
            {collection.isFetching ? (
              <div className="flex items-center justify-center w-full h-full">
                <PageLoader />
              </div>
            ) : collection.collections.length > 0 ? (
              <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
                <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
                  {collection.collections.map((collectionItem) => (
                    <CollectionitemV2
                    key={collectionItem._id}
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
                    removeCollectionItemOnUnsave={true}
                    onUnsave={unsaveAction}
                    onUpvote={upvoteAction}
                    onDownVote={downvoteAction}
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
        </BaseLayout>  
  )
}

export default SavedCollection