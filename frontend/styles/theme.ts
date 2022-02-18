import { DefaultTheme } from "styled-components"

const colors = {
  black: "#1D1D1B",
  brown: "#2D2A26",
  grey: "#646465",
  grey2: "#878686",
  grey3: "#C2C2C2",
  grey4: "F1F1F1",
  greyLight: "#E5F0F3",
  white: "#FFFFFF",
  green: "#005951",
  greenLight: "#E5F0F3",
  pink: "#DBB7BB",
  pinkLight: "#F2DCDE",
  red: "#E63A4D",
} as const

export interface Theme {
  colors: typeof colors
}

export const THEME: Theme = {
  colors: colors,
}
