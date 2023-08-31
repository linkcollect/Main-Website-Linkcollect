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
        darkOutlined: "border-dark-border border bg-dark-primary text-borderPrimary",
      },
      size: {
        default:
          " h-10 rounded-md px-3 py-4 font-medium text-[1rem]",
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
