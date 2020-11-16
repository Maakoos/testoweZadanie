import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import AppContext from "context/AppContext";

import closeIcon from "assets/icons/close.svg";
import placeMarkIcon from "assets/icons/placeMark.png";

const BlurBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 11;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  width: 100vw;
  background-color: #fff;
  border-radius: 5px;
  z-index: 999;

  @media (orientation: landscape) {
    max-height: 100vh;
    max-width: 100vw;
  }

  @media (min-width: 768px) {
    padding: 20px;
    width: auto;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfoBox = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  margin-right: 15px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-size: 15px;
`;

const ProfileName = styled.p`
  color: #767676;
  font-size: 11px;
`;

const MainImg = styled.img`
  align-self: center;
  display: block;
  margin: 15px 0;
  max-height: 80vh;
  max-width: 100%;

  @media (min-width: 768px) {
    max-width: none;
  }
`;

const ModalFooter = styled.div`
  font-size: 13px;
`;

const Place = styled.p`
  display: flex;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background: url(${placeMarkIcon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const Description = styled.p`
  padding-left: 20px;
  color: #767676;
`;

const CloseModalButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  background-image: url(${closeIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

const PhotoModal = () => {
  const {
    closeModal,
    photoInModal: {
      alt_description,
      description,
      urls: { regular },
      user: {
        name,
        location,
        username,
        profile_image: { small },
      },
    },
  } = useContext(AppContext);

  const modalRef = useRef();
  const closeBtnRef = useRef();

  const closeModaIfClickAway = (e) => {
    const isClickInside = modalRef?.current.contains(e.target);
    if (!isClickInside || e.target === closeBtnRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeModaIfClickAway);

    return () => {
      window.removeEventListener("click", closeModaIfClickAway);
    };
  });

  return (
    <>
      <BlurBg />
      <Wrapper ref={modalRef}>
        <ModalHeader>
          <ProfileInfoBox>
            <ProfileImage src={small} alt={username} />
            <div>
              <UserName>{name}</UserName>
              <ProfileName>@{username}</ProfileName>
            </div>
          </ProfileInfoBox>
          <CloseModalButton ref={closeBtnRef} />
        </ModalHeader>
        <MainImg src={regular} alt={description ?? alt_description} />
        <ModalFooter>
          <Place>{location ?? "unknown"}</Place>
          <Description>{description ?? alt_description}</Description>
        </ModalFooter>
      </Wrapper>
    </>
  );
};

export default PhotoModal;
