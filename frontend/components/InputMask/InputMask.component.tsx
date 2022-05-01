import React from "react";
import { InputBlock, InputRoot, ErrorMessage } from "./Input.styles";
import ReactInputMask, { Props } from "react-input-mask";

export interface InputMaskProps extends Omit<Props, "label"> {
  label?: React.ReactNode;
  error?: string;
}

export const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <InputBlock className={className} $hasError={!!error}>
        {label && <label>{label}</label>}
        <ReactInputMask {...rest}>
          {(inputProps) => <InputRoot ref={ref} {...inputProps} />}
        </ReactInputMask>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputBlock>
    );
  }
);
