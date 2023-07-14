import React from 'react'
import CollectionHeader from '../components/Header/CollectionHeader'
import Sidebar from '../components/Sidebar/Sidebar'
import NavbarV2 from '../components/NavbarV2/NavbarV2'

import PageLoader from '../components/Loader/PageLoader'
import CollectionitemV2 from '../components/Collectionitem/CollectionCardV2'

const Explore = () => {
  return (
    <div>
    <div className={`flex bg-neutral-50 }`}>
       <div className={`flex-1`}>
        <Sidebar/>
       </div>

        <div className='w-full gap-5 overflow-y-hidden flex-2 max-h-none sm:h-screen'>
        <NavbarV2/>
        <CollectionHeader name={'Explore'}  />
    
    {/* Collection Items */}
        {/* <div className=" w-full h-[70%]" >
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <PageLoader />
            </div>
          ) : filteredCollection.length > 0 ? (
            <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
              <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
                {filteredCollection.map((collections) => (
                  // <Collectionitem
                  //   id={collections._id}
                  //   image={collections.image}
                  //   title={collections.title}
                  //   links={collections.timelines.length}
                  //   type={collections.isPublic}
                  //   description={collections.description}
                  //   username={collections.username}
                  //   windowWidth={windowWidth}
                  //   onDelete={deleteHandler}
                  //   isOwner={vistiedUser.isOwner}
                  //   vistiedUser={vistiedUser}

                  // />
                  <CollectionitemV2
                    id={collections._id}
                    image={collections.image}
                    title={collections.title}
                    links={collections.timelines.length}
                    type={collections.isPublic}
                    description={collections.description}
                    username={collections.username}
                    windowWidth={windowWidth}
                    onDelete={deleteHandler}
                    isOwner={vistiedUser.isOwner}
                    vistiedUser={vistiedUser}
                    votes={collections.votes}
                    views={collections.views}
                    isSavedOptionVisible={true} //If this is true the saved will be visible and vice versa
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
        </div> */}
        </div>
    </div>
    </div>
  )
}

export default Explore