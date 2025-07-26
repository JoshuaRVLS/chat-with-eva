"use client";

import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    (async () => {
      const scroll = new LocomotiveScroll({
        autoResize: true,
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        },
      });
    })();
  }, []);

  return children;
};

export default ScrollProvider;
