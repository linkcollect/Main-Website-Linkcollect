import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { classMerge } from "../../../utils/utils";
import OpenEye from '../../../assets/openEye.svg'
import CloseEye from '../../../assets/hiddenEye.svg'

const inputVariants = cva(
  ' block focus:outline-none text-base placeholder-neutral-400 text-neutral-900 ',
  {
    variants:{
       variant:{
        default: " border-2 rounded-lg border-primary-100 ",
        primary: " border-2 rounded-lg border-primary-200 ",
       },
       size:{
        default:" w-full px-3 py-4 "
       }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
  }
);

const Input = forwardRef(({ isFocused, hasError,className,type,value,...props }) => {
  const variant = hasError && !isFocused  ? "default" : "primary"   
  const [showPassword, setShowPassword] = useState(false);
  useMemo(() => {
    if (value.length === 0 && type === "password") {
      setShowPassword(false);
    }
  }, [value]);

  return (
    <div className="relative">
      <input
        type={
          type === "password" ? (!showPassword ? "password" : "text") : type
        }
        required
        value={value}
        {...props}
        className={classMerge(inputVariants(variant,className))}
      />

      {type === "password" && value.length > 0 && (
        <span className="absolute p-2 cursor-pointer top-2 right-4">
          {showPassword ? (
            <img
              src={OpenEye}
              className=""
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <img
              src={CloseEye}
              className=""
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </span>
      )}
    </div>
  );
});

export default Input;
