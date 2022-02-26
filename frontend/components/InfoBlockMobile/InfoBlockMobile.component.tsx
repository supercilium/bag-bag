import { ReactNode, useState } from "react";
import {
  Border,
  Content,
  InfoBlockContainer,
  Title,
} from "./InfoBlockMobile.styles";
import Plus from "../icons/plus.svg";
import Minus from "../icons/minus.svg";

export interface InfoBlockProps {
  title: ReactNode;
  content: ReactNode;
  defaultOpened?: boolean;
}

export const InfoBlockMobile: React.FC<InfoBlockProps> = ({
  title,
  content,
  defaultOpened = false,
}) => {
  const [isOpen, setOpenedState] = useState(defaultOpened);
  return (
    <InfoBlockContainer>
      <Title onClick={() => setOpenedState((prev) => !prev)}>{title}</Title>
      {isOpen && <Content>{content}</Content>}
      <Border onClick={() => setOpenedState((prev) => !prev)}>
        <hr />
        {isOpen ? <Minus /> : <Plus />}
      </Border>
    </InfoBlockContainer>
  );
};
