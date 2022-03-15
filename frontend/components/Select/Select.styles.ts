import styled from "styled-components";
import { TRANSITION } from "../../styles/constants";
import { subtitle } from "../../styles/typography";
import Arrow from "../../components/icons/arrow-simple-right.svg";

export const DropDownIcon = styled(Arrow) <{ $isOpen: boolean }>`
  display: block;
  width: 22px;
  height: 22px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(-90deg)" : "rotate(90deg)")};
  transition: transform ${TRANSITION};
  color: ${({ theme }) => theme.colors.black};
`;


export const SelectBlock = styled.div`
  height: 9rem;

   & > label {
    ${subtitle}
  }
`;
