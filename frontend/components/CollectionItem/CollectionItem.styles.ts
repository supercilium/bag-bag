import styled from "styled-components"
import { primaryText } from "../../styles/typography"

export const CollectionItemRoot = styled.a<{ $halfHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 59.2rem;
  height: ${({ $halfHeight }) => ($halfHeight ? "48rem" : "88.5rem")};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  h4 {
    margin: 3.6rem 0 1.5rem;
    line-height: 130%;
  }
`

export const Tag = styled.span`
  ${primaryText}
  line-height: 110%;
  color: ${({ theme }) => theme.colors.grey};
`
