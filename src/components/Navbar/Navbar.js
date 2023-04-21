import React, { useEffect, useState } from 'react'
import Logo from '../../assets/mainLogo.svg'
import { Link } from 'react-router-dom';

const Navbar = ({windowWidth}) => {
    const [buttonText, setButtonText] = useState("Install");

    const handleMouseEnter = () => {
        let a = document.getElementById('NavBtn')
        a.style.transition = '1s'
        a.style.transitionDelay = '1.5'
        a.style.transitionTimingFunction = 'ease-in-out'
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
            {windowWidth>700?
            <>
                <div>
                    <ul className="flex items-center justify-center space-x-5 w-max md:space-x-3 lg:space-x-4 xl:space-x-5 2xl:space-x-7">
                        <a href="#how-it-works"><li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]  sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>How it works</li></a>
                        <a href="https://calendly.com/linkcollect/linkcollect-io" target="_blank"> <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]  sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>Request Demo</li></a>
                        <a href="https://twitter.com/linkcollect_io" target="_blank"><li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]  sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>Contact Us</li></a>
                    </ul>
                </div>

                <div className='flex items-center justify-center'>
                    <div className="flex gap-3 items-center justify-center w-max md:gap-4 xl:gap-6">
                        <Link to="/login">
                            <div className=" w-[100px] h-[53px] cursor-pointer border-solid border-[0.5px] border-primary text-primary flex items-center justify-center md:w-[100px] md:h-[53px] xl:h-[63px] xl:w-[138px]">
                                <button className='text-center mx-auto w-[161.94px] h-[26px] font-medium md:text-[16px] md:leading-[20px] xl:text-[20.61px] xl:leading-[26px]'>Login</button>
                            </div>
                        </Link>
                        <div className=" w-[110px] h-[53.31px] cursor-pointer  bg-primary flex items-center justify-center md:w-[110px] md:h-[53.31px] xl:h-[63.31px] xl:w-[190px]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <p id='NavBtn' className='text-center  h-[26px] text-bgPrimary md:text-[16px] xl:text-[17.61px] font-medium'  >{buttonText}</p>
                        </div>
                    </div>
                </div>
            </>: ''
            }
        </div>
    )
}

export default Navbar
