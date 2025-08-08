import React, { forwardRef } from "react";

interface DialogProps {
  closeModal: () => void;
  children?: React.ReactNode;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ closeModal, children }, ref) => {
    return (
      <dialog ref={ref}>
        <h1>Dialog</h1>
        {children}
        <button onClick={closeModal}>Close</button>
      </dialog>
    );
  }
);

export default Dialog;
