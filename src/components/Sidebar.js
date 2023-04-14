import React, { useState } from 'react'
import mainlogo from '../assets/mainLogo.svg'
import ProfileImage from '../assets/profileImage.svg'
import StackIcon from '../assets/stack-simple.svg'
import ArrowIcon from '../assets/back-arrow.svg'
import AddIcon from '../assets/add-tab.svg'
import Link from '../assets/link.svg'
import Logout from '../assets/logout.svg'
const Sidebar = () => {
    const [showCollections, setShowCollections] = useState(false)
    const handleShowCollection = () => {
        setShowCollections(!showCollections)
    }
    return (
        <div class='h-screen fixed left-0 top-0 w-80  bg-white'>
            <div className="flex flex-col items-center justify-between h-screen">
                <div>
                    <img src={mainlogo} alt="" className='w-48 block mx-auto mt-0 h-[78px]'/>
                    <div className="mt-2">
                        <img src={ProfileImage} alt="" className='w-20 h-20 rounded-2xl mt-12 mx-auto' />
                        <h1 className="text-black mx-auto text-center font-semibold mt-4 w-44 h-9 text-3xl para">Harsh Singh</h1>
                            <p className="text-center h-5 para text-sm mx-auto w-[247px]">ohiostudent@gmail.com</p>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center justify-between mt-10 mx-auto w-[301px] h-[51px]" style={{borderRadius: '8px', border: `1px solid rgba(206, 208, 251, 0.41)` }}>
                        <div className="flex items-center justify-center gap-2 px-2">
                            <img src={StackIcon} alt="" className='w-8 h-8' />
                            <span className="text-black para text-lg font-normal">Collections</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className='font-normal w-5 h-5' style={{ color: '#6166F1', fontSize: '16px', lineHeight: '20px' }}>48</span>
                            <img src={ArrowIcon} alt="" className={showCollections ? 'w-6 h-6 rotate-0 cursor-pointer' : 'w-6 h-6 rotate-180 cursor-pointer'} onClick={handleShowCollection} />
                        </div>
                    </div>
                    <div style={{ height: '65px' }}>
                        {showCollections && <div className="flex flex-col mx-auto" style={{ width: '301px', height: '85px', background: '#F9F9F9' }}>
                            <div className="flex items-center justify-between px-2 h-1/2">
                                <span className="text-black para font-normal">Private</span>
                                <span className='font-normal w-5 h-5' style={{ color: '#6166F1', fontSize: '16px', lineHeight: '20px' }}>36</span>
                            </div>
                            <div className="flex items-center justify-between px-2 h-1/2">
                                <span className="text-black para font-normal">Public</span>
                                <span className='font-normal w-5 h-5' style={{ color: '#6166F1', fontSize: '16px', lineHeight: '20px' }}>12</span>
                            </div>

                        </div>
                        }
                    </div>
                </div>

                <div>

                    <div className="flex items-center justify-center gap-2 mx-auto mt-14 cursor-pointer" style={{ width: '301px', height: '47px', background: '#6166F1', borderRadius: '8px' }}>
                        <img src={AddIcon} alt="" className='w-4' />
                        <span className="text-white font-medium para" style={{ fontSize: '16px', lineHeight: '16px' }}>Create Collection</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mx-auto mt-1 cursor-pointer bg-white" style={{ width: '301px', height: '47px', borderRadius: '8px', border: `1px solid #EBECFD` }}>
                        <span className="text-black para font-medium" style={{ fontSize: '16px', lineHeight: '16px' }}>Share Profile</span>
                        <img src={Link} alt="" className='w-4' />
                    </div>

                    <div className="flex items-center justify-center gap-2 mx-auto mt-1 cursor-pointer bg-white" style={{ width: '301px', height: '47px', borderRadius: '8px', border: `1px solid #EBECFD` }}>
                        <span className="text-black para font-medium" style={{ fontSize: '16px', lineHeight: '16px' }}>Public</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mx-auto mt-4 cursor-pointer bg-white" style={{ width: '301px', height: '47px' }}>
                        <img src={Logout} alt="" className='w-5 h-5' />
                        <span className="text-red-600 para text-xl" style={{ fontSize: '16px', lineHeight: '16px' }}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar