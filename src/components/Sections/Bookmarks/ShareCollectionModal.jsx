import React, { useRef } from 'react'
import Modal from '../../UI/Modal/Modal'
import cancelIcon from "../../../assets/cancel.svg"
import Input from '../../UI/Input/Input'
import { useLocation } from 'react-router-dom'
import Copy from '../../../assets/copyIcon.svg'
import approve from "../../../assets/approve.svg"
import CancelWhite from '../../../assets/darkMode/cancelWhite.svg'
import CopyWhiteIcon from '../../../assets/darkMode/whiteCopyIcon.svg'
import WhiteApprove from "../../../assets/darkMode/whiteCheck.svg"
import twitterIcon from "../../../assets/twitterOutlined.svg"
import telegramIcon from "../../../assets/telegramOutlined.svg"
import whatsappIcon from "../../../assets/whatsappOutlined.svg"
import whatsappIconWhite from "../../../assets/darkMode/whatsappWhite.svg"
import telegramIconWhite from "../../../assets/darkMode/telegramWhite.svg"
import twitterIconWhite from "../../../assets/darkMode/twitterWhite.svg"
import { TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import IconButton from '../../UI/IconButton/IconButton'
import { switchMode } from '../../../hooks/switchMode'
import { useContext } from 'react'

const ShareCollectionModal = ({ isOpen, onClose, collectionName, tags }) => {
    // getting current selected mode
    const { selectedMode } = useContext(switchMode)

    const location = useLocation()
    const copyRef = useRef();
    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://linkcollect.io${location.pathname}`)
        if (copyRef.current) {
            copyRef.current.src = selectedMode === "light" ? approve : WhiteApprove;
            setTimeout(() => {
                try {
                    copyRef.current.src = selectedMode === "light" ? Copy : CopyWhiteIcon;

                } catch (error) {

                }
            }, 500)
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-3 px-3">
                {/* Header  */}
                <div className="flex justify-between w-full">
                    <h1 className={`text-start font-medium text-[20px] ${selectedMode === 'light' ? "text-black" : "text-neutral-50"} `}>
                        Share Collection
                    </h1>
                    <button className="flex" onClick={onClose}>
                        {selectedMode === 'light' ?
                            <img src={cancelIcon} name="cancel" />
                            :
                            <img src={CancelWhite} name="cancel" />
                        }
                    </button>
                </div>

                <hr className={`w-[97%] border ${selectedMode === 'light' ? "border-neutral-300" : "border-dark-secondary"} `} />

                {/* Content  */}
                <div className={`mb-1 ${selectedMode === 'light' ? "text-black" : "text-neutral-50"}  `}>

                    <p className='mb-1'>Collection Link</p>
                    <div className='relative cursor-pointer h-max' onClick={copyLinkHandler}>
                        <Input variant={selectedMode === 'light' ? "" : "darkDefault"} value={`https://linkcollect.io${location.pathname}`} readonly className="cursor-pointer" />
                        {selectedMode === "light" ?
                            <img src={Copy} ref={copyRef} className='absolute bg-white p-1 right-2 h-7 w-7 top-[0.75rem] z-[99]' alt='' />
                            :
                            <img src={CopyWhiteIcon} ref={copyRef} className='absolute bg-dark-primary p-1 right-2 h-7 w-7 top-[0.75rem] z-[99]' alt='' />
                        }
                    </div>

                </div>
                {/* Socal Shares */}
                <div>
                    <p className={`mb-1 ${selectedMode === 'light' ? "text-black" : "text-neutral-50"}  `} >Share Link Via</p>
                    <div className="flex w-full gap-2">
                        <TwitterShareButton url={`https://linkcollect.io${location.pathname}`} hashtags={tags?.length > 0 ? tags : ["linkcollect"]} title={`Checkout the awsome collection - ${collectionName}`}>
                            <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                                {selectedMode === 'light' ?
                                    <img src={twitterIcon} alt="" />
                                    :
                                    <img src={twitterIconWhite} alt="" />
                                }
                            </IconButton>
                        </TwitterShareButton>
                        <TelegramShareButton url={`https://linkcollect.io${location.pathname}`} title={`Checkout the awsome collection - ${collectionName}`}>
                            <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                                {selectedMode === 'light' ?
                                    <img src={telegramIcon} />
                                    :
                                    <img src={telegramIconWhite} />
                                }
                            </IconButton>
                        </TelegramShareButton>
                        <WhatsappShareButton url={`https://linkcollect.io${location.pathname}`} title={`Checkout the awsome collection - ${collectionName}`}>
                            <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                                {selectedMode === 'light' ?
                                    <img src={whatsappIcon} />
                                    :
                                    <img src={whatsappIconWhite} />
                                }
                            </IconButton>
                        </WhatsappShareButton>

                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ShareCollectionModal