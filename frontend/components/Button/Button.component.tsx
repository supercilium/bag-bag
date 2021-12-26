/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $round?: boolean;
  $size?: "s" | "m" | "l";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, $size = "m", ...rest }, ref) => {
    return (
      <StyledButton ref={ref} $size={$size} {...rest}>
        {children}
      </StyledButton>
    );
  }
);
