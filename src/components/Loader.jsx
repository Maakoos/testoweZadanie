import React from "react";
import styled, { css, keyframes } from "styled-components";

const wave = keyframes`
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  backdrop-filter: blur(20px);
  z-index: 100;
`;

const Dot = styled.div`
  position: relative;
  width: 2em;
  height: 2em;
  margin: 0.8em;
  background: ${({ color }) => color};
  border-radius: 50%;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;

    ${({ animationDelay }) =>
      animationDelay &&
      css`
        background-color: inherit;
        animation: ${wave} 2s ${animationDelay}s ease-out infinite;
      `}
  }
`;

const Loader = () => (
  <Wrapper class="loading">
    <Dot class="dot" color={"#7ef9ff"} animationDelay={0.2}></Dot>
    <Dot class="dot" color={"#89cff0"} animationDelay={0.4}></Dot>
    <Dot class="dot" color={"#4682b4"} animationDelay={0.6}></Dot>
    <Dot class="dot" color={"#0f52ba"} animationDelay={0.8}></Dot>
    <Dot class="dot" color={"#000080"} animationDelay={1}></Dot>
  </Wrapper>
);

export default Loader;
