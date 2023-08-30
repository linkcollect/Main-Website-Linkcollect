import React, { forwardRef, useContext } from "react";
import { classMerge } from "../../../utils/utils";
import { switchMode } from "../../../hooks/switchMode";

const Chip = forwardRef(({ className, name, ...props },ref) => {
  const {selectedMode} = useContext(switchMode)
  return (
    <div
      className={classMerge(
        `px-2 ${selectedMode === "dark" ? "text-borderPrimary bg-dark-border border-dark-border" : "bg-neutral-200  text-neutral-500 border border-neutral-300"} border  rounded-[24px] text-[10px] sm:text-xs  font-normal h-[18px] w-fit`,
        className
      )}
      {...props}
    >
      {name}
    </div>
  );
});
export default Chip;
