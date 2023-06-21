import React, { useMemo, useState } from "react";
import OpenEye from '../../assets/openEye.svg'
import CloseEye from '../../assets/hiddenEye.svg'
const Input = ({ id, type, name, placeholder, onInput, value }) => {

  const [showPassword, setShowPassword] = useState(false);
  useMemo(()=>{
    if (value.length === 0 && type === 'password') {
      setShowPassword(false)
    }
  },[value])

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type === "password" ? (!showPassword ? "password" : "text") : type}
        required
        placeholder={placeholder}
        onChange={onInput}
        value={value}
        className="block w-full px-3 py-4 text-base border-2 rounded-lg text-neutral-900 border-primary-100 placeholder-neutral-400 focus:outline-none"
      />

      {type === "password" && value.length > 0 && (
        <span className="absolute p-2 cursor-pointer top-2 right-4">
          {showPassword ? (
            <img src={OpenEye} className="" onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <img src={CloseEye} className=""
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
