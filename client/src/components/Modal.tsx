// src/components/ModalPortal.ts
import axios from 'axios';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  border: 4px;
  box-shadow: 1px 1px 4px 4px black;
`;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: black;
  opacity: 0.7;

  z-index: -1;
`;

const ModalPortal = ({ children }: Props) => {
  const el = document.getElementById('modal-root') as HTMLElement;

  return ReactDom.createPortal(
    <ModalContainer>
      <ModalOverlay />
      {children}
    </ModalContainer>,
    el
  );
};

const LoginModal = ({ onClose }: any) => {
  return (
    <div>
      <div>
        <h3>아이디와 비밀번호 모두 입력해주세요.</h3>
        <button type='button' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      로그인을 해주세요
      <button onClick={() => setIsModalOpen(true)}>로그인하기</button>
      {isModalOpen && (
        <ModalPortal>
          <Feed {...feedItem} />
        </ModalPortal>
      )}
    </div>
  );
};

const feedData = [
  {
    id: 1,
    name: '테스트 피드',
    content: '피드 내용입니다.'
  }
];

const Gallery = () => {
  const [feedModalInfo, setFeedModalInfo] = useState({
    isOpen: false
  });

  const onClickFeedItem = (feedItem) => {
    setFeedModalInfo({
      isOpen: true,
      ...feedItem
    });
  };

  const onClose = () => {
    setFeedModalInfo({ isOpen: false });
  };

  return (
    <>
      {feedData.map((feedItem) => {
        <Feed {...feedItem} onClick />;
      })}
      {isModalOpen && (
        <ModalPortal>
          <Feed {...selectedFeedItem} onClose />
          // 피드 모달
        </ModalPortal>
      )}
    </>
  );
};

export default ModalPortal;
