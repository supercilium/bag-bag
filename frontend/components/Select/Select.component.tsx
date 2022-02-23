import React, { forwardRef, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { SelectBlock, SelectRoot } from "./Select.styles";
import Arrow from "../../components/icons/arrow-simple-right.svg";

export interface SelectProps extends UseFormRegisterReturn {
  label?: ReactNode;
  error?: ReactNode;
  options: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, error, ...rest }, ref) => {
    return (
      <SelectBlock>
        {label && <label>{label}</label>}
        <SelectRoot {...rest} ref={ref}>
          {options}
        </SelectRoot>
        <Arrow />
        {error && <div>{error}</div>}
      </SelectBlock>
    );
  }
);
