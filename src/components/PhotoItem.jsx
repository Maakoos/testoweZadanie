import React, { useContext } from "react";
import styled from "styled-components";

import AppContext from "context/AppContext";

import TagButton from "components/TagButton";

import zoomInIcon from "assets/icons/zoom-in.png";

const Wrapper = styled.li`
  display: inline-block;
  margin: 0 0 20px;
  width: 100%;
`;

const PhotoImg = styled.img`
  width: 100%;
  cursor: url(${zoomInIcon}), auto;
`;

const TagsBox = styled.div`
  margin-top: 10px;
`;

const PhotoItem = ({
  description,
  alt_description,
  id,
  tags,
  urls: { regular },
}) => {
  const { openModal } = useContext(AppContext);

  return (
    <Wrapper>
      <PhotoImg
        src={regular}
        alt={description ?? alt_description}
        onClick={() => openModal(id)}
      />
      <TagsBox>
        {tags.map((tag) => (
          <TagButton key={tag.title} title={tag.title} />
        ))}
      </TagsBox>
    </Wrapper>
  );
};

export default PhotoItem;
