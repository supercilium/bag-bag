import styled from "styled-components"
import { TRANSITION } from "../../styles/constants";
import { ButtonText } from "../ButtonText";

export const SubMenu = styled.div`
  transition: transform ${TRANSITION};
  z-index: 2;
  background-color: #fff;
  display: grid;
  grid-gap: 15px;

  & a {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
  }
`;

export const SubMenuTitle = styled.div`
    padding: 15px 0 0;
`

export const ButtonBack = styled(ButtonText)`
    margin-bottom: 30px;
    padding: 0;

    & svg {
        width: 22px;
        height: 22px;
        transform: rotate(180deg);
    }
`

export const MobileMenuRoot = styled.div<{
    $isOpen: boolean;
    $screenWidth?: number;
    $isOpenSubMenu?: boolean;
}>`
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    top: 0;
    left: 0;
    right: -${({ $screenWidth }) => $screenWidth}px;
    bottom: 0;
    overflow-y: scroll;
    z-index: ${({ $isOpenSubMenu }) => $isOpenSubMenu ? 12 : 10};
  
    & > div {
      padding: 72px 20px 20px;
    }
    
    & menu {
        display: flex;
        padding: 0;
        margin: 0;
        
        & > div {
            padding: 24px 18px;
            flex-basis: ${({ $screenWidth }) => $screenWidth}px;
        }
        & > ${SubMenu} {
            transform: translateX(${({ $isOpenSubMenu, $screenWidth }) => $isOpenSubMenu ? -$screenWidth : 0}px);
    }

}
`;

export const SocialLink = styled.a`
  width: 60px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const MobileMenuFooter = styled.div`
    display: flex;
    justify-content: flex-start;
    
    & > address {
        margin-left: 15px;
        font-size: 18px;
        line-height: 25px;

        & > p {
            margin-bottom: 3px;
            margin-top: 0;

            &:first-child {
                font-weight: 500;
                font-style: normal;
            }
            &:last-child {
                font-weight: 400;
            }
        }
    }
`
