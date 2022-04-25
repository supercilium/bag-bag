import styled from "styled-components"

export const Backdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  background-color: rgba(255, 255, 255, .1);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 50px;
  }
`