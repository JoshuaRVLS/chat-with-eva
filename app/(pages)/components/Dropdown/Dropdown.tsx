"use client";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

const Dropdown = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-scroll className="w-full  border border-borders p-4">
      <div className="flex justify-between items-center">
        <span className="text-xl">{label}</span>
        <FaArrowRight
          className={`size-4 transition cursor-pointer ${
            isOpen && "rotate-90"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
