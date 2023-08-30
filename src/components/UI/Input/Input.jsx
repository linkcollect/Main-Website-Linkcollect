import React, { forwardRef, useState, useMemo, useContext } from "react";
import { cva } from "class-variance-authority";
import { classMerge } from "../../../utils/utils";
import OpenEye from "../../../assets/openEye.svg";
import CloseEye from "../../../assets/hiddenEye.svg";
import { switchMode } from "../../../hooks/switchMode";






const Input = forwardRef(
  ({
    isFocused,
    hasError,
    className,
    type,
    value,
    variant: InputVariant,
    ...props
  }, ref) => {

    // getting current selected mode
    const {selectedMode} = useContext(switchMode)
    const inputVariants = cva(
      `block focus:outline-none text-base ${selectedMode === "dark"? "placeholder:text-dark-placeholder text-neutral-200":"placeholder:text-neutral-500 text-neutral-900"}  border-2 rounded-lg`,
      {
        variants: {
          variant: {
            default: "border-primary-100 bg-neutral-50",
            primary: "border-primary-200 bg-neutral-50",
            secondary: "border-neutral-300 bg-neutral-50",
            file: `text-sm border-2 border-primary-200 rounded-md
                     file:mr-4 file:py-0 file:px-4 file:py-1
                      file:rounded-full file:border-2 file:border-nutral-900
                      file:text-[16px] file:font-light
                        file:bg-secodary file:text-primary
                        hover:file:bg-violet-100
                        file:cursor-pointer
          `,
            darkDefault: "border-dark-secondary bg-dark-primary",
            darkPrimary: "border-dark-secondary bg-dark-primary",
            darkSecondary: "border-dark-secondary bg-dark-primary",
            darkFile: `text-sm border-2 border-primary-200 rounded-md
                     file:mr-4 file:py-0 file:px-4 file:py-1
                      file:rounded-full file:border-2 file:border-nutral-900
                      file:text-[16px] file:font-light
                        file:bg-secodary file:text-primary
                        hover:file:bg-violet-100
                        file:cursor-pointer
          `,
          },
          size: {
            default: " w-full px-3 py-3 ",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    );
    const variant =
      type !== "file"
        ? hasError && !isFocused
          ? "default"
          : InputVariant
            ? InputVariant
            : "primary"
        : "file";
    const [showPassword, setShowPassword] = useState(false);
    useMemo(() => {
      if (type !== "file" && value.length === 0 && type === "password") {
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
          className={classMerge(inputVariants({ variant, className }))}
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
  }
);

export const Label = ({ name, htmlFor }) => {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="text-neutral-900 font-normal text-[16px] my-[3px]">
        <p>{name}</p>
      </span>
    </label>
  );
};

export const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      className={classMerge(
        "w-full h-28 px-4 py-3  border-solid border-2 border-primary-200 rounded-[10px] font-normal text-base text-textPrimary resize-none focus:outline-none",
        className
      )}
      {...props}
    />
  );
};

export default Input;
