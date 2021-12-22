/* eslint-disable react/display-name */
import React, { forwardRef } from "react"
import { StyledButton } from "./Button.styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $round?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} {...rest}>
        {children}
      </StyledButton>
    )
  }
)
