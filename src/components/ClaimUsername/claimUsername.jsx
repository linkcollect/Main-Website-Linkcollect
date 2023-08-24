import React, { useState } from 'react'
import Input from '../UI/Input/Input'
import mainLogo from '../../assets/mainLogo.svg'
import Check from '../../assets/check-in-green.svg'
const ClaimUsername = () => {
    const [claimedUsername, setClaimedUsername] = useState('')
    const [isValid, setIsValid] = useState(false)

    // Login details
    const onInput = (e) => {
        e.preventDefault();
        setClaimedUsername(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-[-32px]">
                <div className="rounded-2xl flex items-center justify-evenly flex-col bg-bgPrimary gap-6 p-10 w-[410px] height[600px]">
                    <img className="h-16 mx-auto w-36" src={mainLogo} alt="LinkCollect" />
                    <div className="flex flex-col items-center justify-center w-full gap-1">
                        <h1 className=" text-[40px] leading-[50px] text-neutral-900 font-bold lexend whitespace-nowrap">Claim Username</h1>
                        <p className=" lexend font-normal text-neutral-600 text-[16px]">
                            Claim your username here{" "}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-6">
                        <div className="relative w-full">
                            <input
                                type={'text'}
                                placeholder={'Enter username'}
                                onInput={onInput}
                                value={claimedUsername}
                                className="block w-full px-3 py-4 text-base border-2 rounded-lg border-primary-100 placeholder-neutral-400 text-neutral-900 focus:outline-none"
                            />
                            {isValid && claimedUsername.length > 0 ? <>
                                <span className="absolute top-2.5 transition-all duration-1000 right-4 p-2 text-2xl text-[#5B5B5B] cursor-pointer">
                                    <img src={Check} className="w-6" />
                                </span>
                            </>
                                :
                                ''
                            }
                            {!isValid && claimedUsername.length > 0 && <small className='absolute left-0 font-medium -bottom-5 text-danger'>* Username not available</small>}
                        </div>
                        <button className={`flex items-center justify-center w-full py-3 font-bold rounded-lg ${claimedUsername.length > 1 ? 'bg-primary-500' : 'bg-neutral-400'} text-white`}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClaimUsername;