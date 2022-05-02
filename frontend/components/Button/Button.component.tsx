/* eslint-disable react/display-name */
import Link from "next/link";
import React, { forwardRef } from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $round?: boolean;
  $size?: "s" | "m" | "l";
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, $size = "m", href, ...rest }, ref) => {
    if (href) {
      return (
        <Link href={href} passHref>
          <StyledButton ref={ref} $size={$size} {...rest}>
            {children}
          </StyledButton>
        </Link>
      );
    }
    return (
      <StyledButton ref={ref} $size={$size} {...rest}>
        {children}
      </StyledButton>
    );
  }
);
