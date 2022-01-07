import { forwardRef } from "react";
import { RadioInputRoot } from "./RadioButton.styles";

export interface RadioButtonProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText: React.ReactNode;
  error?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ labelText, name, error, id, ...rest }, ref) => {
    return (
      <RadioInputRoot hasError={!!error}>
        <input type="radio" ref={ref} name={name} id={id} {...rest} />
        <label htmlFor={id}>{labelText}</label>
        <span>{error && error}</span>
      </RadioInputRoot>
    );
  }
);
