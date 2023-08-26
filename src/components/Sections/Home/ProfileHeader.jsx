import React, {useRef} from 'react'
import Twitter from '../../../assets/twitterBlue.svg'
import Website from '../../../assets/websiteIcon.svg'
import Copy from '../../../assets/copyIcon.svg'
import profile from '../../../assets/defaultProfile.svg'
import Back from '../../../assets/back-arrow.svg'
import Button from '../../UI/Button/Button'
import approve from "../../../assets/approve.svg"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ProfileHeader = ({name,socials,imageUrl,totalViews,totalCollections,username}) => {
    const auth = useSelector(state=>state.auth);
    const navigate  = useNavigate();
    const copyRef = useRef();
    const copyMobileRef = useRef();

    // TODO: Need to change logic to copy link
    const copyLinkHandler = () =>{
        navigator.clipboard.writeText(`https://linkcollect.io/${username}`)
            if(copyRef.current){
                copyRef.current.src = approve;
                setTimeout(()=>{
                    try {
                        copyRef.current.src = Copy;
                    } catch (error) {
                        // console.error(error)
                    }
                }, 500)
            if(copyMobileRef.current){
                copyMobileRef.current.src = approve;
                setTimeout(()=>{
                    try {
                        copyMobileRef.current.src = Copy;
                    } catch (error) {
                        // console.error(error)
                    }
                }, 500)
            }
        }
    }
    const backHnadler = () =>{
        if(!auth.isLoggedIn){
            navigate("/login")
        }else{
            navigate(`/${auth.username}`);
        }
    }
    
    return (
        <div className="flex flex-col items-start justify-center w-full gap-8 mx-auto 3xl:px-0 max-w-[1500px] pb-5">
        <div className='flex flex-col items-start justify-center w-full gap-6'>

            {/* back button */}
            <Button variant="secondaryOutline" className="w-[91px] h-[41px] pr-3" onClick={backHnadler}>
                <img src={Back} alt="" className=''/>Back
            </Button>

            <div className='flex items-start justify-between w-full'>
                {/*visited user's details*/}
                <div className="flex flex-col sm:flex-row items-center justify-start w-full gap-5">
                    {/* Profile photo */}
                    <img src={imageUrl ? imageUrl : profile} alt="" className='w-20 h-20 rounded-full' />

                    <div className="flex flex-col items-center sm:items-start w-full justify-start gap-3">
                        {/* Name */}
                        <div className='flex flex-row gap-2'>
                          <p className="text-sm font-medium text-neutral-900">{name}</p>
                          <img ref={copyMobileRef} src={Copy} alt="" onClick={copyLinkHandler} className='cursor-pointer sm:hidden'/>
                        </div>

                        {/* Social Links */}
                        {/* Logic Ramining */}
                        {/* <div className="flex items-center justify-start w-full gap-3">
                            <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Twitter} alt="" />
                                <span className="text-xs font-normal text-neutral-900">twitter</span>
                            </div>
                            <div className="flex items-center gap-1 p-1 rounded-[18px] justify-center bg-neutral-300">
                                <img src={Website} alt="" />
                                <span className="text-xs font-normal text-neutral-900">Website</span>
                            </div>
                        </div> */}

                        {/*No. of Views and collections */}
                        <div className="flex items-center justify-between sm:justify-start w-full gap-3">
                            <span className="text-xs font-normal text-neutral-600">Total Collections {totalCollections}</span>
                            <span className="text-xs font-normal text-neutral-600">Total views {totalViews}</span>
                        </div>
                    </div>
                </div>

                {/* Profile link copy */}
                <div className=''>
                <Button variant="secondaryOutline" onClick={copyLinkHandler} className="w-[172px] h-[44px] hidden sm:flex align-top justify-evenly">
                    <img ref={copyRef} src={Copy} alt="" />Profile Link
                </Button></div>
            </div>
        </div>
        </div>
    )
}

export default ProfileHeader;