import React from "react";
import styled from "styled-components";

import AutocompelteInput from "components/AutocompleteInput";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:
        /* top, transparent black, faked with gradient */ linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    /* bottom, image */
      url("https://images.unsplash.com/photo-1547380109-a2fffd5b9036?ixlib=rb-1.2.1&auto=format&fit=crop&w=1824&q=80");
  background-size: cover;
  background-position: center;

  color: #fff;
`;

const ContenxtBox = styled.div`
  width: 80%;
  max-width: 1000px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;

  @media (min-width: 1200px) {
    font-size: 46px;
  }
`;

const Description = styled.p`
  margin-bottom: 10px;

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const MainView = () => (
  <Wrapper>
    <ContenxtBox>
      <Heading>Unsplash</Heading>
      <Description>The internet’s source of freely-usable images.</Description>
      <Description>Powered by creators everywhere.</Description>
      <AutocompelteInput />
    </ContenxtBox>
  </Wrapper>
);

export default MainView;
