import React, { forwardRef, useContext } from "react";
import { cva } from "class-variance-authority";
import { classMerge } from "../../../utils/utils";
import { switchMode } from "../../../hooks/switchMode";

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
        darkOutlined: "border-dark-secondary border bg-dark-primary text-borderPrimary",
        darkDisabled: "bg-dark-secondary text-dark-placeholder"
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
  }, ref) => {
    // getting current selected mode
    const { selectedMode } = useContext(switchMode)

    // checking if it is a login page as not to show dark mode in login page for now
    // keeping normal styles for login page
    const urlParams = window?.location?.href?.split('/')
    const currentPage = urlParams[urlParams.length - 1]
    const variant =
      !disabled && !isLoading
        ? buttonVariant
        : disabled
          ? currentPage === 'login' ? "disabled" : selectedMode === "light" ? "disabled" : "darkDisabled"
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
