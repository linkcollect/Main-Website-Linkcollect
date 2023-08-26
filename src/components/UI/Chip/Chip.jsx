import React, { forwardRef } from "react";
import { classMerge } from "../../../utils/utils";

const Chip = forwardRef(({ className, name, ...props },ref) => {
  return (
    <div
      className={classMerge(
        "px-2 bg-neutral-200  text-neutral-500 border border-neutral-300  rounded-[24px] text-[10px] sm:text-xs  font-normal h-[18px] w-fit",
        className
      )}
      {...props}
    >
      {name}
    </div>
  );
});
export default Chip;
