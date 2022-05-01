import React from "react";
import {
  InputBlock,
  InputRoot,
  ErrorMessage,
  IconContainer,
} from "./Input.styles";

export interface InputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, "label"> {
  label?: React.ReactNode;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, label, error, placeholder, as, className, icon, ...rest }, ref) => {
    return (
      <InputBlock className={className} $hasError={!!error}>
        {label && <label>{label}</label>}
        <InputRoot
          ref={ref}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
        {icon && <IconContainer>{icon}</IconContainer>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputBlock>
    );
  }
);
