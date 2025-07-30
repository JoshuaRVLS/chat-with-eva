import React, { useEffect, useRef } from "react";

const Modal = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`bg-black/50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${
        hidden && "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
