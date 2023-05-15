import React, { useState } from 'react'
import Input, { Select } from './InputEditCollection';

const EditCollection = (isOpen, setIsOpen) => {
    //Edited Collection Name
    const [editedCollectionName, setEditedCollectionName] = useState('')

    //Edited COllection Description
    const [editedDesc, setEditedDesc] = useState('')

    //Edited Collection Privacy/Public
    const [editedPrivacy, setEditedPrivacy] = useState('')

    // Image 
    const [image, setImage] = useState();

    //Image handler
    const onInputFile = (e) => {
        e.preventDefault();
        setImage(e.target.files[0])
    };

    //Description Change Handler
    const editDescHandler = (e) => {
        setEditedDesc(e.target.value)
    }

    //Privacy/Public Change Handler
    const editPrivacyHandler = (e) => {
        setEditedPrivacy(e.target.value)
    }

    //Name Change Handler
    const nameChangeHandler = (e) => {
        setEditedCollectionName(e.target.value)
    }
    return (
        <div className='flex items-center justify-center w-full h-screen bg-opacity-70 bg-bgSecondary '>
            <div className='inset-0 z-10 w-[416px] h-[605px] flex flex-col items-center justify-between bg-bgSecondary py-4 mx-auto my-28 rounded-lg'>
                <div>
                    <h1 className="text-center font-medium text-[22px]  text-textPrimary ">Edit Collection</h1>
                </div>
                <div className='flex flex-col items-center justify-center gap-8'>
                    {/* Collection Name Input */}
                    <div className='w-96 h-14 '>
                        <Input
                            type={'text'}
                            value={editedCollectionName}
                            label={'Collection Name'}
                            inputClass={'textClass'}
                            onInputHandler={nameChangeHandler}
                            required={30}
                        />
                    </div>
                    {/* Collection Description Input */}
                    <div className='w-96 h-28 '>

                        <label className="block">
                            <span className="text-textSecondary flex justify-between items-end  text-[16px] font-light mb-[3px]">
                                <p>Description</p>
                                <small className="text-xs"><span className={`${editedDesc?.length > 250 ? "text-danger" : ""}`}>{editedDesc?.length}</span>/250</small>
                            </span>
                            <textarea
                                value={editedDesc}
                                onChange={editDescHandler}
                                className='w-full h-28 px-4 py-2  bg-inputBackground border-solid border-[1px] border-inputBorder rounded-[10px] font-normal text-base text-textPrimary resize-none	'                        >
                            </textarea>

                        </label>
                    </div>

                    {/* Collection Privacy Input */}
                    <div className='w-96 h-14 '>
                        <Select
                            value={editedPrivacy}
                            onInputHandler={editPrivacyHandler}
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
                            onInputHandler={onInputFile}
                        />
                    </div>


                </div>
                <div className='flex items-center justify-center w-96 h-14 rounded-xl bg-primary px-3 py-8 font-medium text-[16px] text-bgPrimary cursor-pointer' onClick={() => setIsOpen(false)} >
                    <span >Save</span>
                </div>
            </div>
        </div>
    )
}

export default EditCollection;