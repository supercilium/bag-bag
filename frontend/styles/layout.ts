import styled, { css } from "styled-components"
import { device } from "./constants"
import { buttonText } from "./typography"

export const Container = css`
  width: 100%;
  margin: 0 auto;
  
  @media ${device.laptopL} {
    max-width: 1920px;
  }
`

export const StyledHeader = styled.header<{ $buttonPosition?: 'left' | 'right' }>`
    position: relative;

    h1 {
      display: flex;
      align-items: flex-end;
      color: ${({ theme }) => theme.colors.green};

      i {
          margin-left: 1rem;
        }
      }

      span {
        ${buttonText};
        margin-left: auto;
        color: ${({ theme }) => theme.colors.black};
      }
        
      button {
        max-width: 10rem;
        border: none;
        background: none;
        position: absolute;
        right: ${({ $buttonPosition }) => $buttonPosition === 'left' ? 'auto' : '0'};
        left: ${({ $buttonPosition }) => $buttonPosition === 'right' ? 'auto' : '0'};
        top: 0;
        padding: 0;
        text-align: right;
    }

    @media ${device.laptopL} {
      h1 {
        text-align: center;
        justify-content: center;
      }
      button {
        max-width: none;
        top: 50%;
      }
    }
`

export const Box = styled.div`
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3.6rem;
  display: grid;
  grid-gap: 1.5rem;
  
  @media ${device.laptopL} {
    padding: 6rem;
  }
`

export const MobileVisible = styled.div`
  display: block;

  @media ${device.laptopL} {
    display: none;
  }
`

export const LaptopLVisible = styled.div`
  display: none;

  @media ${device.laptopL} {
    display: block;
  }
`


export const StatusBox = styled.div<{ $status: 'success' | 'error' }>`
  padding: 18px;
  border: 1px solid ${({ theme, $status }) => $status === 'success' ? theme.colors.green : theme.colors.red};
  border-radius: 3.6rem;
  color: ${({ theme, $status }) => $status === 'success' ? theme.colors.green : theme.colors.red};
  font-size: 16px;
  line-height: 120%;
  display: flex;
  gap: 15px;

  @media ${device.laptopL} {
    padding: 6rem;
  }
`