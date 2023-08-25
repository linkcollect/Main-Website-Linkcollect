import React, {useRef} from 'react'
import Modal from '../../UI/Modal/Modal'
import cancelIcon from "../../../assets/cancel.svg"
import Input from '../../UI/Input/Input'
import { useLocation } from 'react-router-dom'
import Copy from '../../../assets/copyIcon.svg'
import approve from "../../../assets/approve.svg"
import twitterIcon from "../../../assets/twitterOutlined.svg"
import telegramIcon from "../../../assets/telegramOutlined.svg"
import whatsappIcon from "../../../assets/whatsappOutlined.svg"
import { TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import IconButton from '../../UI/IconButton/IconButton'

const SahreCollectionModal = ({ isOpen, onClose, collectionName, tags }) => {
    const location = useLocation()
    const copyRef = useRef();
    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://linkcollect.io${location.pathname}`)
        if (copyRef.current) {
            copyRef.current.src = approve;
            setTimeout(() => {
                copyRef.current.src = Copy;
            }, [2000])
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="px-3 flex flex-col gap-3">
                {/* Header  */}
                <div className="flex justify-between  w-full">
                    <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
                        Share Collection
                    </h1>
                    <button className="flex" onClick={onClose}>
                        <img src={cancelIcon} />
                    </button>
                </div>

                {/* Content  */}
                <div className='mb-1'>

                    <p className='mb-1'>Collection Link</p>
                    <div className='relative cursor-pointer' onClick={copyLinkHandler}>
                        <Input value={`https://linkcollect.io${location.pathname}`} readonly className="cursor-pointer"/>
                        <image src={Copy} ref={copyRef} className='absolute right-2 top-0 z-[99]' />
                    </div>

                </div>
                {/* Socal Shares */}
                <div>
                    <p className='mb-1'>Share Link Via</p>
                    <div className="w-full flex gap-2">
                        <TwitterShareButton url={`https://linkcollect.io${location.pathname}`} hashtags={tags?.length > 0 ? tags : ["linkcollect"]} title={`Checkout the awsome collection - ${collectionName}`}>
                            <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                            <img src={twitterIcon} alt="" />
                            </IconButton>
                        </TwitterShareButton>
                        <TelegramShareButton url={`https://linkcollect.io${location.pathname}`} title={`Checkout the awsome collection - ${collectionName}`}>
                        <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                            <img src={telegramIcon} />
                            </IconButton>
                        </TelegramShareButton>
                        <WhatsappShareButton url={`https://linkcollect.io${location.pathname}`} title={`Checkout the awsome collection - ${collectionName}`}>
                        <IconButton className='w-[44px] h-[44px] border border-neutral-200 rounded-full'>
                            <img src={whatsappIcon} />
                            </IconButton>
                        </WhatsappShareButton>

                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default SahreCollectionModal