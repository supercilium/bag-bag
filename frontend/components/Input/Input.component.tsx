import React from "react";
import { InputBlock, InputRoot, ErrorMessage } from "./Input.styles";

export interface InputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, "label"> {
  label?: React.ReactNode;
  // labelPosition?: "left" | "right";
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, label, error, placeholder, as, className, ...rest }, ref) => {
    return (
      <InputBlock className={className} $hasError={!!error}>
        {label && <label>{label}</label>}
        <InputRoot
          ref={ref}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputBlock>
    );
  }
);
