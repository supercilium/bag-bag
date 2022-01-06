import { ReactNode, useState } from "react";
import { Content, Icon, InfoBlockContainer, Title } from "./InfoBlock.styles";
import Arrow from "../icons/arrow-simple-right.svg";

export interface InfoBlockProps {
  title: ReactNode;
  content: ReactNode;
  defaultOpened?: boolean;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  content,
  defaultOpened = false,
}) => {
  const [isOpen, setOpenedState] = useState(defaultOpened);
  return (
    <InfoBlockContainer>
      <Title onClick={() => setOpenedState((prev) => !prev)}>
        {title}
        <Icon $isOpen={isOpen}>
          <Arrow />
        </Icon>
      </Title>
      {isOpen && <Content>{content}</Content>}
    </InfoBlockContainer>
  );
};
