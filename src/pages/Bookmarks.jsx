import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import BookmarkItems from '../components/BookmarkItem/BookmarkItems'
import TopBar from '../components/Topbar/TopBar'
import { bookmarkItems } from '../dummyData'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getCollection } from '../api-services/collectionService'
import PageLoader from '../components/Loader/PageLoader'

const Bookmarks = () => {
  const navigation = useNavigate();
  const { collectionId } = useParams();
  const location = useLocation();
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let width
  if (typeof window !== "undefined") {
    width = window.innerWidth
  }
  const [windowWidth, setWindowWidth] = useState(width)

  useEffect(()=>{
    setIsLoading(true);
    try {
      async function gettingCollection() {
        const { data } = await getCollection(collectionId)
        console.log(data.data)
        setCollection(data.data);
        setIsLoading(false);
      }
      gettingCollection();
    } catch (error) {
      setIsLoading(false);
    }
  },[])

  // For responsive
  useEffect(() => {

    function watchWidth() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", watchWidth)
  }, [windowWidth])

  const backHandler = (e) => {
    e.preventDefault();
    navigation(-1);
  };

  console.log(location)

  return (
    <div className='bg-bgSecondary min-h-screen w-full flex'>
      {windowWidth>800&&
      <div className="flex-1">
        <Sidebar />
      </div>
      }
      <div className="h-screen w-full flex flex-col overflow-y-hidden">
        <div className="bg-bgPrimary pt-2 flex justify-center items-center w-full mx-auto ">
          <TopBar windowWidth={windowWidth} onBack={backHandler} collectionName={location.state.title} collectionDesc={location.state.description} noOfLinks={location.state.links}/>
        </div>
        <div className="w-full h-[60%] mx-auto">
          { isLoading ? 
          <div className="flex h-full w-full justify-center items-center">
          <PageLoader />
        </div>
          : 
          collection.timelines && collection.timelines.length > 0 ?
            <div className='w-full mx-auto h-full  overflow-y-scroll scrollbar-hide py-4'>
            <div className='w-[90%] mx-auto space-y-4'>
              {collection.timelines.map(timeline => <BookmarkItems
                key={timeline._id}
                id={timeline._id}
                name={timeline.title}
                url={timeline.link}
                favicon={timeline.favicon}
                windowWidth={windowWidth}
                updatedAt={timeline.updatedAt}
                // onDelete={deleleteBookmark}
              />)}

            </div>
            </div>
          : 
          <div className="flex flex-col h-full w-full justify-center items-center">
              <p className="text-textPrimary text-5xl mb-5">
                No bookmarks Found
              </p>
              <p className="text-textPrimary">You can add it from extension</p>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Bookmarks;