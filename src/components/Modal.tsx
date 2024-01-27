import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

// You can define more variants here
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

interface BackdropProps {
  onClick: () => void;
  children: ReactNode;
}

const Backdrop = ({ onClick, children }: BackdropProps) => {
  // Scroll lock the page when modal opens
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";

    // Unlock scroll when component unmount
    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

interface ModalHeaderProps {
  onClose?: () => void;
  children: ReactNode;
}

const Header = ({ onClose, children }: ModalHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center p-4 font-semibold border-b">
      {children}
      {onClose && (
        <button
          type="button"
          className="outline-none ring-0 border-0 rounded-full py-0 px-2 hover:outline-none hover:ring-0 hover:border-0 focus:outline-none focus:ring-0 focus:border-0"
          onClick={onClose}
        >
          x
        </button>
      )}
    </div>
  );
};

interface ModalContentProps {
  children: ReactNode;
}

const Content = ({ children }: ModalContentProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 overflow-y-scroll">
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: ReactNode;
}

const Footer = ({ children }: ModalFooterProps) => {
  return (
    <div className="flex flex-row gap-4 justify-end items-center p-4 border-t">
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
