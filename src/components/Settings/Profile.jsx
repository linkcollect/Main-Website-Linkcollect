import React, { useRef, useState } from 'react'
import Upload from '../../assets/upload.svg'
import profile from '../../assets/defaultProfile.svg'
import twitter from '../../assets/twitterBlue.svg'
import websiteIcon from '../../assets/websiteIcon.svg'
const Profile = () => {
    const fileInputRef = useRef(null);
    // profile privacy
    const [selectedPrivacy, setSelectedPrivacy] = useState('private')
    const [selectedTheme, setSelectedTheme] = useState('light')

    // handling public private switch
    const handleSwitchPrivacy = (value) => {
        setSelectedPrivacy(value)
    }
    // handling theme switch
    const handleSwitchTheme = (value) => {
        setSelectedTheme(value)
    }

    // changed uploaded file
    const [uploadedFile, setUploadedFile] = useState()

    // handling profile pic input change
    function handleFileChange() {
        const fileInput = fileInputRef.current;
        const fileLabel = fileInput.nextElementSibling;
        if (fileInput?.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileLabel.innerText = "";
            setUploadedFile(URL.createObjectURL(file));
        } else {
        }
    }


    return (
        <div className='w-11/12 mx-auto sm:w-full flex flex-col items-center sm:items-start justify-center gap-3 max-w-[824px]'>

            {/* First section of profile settings (name, email, username etc) */}
            <div className="flex flex-col items-center justify-center w-full gap-6 pt-5 pb-6 sm:items-start sm:pb-14">
                {/* Profile Image */}
                <div className="flex items-center justify-start w-full gap-6">
                    <img src={uploadedFile ? uploadedFile : profile} alt="" className='rounded-full w-20 sm:w-[100px] h-20 sm:h-[100px]' />
                    <div className="flex flex-col gap-1">
                        <div className="w-[197px] relative border border-neutral-300 bg-neutral-200 rounded-md">
                            <input
                                type="file"
                                ref={fileInputRef}
                                id='myFileInput'
                                className="w-full h-10 px-1 py-2 text-lg font-normal leading-6 rounded-md cursor-pointer sm:px-4 file:bg-neutral-200 bg-neutral-200 file:border-0 file:h-full file:cursor-pointer file:text-black font-inter focus:outline-none text-neutral-200 "
                                style={{ boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.04)` }}
                                onChange={handleFileChange}
                                accept='.png, .jpg'
                            />
                            <img src={Upload} alt="upload" className="absolute -translate-y-1/2 top-1/2 right-4" />
                            <label htmlFor="myFileInput"></label>
                        </div>
                        <span className='text-sm font-normal text-neutral-400'>
                            400 X 400 px jpg or png format
                        </span>
                    </div>
                </div>
                {/* name, username */}
                <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto sm:items-start">
                    <div className="flex flex-col items-start justify-center w-full gap-4 md:flex-row">
                        <div className="flex flex-col items-start justify-center w-full">
                            <label htmlFor="Full_Name" className='flex items-start justify-start text-lg font-normal text-neutral-700' >Full Name</label>
                            <input type="text" id='Full_Name' className='py-4 px-3 w-full sm:w-[395px]  bg-neutral-50 border-2 border-primary-300 rounded-lg text-neutral-900 text-lg font-normal' value={'Harsh Singh'} />
                        </div>
                        <div className="flex flex-col items-start justify-center w-full">
                            <label htmlFor="Full_Name" className='flex items-start justify-start text-lg font-normal text-neutral-700' >Username</label>
                            <input type="text" id='Full_Name' className='py-4 px-3 w-full sm:w-[395px] bg-neutral-50 border-2 border-primary-300 rounded-lg text-neutral-900 text-lg font-normal' value={'harsh006'} />
                            <span className='w-full text-xs font-normal text-left whitespace-nowrap sm:text-sm text-neutral-400'>Your linkcollect profile URL: https://linkcollect.io/harsh007</span>
                        </div>
                    </div>

                    {/* Email  */}
                    <div className="flex flex-col items-start justify-center w-full">
                        <label htmlFor="Full_Name" className='flex items-start justify-start text-lg font-normal text-neutral-700' >Account Email</label>
                        <input readOnly type="email" id='Full_Name' className='py-4 px-3 w-full sm:w-[395px] bg-neutral-200  border-2 border-neutral-400 rounded-lg text-neutral-500 text-lg font-normal' value={'Harsh Singh'} />
                    </div>

                    {/* Privacy switch */}
                    <div className="flex flex-row items-start justify-between w-full gap-3 md:gap-0 sm:pr-6 lg:px-0">
                        <div className="flex flex-col items-start justify-between gap-1">
                            <span className='text-sm font-normal text-neutral-700 sm:text-base '>Select profile type</span>
                            <span className='text-xs font-normal capitalize text-neutral-400 sm:text-sm'>{selectedPrivacy} profile...</span>
                        </div>
                        <div className={`flex relative items-start justify-center gap-2 p-1 w-44 sm:w-52 h-11  border-neutral-300 bg-neutral-300 border-2 rounded-lg`}>
                            <div className={`${selectedPrivacy === 'private' ? 'bg-none' : 'bg-none'} relative z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-2 px-3 flex items-center justify-center text-black text-sm sm:text-base font-normal`} onClick={() => handleSwitchPrivacy('private')}>
                                <span>
                                    Private
                                </span>
                            </div>
                            <div className={`${selectedPrivacy === 'public' ? 'bg-none' : 'bg-none'} relative z-10 rounded text-sm sm:text-base w-1/2 h-full cursor-pointer transition-all duration-300 py-2 px-3 flex items-center justify-center text-black  font-normal`} onClick={() => handleSwitchPrivacy('public')}>
                                <span>
                                    Public
                                </span>
                            </div>
                            <div className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded z-[1]  bg-neutral-50 ${selectedPrivacy === 'private' ? 'translate-x-[5%]' : 'translate-x-[100%]'}`}></div>
                        </div>
                    </div>

                    {/* save */}
                    <div className='flex items-start w-full my-3'>
                        <button className=" hover:bg-primary-500 hover:text-white transition-all duration-500 hover:scale-110 w-20 h-8 p-1.5 flex items-center justify-center border border-primary-500  text-primary-500 font-normal text-base rounded">Save</button>
                    </div>
                </div>
            </div>

            <hr className='w-full border border-neutral-300' />

            {/* Social Links */}
            <div className="flex flex-col items-start justify-center w-full gap-6 py-6 sm:py-14 sm:items-start ">
                <div className="flex flex-col items-start justify-between gap-1">
                    <span className='text-sm font-normal text-neutral-700 sm:text-base '>Social links</span>
                    <span className='text-xs font-normal capitalize text-neutral-400 sm:text-sm'>Note: You only need to add your username.</span>
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-4 md:flex-row">
                    <div className="relative flex items-start justify-center w-full  max-w-[395px]">
                        <input type="text" className='py-2 px-3 w-full sm:w-[395px] placeholder:text-neutral-500 placeholder:text-lg  bg-neutral-50 border-2 border-primary-300 rounded-lg text-neutral-900 text-lg font-normal' value={''} placeholder='twitter.com/' />
                        <img src={twitter} className='absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2' alt="twitter" />
                    </div>
                    <div className="relative flex items-start justify-center w-full max-w-[395px] ">
                        <input type="text" className='py-2 px-3 w-full sm:w-[395px] bg-neutral-50 border-2 border-primary-300 rounded-lg text-neutral-900 text-lg font-normal placeholder:text-neutral-500 placeholder:text-lg' value={''} placeholder='website url' />
                        <img src={websiteIcon} className='absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2' alt="twitter" />
                    </div>
                </div>

                {/* save */}
                <div className='flex items-start w-full my-3'>
                    <button className=" hover:bg-primary-500 hover:text-white transition-all duration-500 hover:scale-110 w-20 h-8 p-1.5 flex items-center justify-center border border-primary-500  text-primary-500 font-normal text-base rounded">Save</button>
                </div>
            </div>

            <hr className='w-full border border-neutral-300' />

            {/* theme switch */}
            <div className="flex flex-row items-start justify-between w-full gap-3 py-6 md:gap-0 sm:py-14">
                <div className="flex flex-col items-start justify-between gap-1">
                    <span className='text-sm font-normal text-neutral-700 sm:text-base '>Theme</span>
                    <span className='text-xs font-normal capitalize text-neutral-400 sm:text-sm'>Select website color theme.</span>
                </div>
                <div className={` relative flex items-start justify-center gap-2 p-1 w-44 sm:w-52 h-11  border-neutral-200 bg-neutral-100 border-2 rounded-lg`}>
                    <div className={`${selectedTheme === 'light' ? 'bg-none' : 'bg-none'} z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-2 px-3 flex items-center justify-center text-black text-sm sm:text-base font-normal`} onClick={() => handleSwitchTheme('light')}>
                        <span>
                            Light
                        </span>
                    </div>
                    <div className={`${selectedTheme === 'dark' ? 'bg-none' : 'bg-none'} z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-2 px-3 flex items-center justify-center text-black text-sm sm:text-base font-normal`} onClick={() => handleSwitchTheme('dark')}>
                        <span>
                            Dark
                        </span>
                    </div>

                    <div className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded z-[1]  bg-neutral-300 ${selectedTheme === 'light' ? 'translate-x-[5%]' : 'translate-x-[100%]'}`}></div>

                </div>
            </div>

            <hr className='w-full border border-neutral-300' />

            {/* Delete my account */}
            <div className="flex flex-col items-start justify-between gap-6 py-6 sm:py-14">
                
                <span className='text-sm font-medium leading-6 text-neutral-700 sm:text-lg '>Delete my account</span>
                
                <span className='max-w-[530px] text-sm font-normal capitalize text-neutral-600 sm:text-base text-left'>Deleting the account will delete all the data. You will not be able to recover your account once you delete it.</span>
                
                {/* delete btn */}
                <div className='flex items-start w-full '>
                    <button className="flex items-center justify-center p-1.5 sm:p-3 text-sm sm:text-base font-normal w-36 sm:w-[170px] text-white transition-all duration-500 rounded-md hover:scale-110 h-11 bg-error-500">Delete</button>
                </div>

            </div>
        </div>
    )
}

export default Profile