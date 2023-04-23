import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import BookmarkItems from '../components/BookmarkItem/BookmarkItems'
const NLCollectionView = () => {
  return (
    <div className='bg-bgSecondary min-h-screen w-full flex gap-12'>
<Sidebar />
<div className="w-2/3 ml-[20%] mx-auto">
<BookmarkItems />
</div>
    </div>
    )
}

export default NLCollectionView;