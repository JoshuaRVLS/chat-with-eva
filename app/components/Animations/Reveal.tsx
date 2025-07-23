import { motion } from "motion/react";
import React, { Children } from "react";

interface RevealProps {
  children: React.ReactNode;

  delay?: number;
  duration?: number;
}

const Reveal = ({ children, delay = 0, duration = 0.5 }: RevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
