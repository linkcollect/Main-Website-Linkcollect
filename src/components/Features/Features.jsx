import React from 'react'
import Card from './Card'
import BookmarkIcon from '../../assets/Frame 40250.svg'
import ShareIcon from '../../assets/Frame 40250share.svg'
import SearchIcon from '../../assets/Frame 40250search.svg'
import CommandIcon from '../../assets/Frame 40250command.svg'

const Features = () => {
    return (
        <>
            <div className="flex flex-wrap  w-[780px] gap-[26px] items-center justify-center mx-auto my-[400px]">
                <Card
                    img={BookmarkIcon}
                    title={'Save from anywhere'}
                    details={'Use our chrome extension on any browser to save any link to your collection with just a right click'}
                />
                <Card
                    img={ShareIcon}
                    title={'Share to anyone'}
                    details={'we create a shareable link instantly so you can share your bookmarks with your friends super fast'}
                />
                <Card
                    img={SearchIcon}
                    title={'Discover the best'}
                    details={'Explore what people are liking the most, upvote collections you like '}
                />
                <Card
                    img={CommandIcon}
                    title={'Access bookmarks using commands'}
                    details={'Share collectionName & instantly replace the text with a shareable link of the collection, to share it even faster'}
                />

            </div>
        </>
    )
}

export default Features