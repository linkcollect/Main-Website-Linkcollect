import React from 'react'
import Twitter from '../assets/twitterBlue.svg'
import Website from '../assets/websiteIcon.svg'
import Copy from '../assets/copyIcon(Blue).svg'
import profile from '../assets/defaultProfile.svg'
import Back from '../assets/back-arrow.svg'
const ProfileHeader = () => {
    return (
        <div className='flex flex-col items-start justify-center w-full gap-6'>

            {/* back button */}
            <div className="cursor-pointer p-2.5 flex items-center justify-center rounded border-neutral-300 bg-neutral-200 gap-1  border">
                <img src={Back} alt="" className='-rotate-90'/>
                <span className="text-base font-normal text-neutral-800">Back</span>
            </div>

            <div className='flex items-start justify-between w-full'>
                {/*visited user's details*/}
                <div className="flex items-center justify-start w-full gap-5">
                    {/* Profile photo */}
                    <img src={profile} alt="" className='w-20 h-20 rounded-full' />

                    <div className="flex flex-col items-start justify-start gap-3">
                        {/* Name */}
                        <p className="text-sm font-medium text-neutral-900">Vicky Don</p>

                        {/* Social Links */}
                        <div className="flex items-center justify-start w-full gap-3">
                            <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Twitter} alt="" />
                                <span className="text-xs font-normal text-neutral-900">twitter</span>
                            </div>
                            <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Website} alt="" />
                                <span className="text-xs font-normal text-neutral-900">Website</span>
                            </div>
                        </div>

                        {/*No. of Views and collections */}
                        <div className="flex items-center justify-start w-full gap-3">
                            <span className="text-xs font-normal text-neutral-600">Total views {200}</span>
                            <span className="text-xs font-normal text-neutral-600">Total Collections {10}</span>
                        </div>
                    </div>
                </div>

                {/* Profile link copy */}
                <div className="cursor-pointer h-9 w-28 p-2.5 flex items-center justify-center rounded border-neutral-300 bg-neutral-200 gap-1.5  border">
                    <img src={Copy} alt="" />
                    <span className="text-base font-normal text-neutral-800">Profile</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader