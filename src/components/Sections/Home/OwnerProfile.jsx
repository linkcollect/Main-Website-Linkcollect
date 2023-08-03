import React, { useEffect,useMemo,useState } from 'react'
import { dataSortByType } from "../../../utils/utils";
import CollectionitemV2 from "../../Common/CollectionCard";
import BaseLayout from "../../Layout/BaseLayout/BaseLayout";
import CollectionHeader from "../../Common/CollectionHeader";
import { useDispatch, useSelector } from 'react-redux';
import { getUserCollection } from '../../../store/actions/collection.action';
import PageLoader from "../../UI/Loader/PageLoader"
const OwnerProfile = ({username,windowWidth}) => {
    const dispatch  = useDispatch();
    const [query,setQuery] = useState("");
    const collection  = useSelector(state=>state.collection);
    useEffect(()=>{
      dispatch(getUserCollection({username}));
    },[])
  const filteredCollection = useMemo(()=>{
    return !collection.isFetching && collection.collections.filter(cItem=>cItem.title.toLowerCase().includes(query.toLowerCase()));
  },[query,collection.collections])

  return (
    <BaseLayout>
      {/* Top bar */}
      <CollectionHeader windowWidth={windowWidth} isOwner={true} name={`Oyo ${username}`} setQuery={setQuery}/>
      {/* Collections */}
      <div className=" w-full h-[70%]">
        {collection.isFetching ? (
          <div className="flex items-center justify-center w-full h-full">
            <PageLoader />
          </div>
        ) : filteredCollection.length > 0 ? (
          <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
            <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
              {filteredCollection.map((collections) => (
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
                  isOwner={true}
                  upvotes={collections.upvotes}
                  views={collections.views}
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

export default OwnerProfile