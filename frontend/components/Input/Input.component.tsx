import { InputBlock, InputRoot } from "./Input.styles"

export interface InputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, "label"> {
  label?: React.ReactNode
  labelPosition?: "left" | "right"
  error?: string
}

export const Input: React.FC<InputProps> = ({
  value,
  label,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <InputBlock>
      {label && <label>{label}</label>}
      <InputRoot value={value} placeholder={placeholder} />
      {error && <div>{error}</div>}
    </InputBlock>
  )
}
