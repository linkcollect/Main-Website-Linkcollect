import React, { useEffect, useState } from 'react'
import Logo from '../../assets/mainLogo.svg'
import { Link } from 'react-router-dom';

const Navbar = ({ windowWidth }) => {
    return (
        <div className='flex items-center justify-around w-full lexend'>
            <div>
                <img src={Logo} alt="" className='w-36 sm:w-[180px] sm:h-[109.82px]' />
            </div>
            {windowWidth > 700 ?
                <div>
                    <ul className="flex items-center justify-center space-x-5 w-max md:space-x-3 lg:space-x-4 xl:space-x-5 2xl:space-x-7">
                        <a href="#how-it-works">
                            <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px] group sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>
                                How it works

                                {/* Underline effect on Hover */}
                                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                            </li>
                        </a>
                        <a href="https://calendly.com/linkcollect/linkcollect-io" target="_blank">
                            <li className='group font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]  sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>
                                Request Demo

                                {/* Underline effect on Hover */}
                                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                            </li>
                        </a>
                        <a href="https://twitter.com/linkcollect_io" target="_blank">
                            <li className='group font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]  sm:text-[12px] md:text-[15px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px]'>
                                Contact Us

                                {/* Underline effect on Hover */}
                                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                            </li>
                        </a>
                    </ul>
                </div>
                :
                ''
            }
            <>
                <div className='flex items-center justify-center w-1/2 sm:w-auto'>
                    <div className="flex items-center justify-between w-full gap-3 sm:justify-center sm:w-max md:gap-4 xl:gap-6">
                        <Link to="/login " className='w-[40%]'>
                            <div className=" w-full max-w-[8.625rem] h-10 cursor-pointer border-solid border-[0.5px] border-primary-500 text-primary-500 flex items-center justify-center md:w-[100px] md:h-[53px] xl:h-[63px] xl:w-[138px]">
                                <button className='w-full text-center mx-auto  sm:w-[161.94px] sm:h-[26px] font-medium md:text-[16px] md:leading-[20px] xl:text-[20.61px] xl:leading-[26px]'>Login</button>
                            </div>
                        </Link>
                        {windowWidth < 700 &&
                            <Link to="/signup" className="flex items-center justify-center w-[45%] max-w-[7rem] h-10 px-2 text-base border-2 lexend bg-primary border-primary sm:px-7 sm:py-2 text-bgPrimary whitespace-nowrap">
                                Sign up
                            </Link>
                        }
                        {windowWidth > 700 &&
                            <a href='https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/' target='_blank' rel='noreferrer' className=" w-[110px] h-[53.31px] cursor-pointer  bg-primary-500 flex items-center justify-center md:w-[110px] md:h-[53.31px] xl:h-[63.31px] xl:w-[190px]">
                                <p id='NavBtn' className='text-center  h-[26px] text-white  md:text-[16px] xl:text-[17.61px] font-medium'  >Install</p>
                            </a>
                        }
                    </div>
                </div>
            </>
        </div>
    )
}

export default Navbar
