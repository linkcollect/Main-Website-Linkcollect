import React from "react";

const classMapper = {
    fileClass: `block w-full text-sm border-2 border-primary-300 rounded-md py-2 px-3
    file:mr-4 file:py-0 file:px-4 file:py-1
    file:rounded-md file:border-0
    file:text-[16px] file:font-light
    file:bg-secodary file:text-primary
    hover:file:bg-violet-100
    file:cursor-pointer
    `,
    textClass:
    'block w-full p-[0.638rem] text-base font-normal border-2 rounded-lg border-primary-300 text-neutral-800 focus:outline-none placeholder:text-neutral-400'
};

const Input = ({
    name,
    type,
    label,
    placeholder,
    onInputHandler,
    inputClass,
    value,
    required
}) => {
    return (
        <label className="block">
            <span className="text-neutral-700 flex justify-between items-end  text-[16px] font-light mb-[3px]">
                <p>{label}</p>
                {type !== "file" && <small className="text-xs"><span className={`${value?.length > required ? "text-danger" : ""}`}>{value?.length}</span>/{required}</small>}
            </span>
            <input
                type={type}
                name={name}
                className={classMapper[inputClass]}
                placeholder={placeholder}
                onChange={onInputHandler}
                value={value}
            />
        </label>
    );
};

export const Select = ({ name, onInputHandler, options, value }) => {
    return (
        <>
            <label
                for="privacy"
                className="block"
            >
                <span className="text-textSecondary flex justify-between items-end  text-[16px] font-light mb-[3px]">
                    <p>Privacy</p>
                </span>
            </label>
            <select
                id="pravacy"
                className="block w-full p-3 border border-solid rounded-lg bg-inputBackground border-inputBorder text-textPrimary text-normal focus:ring-textSecondary focus:border-textSecondary focus:outline-none"
                onChange={onInputHandler}
                name={name}
                value={value}
            >
                {options.map((opt) => (
                    <option value={opt.value}>{opt.name}</option>
                ))}
            </select>
        </>
    );
};

export default Input;
