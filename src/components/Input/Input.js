import React from "react";

const Input = ({id,type,name,placeholder,onInput,value}) => {
  return (
    
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        onChange={onInput}
        value={value}
        className="px-3 py-4 border-2 border-secondary placeholder-textSecondary focus:outline-none block w-full rounded-lg text-base"
      />
  );
};

export default Input;
