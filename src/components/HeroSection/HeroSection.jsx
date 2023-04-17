import React from 'react'
import BG from '../../assets/Grill.svg'
import Vid from '../../assets/lC 1.svg'


const HeroSection = () => {
    return (
        <>
            <div className='w-[1092px] h-[147px] flex flex-col items-center justify-center mx-auto my-24 gap-3'>
                <h1 className="w-[1092px] h-[75px] lexend font-semibold  text-[60px] leading-[75px] text-primary">Save, Curate, Share & Discover links</h1>
                <p className='w-[798px] h-[60px] lexend font-light text-[24px] leading-[30px] text-center text-textPrimary mx-auto'>Linkcollect is the perfect platform to save, collect and share links with your friends faster and easier.</p>
            </div>
            <div className="w-[288px] h-[86px] mx-auto bg-primary flex items-center justify-center my-4 cursor-pointer" style={{ boxShadow: `-5px 5px 0px #ADAEFF` }}>
                <p className='lexend font-medium text-[28px] leading-[35px] text-bgPrimary text-center'>Add to Chrome</p>
            </div>
            <div className="w-full h-[356px] my-56 relative">
                <img src={BG} alt="" className='w-full  h-full' />
                {/*will change it to video later*/}
                <img src={Vid} className='w-[1001px] h-[647.06px] top-[-100px] left-[250px]  absolute block mx-auto' />
            </div>
        </>

    )
}

export default HeroSection;