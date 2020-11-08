import React, { useContext } from "react";
import styled from "styled-components";

import AppContext from "context/AppContext";

const TagBtn = styled.button`
  margin-right: 10px;
  padding: 3px 5px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const TagButton = ({ title }) => {
  const { searchPhoto, setValue } = useContext(AppContext);

  const searchPhotosFromTagname = (e) => {
    window.scrollTo(0, 0);
    setValue(e.target.value);
    searchPhoto(e, e.target.value);
  };
  return (
    <TagBtn value={title} onClick={searchPhotosFromTagname}>
      {title}
    </TagBtn>
  );
};

export default TagButton;
