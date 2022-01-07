import Link from "next/link";
import { forwardRef } from "react";
import { StyledButton } from "./ButtonText.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export const ButtonText = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href}>
          <StyledButton ref={ref} {...props} />
        </Link>
      );
    }
    return <StyledButton ref={ref} {...props} />;
  }
);
