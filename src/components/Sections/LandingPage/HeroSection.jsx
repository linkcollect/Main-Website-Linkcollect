import React, { useState } from 'react'
import BG from '../../../assets/Grill.svg'
// import Vid from '../../assets/lC 1.svg'
import Vid from '../../../assets/newTest.mp4'
import DekstopVid from '../../../assets/newTest.mp4'

const HeroSection = () => {
   
    return (
        <>
            <div className='w-[80%] max-w-[1092px] h-[147px] flex flex-col items-center justify-center mx-auto my-24 gap-3 xl:w-[1092px] xl:h-[147px]'>
                <h1 className="w-[100%] my-4 h-[95px] lexend font-semibold  text-[1.8rem] leading-3.2rem text-primary xl:text-[48px] xl:leading-[75px] 2xl:text-[50px] 2xl:leading-[78px]">Save, Curate, Share & Discover links</h1>
                <p className='w-[90%] my-4 h-[80px] lexend font-light text-[1.6rem] leading-8 text-center text-textPrimary mx-auto xl:w-[798px] xl:h-[60px] xl:text-[24px] xl:leading-[30px] xl:my-0 2xl:my-0 2xl:w-[810px] 2xl:h-[64px]'>Linkcollect is the perfect platform to save, collect and share links with your friends faster and easier.</p>
            </div>
            <a href='https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/' 
            target='_blank' 
            rel='noreffer' 
            className='lexend font-medium text-2xl leading-[2.2rem] text-white text-center w-[80%] max-w-[18rem] h-[4.02rem] mx-auto bg-primary-500 flex items-center justify-center my-44 cursor-pointer xl:my-4 xl:text-[28px] xl:leading-[35px] xl:w-[288px] xl:h-[86px]' style={{ boxShadow: `-5px 5px 0px #ADAEFF` }}>
                Install Extension
            </a>
            <div className="w-full my-36 relative xl:my-56 justify-centre">
                <img src={BG} alt="" className='w-full h-full' />
                {/*will change it to video later*/}
                <div className='w-[277px] h-[165px] left-[12.5%] top-[-40px]  sm:mx-auto md:w-[450px] md:h-[260px] md:left-[25%] lg:w-[600px] lg:h-[342px] xl:top-[-100px] xl:left-0 xl:w-full xl:h-[570px] flex justify-center absolute'>
                    <div className='w-[1000px] border-[10px] border-primary-200  overflow-hidden block h-full'>
                    <video src={Vid} className=' block sm:hidden w-full' autoPlay muted loop/>
                    <video src={DekstopVid} className=' hidden sm:block w-full' autoPlay muted loop/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HeroSection;