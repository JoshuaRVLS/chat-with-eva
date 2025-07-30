import { usePersonaModal } from "@/app/stores/usePersonaModal";
import React, { useEffect, useRef } from "react";

const Modal = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, setIsOpen } = usePersonaModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
