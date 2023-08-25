import React, { useState } from 'react'
import Modal from "../../UI/Modal/Modal";
import cancelIcon from "../../../assets/cancel.svg"
import { Combobox } from '@headlessui/react'
import { useSelector } from 'react-redux';
const MoveBookMarkModal = ({ isOpen, onClose, numberOfSelectedLinkes, nameOfTheCollection, selectedCollections }) => {
    const [selectedCollection, setSeelctedCollection] = useState({});
    const { userData } = useSelector(state => state.auth);
    const [query, setQuery] = useState('')

    const filteredCollection =
    query === ''
      ? userData.collections
      : userData.collections.filter((coll) => {
          return coll.name.toLowerCase().includes(query.toLowerCase())
        })
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="px-3 flex flex-col gap-5">
                {/* Header  */}
                <div className="flex justify-between  w-full">
                    <h1 className="text-start font-medium text-[20px]  text-textPrimary ">
                        Move Links
                    </h1>
                    <button className="flex" onClick={onClose}>
                        <img src={cancelIcon} />
                    </button>
                </div>

                {/* Content  */}
                <div>
                    <Combobox value={selectedCollection} onChange={setSeelctedCollection}>
                        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
                        <Combobox.Options>
                            {filteredCollection.map((collection) => (
                                <Combobox.Option key={collection.collectionId} value={collection}>
                                    {collection}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>
                    {selectedCollection !== "" && <p className='w-full mt-3 text-neutral-700'>{`Move ${numberOfSelectedLinkes} links from ${nameOfTheCollection} collection to ${selectedCollection}`}</p>}
                </div>

                {/* Actions */}
                <div className="flex w-full sm:justify-between justify-evenly items-center">
                    <button
                        className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-100 px-3 py-6 font-medium text-[16px] border-2 border-primary-500 text-primary-500 cursor-pointer"
                    >
                        <span>Move</span>
                    </button>
                    <button
                        className="flex items-center justify-center w-[45%] sm:w-[48%] h-12 rounded-xl bg-neutral-100 border border-neutral-300 px-3 py-6 font-medium text-[16px] text-textDark cursor-pointer"
                        onClick={onClose}
                    >
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default MoveBookMarkModal