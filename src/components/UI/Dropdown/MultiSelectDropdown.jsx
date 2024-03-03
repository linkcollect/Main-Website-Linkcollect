import { useContext, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { switchMode } from '../../../hooks/switchMode';
import Chip from '../Chip/Chip';
const MultiSelectDropdown = ({
  tagsList,
  selectedTag,
  setSelectedTag,
  maxTagToselect,
}) => {
  const { selectedMode } = useContext(switchMode);

  const handleSelect = value => {
    if (value.length > maxTagToselect) {
      const val = value.shift();
      setSelectedTag({ ...selectedTag, tags: val });
    }
    setSelectedTag({ ...selectedTag, tags: value });
  };

  const isSelected = value => {
    return selectedTag.tags.find(el => el === value) ? true : false;
  };

  return (
    <Listbox
      value={selectedTag.tags}
      onChange={handleSelect}
      as="div"
      multiple={true}
    >
      <Listbox.Button
        as="div"
        className={`inline-flex  flex-wrap overflow-auto w-full cursor-pointer rounded-md py-1.5 pl-3 pr-10 border-2  ${
          selectedMode === 'light'
            ? 'bg-neutral-50 border-primary-200 '
            : 'bg-dark-primary border-primary-400'
        }`}
      >
        {selectedTag.tags.length ? (
          selectedTag.tags.map(tag => {
            return (
              <Chip
                name={tag}
                className={`p-3 m-1 flex  items-center font-semibold ${
                  selectedMode === 'light' ? 'text-black' : 'text-white'
                }`}
              />
            );
          })
        ) : (
          <Listbox.Label
            className={`${
              selectedMode === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            Select Tags
          </Listbox.Label>
        )}
      </Listbox.Button>
      <div
        className={`${
          selectedMode === 'light' ? 'text-neutral-600' : 'text-white'
        } w-full text-[0.8rem]`}
      >
        Select max {maxTagToselect} tags
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className="static cursor-pointer z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg sm:text-sm"
          static={true}
        >
          {tagsList.map(tag => {
            const selected = isSelected(tag);
            return (
              <Listbox.Option key={tag} value={tag}>
                {({ active }) => (
                  <div
                    className={`${
                      active ? ` bg-primary-200 ` : 'text-gray-900'
                    } ${
                      selectedMode === 'light' ? 'text-black' : 'text-white'
                    } cursor-default select-none relative py-2 pl-4 pr-4`}
                  >
                    <span
                      className={`${
                        selected ? 'font-semibold' : 'font-normal'
                      } block truncate`}
                    >
                      {tag}
                    </span>

                    <span
                      className={`${
                        active ? 'text-white' : 'text-black'
                      } absolute inset-y-0 right-5 flex items-center  `}
                    >
                      <input
                        checked={selected ? true : false}
                        id="checkbox"
                        type="checkbox"
                        value=""
                        className={
                          'items-end w-4 h-4 accent-neutral-50 cursor-pointer'
                        }
                      />
                    </span>
                  </div>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
export default MultiSelectDropdown;
