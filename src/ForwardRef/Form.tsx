import { FormEventHandler, forwardRef } from "react";

interface FormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  name: string;
  setName: (name: string) => void;
}

const Form = forwardRef<HTMLInputElement, FormProps>(
  ({ handleSubmit, name, setName }, ref) => {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={ref}
          type="text"
          id="name"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
);

export default Form;
