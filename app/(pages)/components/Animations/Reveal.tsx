import { motion } from "motion/react";
import React, { Children } from "react";

interface RevealProps {
  children: React.ReactNode;

  delay?: number;
  duration?: number;
  direction?: "down" | "up" | "left" | "right";
}

const Reveal = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
}: RevealProps) => {
  return (
    <motion.div
      className="w-full md:w-fit h-fit"
      initial={{
        opacity: 0,
        y: direction === "down" ? 100 : direction === "up" ? -100 : 0,
        x: direction === "right" ? 100 : direction === "left" ? -100 : 0,
      }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 0.77, 0.47, 0.97],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
