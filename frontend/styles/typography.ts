import styled, { css } from "styled-components"

export const buttonText = css`
  font-weight: 500;
  font-size: 5.7rem;
  line-height: 6.8rem;
`

export const excretions = css`
  font-weight: 500;
  font-size: 4.2rem;
  line-height: 100%;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

export const subtitle = css`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

export const primaryText = css`
  font-weight: normal;
  font-size: 1.8rem;
  line-height: 150%;
`

export const signatureText = css`
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 80%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

export const PreviousPrice = styled.span`
  color: ${({ theme }) => theme.colors.pink};
  text-decoration-line: line-through;
`