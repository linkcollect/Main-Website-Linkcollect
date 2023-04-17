import React from 'react'
import Logo from '../../assets/mainLogo.svg'
const Navbar = () => {
    return (
        <div className='w-full flex items-center justify-around lexend'>
            <div>
                <img src={Logo} alt="" className='w-[241px] h-[109.82px]' />
            </div>

            <div className='flex items-center justify-center gap-12'>
                <ul className="flex items-center space-x-5 w-max ">
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>How it works</li>
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>Request Demo</li>
                    <li className='font-light text-textPrimary text-[18px] cursor-pointer leading-[22px]'>Contact Us</li>
                </ul>

                <div className="flex items-center justify-center gap-6 w-max">
                    <div className="w-[138px] cursor-pointer h-[63px] border-solid border-[0.5px] border-primary text-primary flex items-center justify-center">
                        <p className='text-center mx-auto w-[161.94px] h-[26px] font-medium text-[20.61px] leading-[26px]'>Login</p>
                    </div>
                    <div className="w-[212px] cursor-pointer h-[63.31px] bg-primary flex items-center justify-center ">
                        <p className='text-center w-[161.94px] h-[26px] text-bgPrimary text-[20.61px] leading-[26px] font-medium'>Add to Chrome</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar