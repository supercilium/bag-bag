import React, { forwardRef, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectProps extends UseFormRegisterReturn {
  label?: ReactNode;
  error?: ReactNode;
  options: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, ...rest }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <select {...rest} ref={ref}>
          {options}
        </select>
        {error && <div>{error}</div>}
      </div>
    );
  }
);
