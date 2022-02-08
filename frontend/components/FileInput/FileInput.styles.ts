import styled, { css } from "styled-components";
import { Theme } from "../../styles/theme";
import { primaryText } from "../../styles/typography";

export type State = "error" | "empty" | "success";

export const StateToColor: Record<State, keyof Theme["colors"]> = {
  empty: "black",
  error: "red",
  success: "green",
};

const IndicatorStyle = css`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 2.5rem;
  top: 2.5rem;
`;

export const EditIndicator = styled.div`
  ${IndicatorStyle};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  display: none;
`;

export const FileInputRoot = styled.div<{ $state: State }>`
  width: 25.2rem;
  height: 25.2rem;
  border-radius: 3.6rem;
  padding: 1.5rem;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border: 1px ${({ $state }) => ($state === "empty" ? "dashed" : "solid")}
    ${({ $state, theme }) => theme.colors[StateToColor[$state]]};

  & input {
    display: none;
  }

  & label {
    ${primaryText};
    color: ${({ theme }) => theme.colors.grey2};
    text-align: center;
    margin-top: 1rem;
  }

  &:hover ${EditIndicator} {
    display: flex;
  }
`;

export const Placeholder = styled.div`
  cursor: pointer;
  background-color: rgba(240, 240, 240, 0.68);
  border-radius: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
`;

export const Indicator = styled.div<{ $state: State }>`
  ${IndicatorStyle};
  border: 1px solid ${({ theme, $state }) => theme.colors[StateToColor[$state]]};
  color: ${({ theme, $state }) => theme.colors[StateToColor[$state]]};
`;

export const ImagePreview = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: auto;
  }
`;
