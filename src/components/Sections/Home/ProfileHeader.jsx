import React, { useContext, useRef } from 'react'
import Twitter from '../../../assets/twitterBlue.svg'
import Website from '../../../assets/websiteIcon.svg'
import Copy from '../../../assets/copyIcon.svg'
import CopyWhiteIcon from '../../../assets/darkMode/whiteCopyIcon.svg'
import profile from '../../../assets/defaultProfile.svg'
import Back from '../../../assets/back-arrow.svg'
import DarkModeBack from '../../../assets/darkMode/WhiteBackArrow.svg'
import Button from '../../UI/Button/Button'
import approve from "../../../assets/approve.svg"
import WhiteApprove from "../../../assets/darkMode/whiteCheck.svg"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { switchMode } from '../../../hooks/switchMode'
const ProfileHeader = ({ name, socials, imageUrl, totalViews, totalCollections, username }) => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const copyRef = useRef();
    const copyMobileRef = useRef();

    // getting current selected mode
    const { selectedMode } = useContext(switchMode)
    
    // TODO: Need to change logic to copy link
    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://linkcollect.io/${username}`)
        if (copyRef.current) {
            copyRef.current.src = selectedMode === "light"? approve : WhiteApprove ;
            setTimeout(() => {
                try {
                    copyRef.current.src = selectedMode === "light"? Copy : CopyWhiteIcon;
                } catch (error) {
                    // console.error(error)
                }
            }, 500)
            if (copyMobileRef.current) {
                copyMobileRef.current.src = selectedMode === "light"? approve : WhiteApprove ;
                setTimeout(() => {
                    try {
                        copyMobileRef.current.src = selectedMode === "light"? Copy : CopyWhiteIcon ;
                    } catch (error) {
                        // console.error(error)
                    }
                }, 500)
            }
        }
    }
    const backHnadler = () => {
        if (!auth.isLoggedIn) {
            navigate("/login")
        } else {
            navigate(`/${auth.username}`);
        }
    }


    return (
        <div className="flex flex-col items-start justify-center w-full gap-8 mx-auto 3xl:px-0 max-w-[1500px] pb-5">
            <div className='flex flex-col items-start justify-center w-full gap-6'>

                {/* back button */}
                <Button variant={selectedMode === "light" ? "secondaryOutline" : "darkOutlined"} className={`
                w-[91px] h-[41px] pr-31`} onClick={backHnadler}>
                    {selectedMode === "light" ?
                        <img src={Back} alt="" className='' />
                        :
                        <img src={DarkModeBack} alt="" className='' />
                    }
                    Back
                </Button>

                <div className='flex items-start justify-between w-full'>
                    {/*visited user's details*/}
                    <div className="flex flex-col items-center justify-start w-full gap-5 sm:flex-row">
                        {/* Profile photo */}
                        <img src={imageUrl ? imageUrl : profile} alt="" className='w-20 h-20 rounded-full' />

                        <div className="flex flex-col items-center justify-start w-full gap-3 sm:items-start">
                            {/* Name */}
                            <div className='flex flex-row gap-2'>
                                <p className={`text-sm font-medium ${selectedMode === "light" ? "text-neutral-900" : "text-neutral-50"}`}>{name}</p>
                                 {selectedMode === "light" ?
                                <img ref={copyMobileRef} src={Copy} alt="" onClick={copyLinkHandler} className='cursor-pointer sm:hidden' />
                                :
                                <img ref={copyMobileRef} src={CopyWhiteIcon} alt="" onClick={copyLinkHandler} className='cursor-pointer sm:hidden' />
                            }
                            </div>

                            {/* Social Links */}
                            {/* Logic Ramining */}
                            {socials?.length > 1 && socials[0] && socials[1] && <div className="flex flex-row items-center justify-center w-full gap-3 sm:justify-start">
                            {socials[0].length > 5 && <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Twitter} alt="" />
                                <a  href={socials[0]} target="_blank" rel="noreferrer" className="text-xs font-normal text-neutral-900">twitter</a>
                            </div>}
                            {socials[1].length > 5 && <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Website} alt="" />
                                <a href={socials[1]} target="_blank" rel="noreferrer" className="text-xs font-normal text-neutral-900">Website</a>
                            </div>}
                            </div>}

                            {/*No. of Views and collections */}
                            <div className="flex items-center justify-between w-full gap-3 sm:justify-start">
                                <span className={`text-xs font-normal ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"}`}>Total Collections {totalCollections}</span>
                                <span className={`text-xs font-normal ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"}`}>Total views {totalViews}</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile link copy */}
                    <div className=''>
                        <Button variant={selectedMode==="light"? `secondaryOutline`: "darkOutlined"} onClick={copyLinkHandler} className="w-[172px] h-[44px] hidden sm:flex align-top justify-evenly">
                            {selectedMode === "light" ?
                                <img ref={copyRef} src={Copy} alt="" />
                                :
                                <img ref={copyRef} src={CopyWhiteIcon} alt="" />
                            }
                            Profile Link
                        </Button></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;