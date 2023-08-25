import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { classMerge } from "../../../utils/utils";

const ButtonVariants = cva(
  " flex w-full items-center justify-center cursor-pointer gap-2",
  {
    variants: {
      variant: {
        primary: " bg-primary-500 text-white ",
        primaryOutlined:
          " bg-neutral-100 border-2 border-primary-500 text-primary-500 ",
        secondaryOutline: "bg-neutral-100 border border-neutral-300 text-neutral-700",
        error: " bg-error-500 text-white ",
        errorOutlined:
          " bg-neutral-200 border-2 border-error-500 text-error-500 ",
        disabled: " bg-neutral-400 text-white cursor-not-allowed ",
        loading: " bg-primary-200 text-white cursor-not-allowed ",
      },
      size: {
        default:
          " h-12 rounded-xl px-3 py-6 px-3 py-6 font-medium text-[16px] ",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = forwardRef(
  ({
    className,
    size,
    variant: buttonVariant,
    disabled,
    isLoading,
    ...props
  },ref) => {
   
    const variant =
      !disabled && !isLoading
        ? buttonVariant
        : disabled
        ? "disabled"
        : "loading";
    return (
      <button
        className={classMerge(ButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

export default Button;
