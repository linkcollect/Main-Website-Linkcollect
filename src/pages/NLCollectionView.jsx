import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import BookmarkItems from '../components/BookmarkItem/BookmarkItems'
import TopBar from '../components/Topbar/TopBar'
import { bookmarkItems } from '../dummyData'
const NLCollectionView = () => {
  let width
  if (typeof window !== "undefined") {
    width = window.innerWidth
  }
  const [windowWidth, setWindowWidth] = useState(width)
  useEffect(() => {

    function watchWidth() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", watchWidth)
  }, [windowWidth])
  return (
    <div className='bg-bgSecondary min-h-screen w-full flex'>
      {windowWidth>800&&
      <div className="flex-1">
        <Sidebar />
      </div>
      }
      <div className="h-screen flex flex-col overflow-y-hidden">
        <div className="bg-bgPrimary pt-2 flex justify-center items-center w-full mx-auto ">
          <TopBar windowWidth={windowWidth}/>
        </div>
        <div className="w-full h-[60%] mx-auto">
          <div className='w-full mx-auto h-full  overflow-y-scroll scrollbar-hide py-4'>
            <div className='w-[90%] mx-auto space-y-4'>
              {bookmarkItems.map(bookmarkItem => <BookmarkItems
                Thumbnail={bookmarkItem.Thumbnail}
                linkTitle={bookmarkItem.linkTitle}
                link={bookmarkItem.link}
                windowWidth={windowWidth}
              />)}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NLCollectionView;