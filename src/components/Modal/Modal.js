import React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      <Dialog
        open={isOpen}
        onClose={onClose}
        as="div"
        className="fixed inset-0 z-10 flex items-center justify-center w-full overflow-y-auto"
      >
        <div className="flex flex-col py-8 text-center">
          <Dialog.Overlay />
        </div>
        {/* edit collection Page */}
        <motion.div
          className="absolute top-0 right-0 flex items-center justify-center w-full h-screen bg-opacity-60 bg-neutral-100 "
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.15,
            },
          }}
        >
          <div className="z-10 w-11/12 sm:w-[416px] bg-neutral-100 border border-neutral-300 py-4 mx-auto rounded-lg">
            {children}
          </div>
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
};

export default Modal;
