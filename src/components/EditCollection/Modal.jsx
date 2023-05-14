// import { motion } from "framer-motion";
// import Backdrop from "./Backdrop";
// import EditCollection from "./EditCollection";

// const dropIn = {
//     hidden: {
//       y: "-100vh",
//       opacity: 0,
//     },
//     visible: {
//       y: "0",
//       opacity: 1,
//       transition: {
//         duration: 0.1,
//         type: "spring",
//         damping: 25,
//         stiffness: 500,
//       },
//     },
//     exit: {
//       y: "100vh",
//       opacity: 0,
//     },
//   };


// const Modal = ({ handleClose, text }) => {

//     return (
//       <Backdrop onClick={handleClose}>
//           <motion.div
//             onClick={(e) => e.stopPropagation()}  
//             className="modal orange-"
//             variants={dropIn}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <EditCollection />
//           </motion.div>
//       </Backdrop>
//     );
//   };


import * as React from "react"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import EditCollection from "./EditCollection"
import Input, { Select } from './InputEditCollection';
import Loader from '../Loader/Loader'
export const Modal = ({
    isOpen,
    setIsOpen,
    imageHandler,
    inputHandler,
    data,
    onSubmit,
    loading
}) => {
    //Handling save
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.title === "" || data.title.length > 40 || data.description.length > 240) return
        try {
            console.log(data)
        } catch (error) {
        }
        setIsOpen(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={setIsOpen}
                    as="div"
                    className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
                >
                    <div className="flex flex-col py-8 text-center">
                        <Dialog.Overlay />
                    </div>
                    {/* edit collection Page */}
                    <motion.div
                        className='absolute top-0 right-0 flex items-center justify-center w-[80%] h-screen bg-opacity-70 bg-editBackground '
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                ease: "easeOut",
                                duration: 0.15,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.75,
                            transition: {
                                ease: "easeIn",
                                duration: 0.15,
                            },
                        }}
                    >
                        <div className='inset-0 z-10 w-[416px] h-[605px] flex flex-col items-center justify-between bg-bgSecondary py-4 mx-auto my-28 rounded-lg'>
                            <div>
                                <h1 className="text-center font-medium text-[22px]  text-textPrimary ">Edit Collection</h1>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-8'>
                                {/* Collection Name Input */}
                                <div className='w-96 h-14 '>
                                    <Input
                                        type={'text'}
                                        value={data.title}
                                        label={'Collection Name'}
                                        inputClass={'textClass'}
                                        onInputHandler={inputHandler}
                                        required={30}
                                        name={'title'}
                                    />
                                </div>
                                {/* Collection Description Input */}
                                <div className='w-96 h-28 '>

                                    <label className="block">
                                        <span className="text-textSecondary flex justify-between items-end  text-[16px] font-light mb-[3px]">
                                            <p>Description</p>
                                            <small className="text-xs"><span className={`${data.description?.length > 250 ? "text-danger" : ""}`}>{data.description?.length}</span>/250</small>
                                        </span>
                                        <textarea
                                            value={data.description}
                                            onChange={inputHandler}
                                            name="description"
                                            className='w-full h-28 px-4 py-2  bg-inputBackground border-solid border-[1px] border-inputBorder rounded-[10px] font-normal text-base text-textPrimary resize-none focus:outline-none	'                        >
                                        </textarea>

                                    </label>
                                </div>

                                {/* Collection Privacy Input */}
                                <div className='w-96 h-14 '>
                                    <Select
                                        value={data.privacy}
                                        onInputHandler={inputHandler}
                                        name={'privacy'}
                                        options={
                                            [
                                                { name: 'Public', value: 'public' },
                                                { name: 'Private', value: 'private' }
                                            ]
                                        }
                                    />
                                </div>
                                {/* Collection Thumbnail Input */}
                                <div className='w-96 h-14 '>
                                    <Input
                                        type={'file'}
                                        placeholder="Upload image"
                                        label={'Collection Thumbnail (Optional)'}
                                        inputClass={'fileClass'}
                                        onInputHandler={imageHandler}
                                    />
                                </div>


                            </div>
                            <div className="flex justify-between w-full px-4 flex-items-center">
                                <div className='flex items-center justify-center w-[48%] h-12 rounded-xl bg-inputBackground px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer' onClick={() => setIsOpen(false)} >
                                    <span>Cancel</span>
                                </div>
                                <div className='flex items-center justify-center w-[48%] h-12 rounded-xl bg-primary px-3 py-6 font-medium text-[16px] text-bgPrimary cursor-pointer' onClick={onSubmit} >
                                    {loading?<Loader />:<span >Save</span>}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
export default Modal;
