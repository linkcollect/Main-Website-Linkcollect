import React from 'react'
import Collectionitem from '../components/Collectionitem/Collectionitem'
import Search from '../components/Searchcomponent/Search'
const collections = [
  {
    id: "1",
    image: "./collectionImage.png",
    title: "Fav Buildspace Ideas",
    links: "28 links",
    type: "Public",
  },
  {
    id: "2",
    image: "./collectionImage.png",
    title: "Fav Buildspace Ideas",
    links: "28 links",
    type: "Public",
  },
  {
    id: "3",
    image: "./collectionImage.png",
    title: "Fav Buildspace Ideas",
    links: "28 links",
    type: "Public",
  },
  {
    id: "4",
    image: "./collectionImage.png",
    title: "Fav Buildspace Ideas",
    links: "28 links",
    type: "Public",
  },
  {
    id: "5",
    image: "./collectionImage.png",
    title: "Fav Buildspace Ideas",
    links: "28 links",
    type: "Public",
  },
];
const Home = () => {
  return (
    <div className='flex'>  
    <div style={{width:'100%'}}>
      <Search/>
    <div className='flex gap-2'>
      {collections.map(collection=>(
        <Collectionitem title={collection.title} key={collection.id} id={collection.id} links={collection.links} type={collection.type}/>
      ))}
    </div>

    </div>    
</div>
  )
}

export default Home