import React, { useState } from 'react'
import Logo from '../../assets/mainLogo.svg'

const Navbar = () => {
    const [buttonText, setButtonText] = useState("Install");

    const handleMouseEnter = () => {
       let a = document.getElementById('NavBtn')
      a.style.transition='1s'
      a.style.transitionDelay='1.5'
      a.style.transitionTimingFunction='ease-in-out'
       setButtonText("Coming Soon");
    };
  
    const handleMouseLeave = () => {
      setButtonText("Install");
    };
    return (
        <div className='w-full flex items-center justify-around lexend'>
            <div>
                <img src={Logo} alt="" className='w-[241px] h-[109.82px]' />
            </div>

             <div>   
             <ul className="flex items-center justify-center space-x-5 w-max ">
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>How it works</li>
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>Request Demo</li>
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>Contact Us</li>
                </ul>
            </div>

            <div className='flex items-center justify-center'>
                <div className="flex items-center justify-center gap-6 w-max">
                    <div className="w-[138px] cursor-pointer h-[63px] border-solid border-[0.5px] border-primary text-primary flex items-center justify-center">
                        <button className='text-center mx-auto w-[161.94px] h-[26px] font-medium text-[20.61px] leading-[26px] cursor-not-allowed' disabled>Login</button>
                    </div>
                    <div className="w-[190px] cursor-pointer h-[63.31px] bg-primary flex items-center justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <p id='NavBtn' className='text-center  h-[26px] text-bgPrimary text-[17.61px] font-medium'  >{buttonText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar