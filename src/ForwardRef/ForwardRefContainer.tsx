import { useEffect, useRef, useState } from "react";

import Form from "./Form";
import Dialog from "./Dialog";

function ForwardRefContainer() {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeModal() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.close();
    setName("");
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.showModal();
  };

  return (
    <div>
      <Form
        ref={inputRef}
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
      />
      <Dialog ref={dialogRef} closeModal={closeModal}>
        <p>Hello, {name}!</p>
      </Dialog>
    </div>
  );
}

export default ForwardRefContainer;
