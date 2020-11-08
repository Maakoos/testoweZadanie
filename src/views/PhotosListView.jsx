import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Macy from "macy";

import AppContext from "context/AppContext";

import PhotoItem from "components/PhotoItem";
import AutocompelteInput from "components/AutocompleteInput";

import noRestulImg from "assets/icons/noResult.png";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 50px 0;
  max-width: 1245px;
  overflow-anchor: none;
`;

const WantedPhotoName = styled.h1`
  margin: 20px 0;
  text-transform: capitalize;
  z-index: -1;

  @media (min-width: 1200px) {
    font-size: 46px;
  }
`;

const PhotosList = styled.ul`
  margin-top: 40px;
  list-style: none;
`;

const LoadMoreButton = styled.button`
  align-self: center;
  position: relative;
  padding: 10px 20px;
  background-color: #ddd;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #777;
    color: #ddd;
  }
`;

const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoResultImg = styled.img`
  width: 50%;
`;

const NoResultInfo = styled.span`
  font-size: 20px;
`;

const PhotosListView = () => {
  const {
    photosList,
    fetchMorePhotos,
    headingValue,
    showLoadMoreBtn,
  } = useContext(AppContext);

  const renderLoadButton = showLoadMoreBtn ? (
    <LoadMoreButton onClick={fetchMorePhotos}>Load More</LoadMoreButton>
  ) : null;

  const renderNoInfoMessage = !photosList.length ? (
    <NoResultBox>
      <NoResultImg src={noRestulImg} alt="" />
      <NoResultInfo>No Result</NoResultInfo>
    </NoResultBox>
  ) : null;

  useEffect(() => {
    const macy = new Macy({
      container: ".container",
      trueOrder: false,
      waitForImages: false,
      margin: 24,
      columns: 3,
      breakAt: {
        768: 3,
        520: 2,
        400: 1,
      },
    });
  }, [photosList]);

  return (
    <Wrapper>
      <AutocompelteInput listViev />
      <WantedPhotoName>{headingValue}</WantedPhotoName>
      <PhotosList className="container">
        {photosList?.map((photo) => (
          <PhotoItem key={photo.id} {...photo} />
        ))}
      </PhotosList>
      {renderLoadButton}
      {renderNoInfoMessage}
    </Wrapper>
  );
};

export default PhotosListView;
