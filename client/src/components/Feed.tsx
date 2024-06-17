// title, content, comment, imgbox

import axios from 'axios';
import React, { ReactNode } from 'react';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const FeedContainer = ({
  children,
  feedId
}: {
  children: ReactNode;
  feedId: number;
}) => {
  return (
    <FeedContext.Provider value={{ feedId }}>
      <Container>{children}</Container>;
    </FeedContext.Provider>
  );
};

const FeedPopover = () => {
  const { feedId } = useContext(feedContext);

  const onEditClick = () => {
    // axios.put(`/feed/${feedId}`,{title:'모시꺵이'})
  };

  const onRemoveClick = () => {
    // axios.delete(`/feed/${feedId})
  };

  return (
    <div>
      <div>편집</div>
      <div>삭제</div>
    </div>
  );
};

const FeedImgBox = ({ src }) => {
  return (
    <Container>
      <img src={src} alt='피드 이미지' />
    </Container>
  );
};

const FeedContent = ({ children }) => {
  return <Container>{children}</Container>;
};

const FeedComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/comments/${feedId}`).then((res) => setComments(res.data));
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <>
          {comment.author}
          {comment.description}
          {comment.createdAt}
        </>
      ))}
    </>
  );
};

const ImgContainer = styled.div`
  width: 32px;
  height: 32px;
`;

const Container = styled.div`
  width: 300px;
  height: 250px;
`;

const Feed = Object.assign(FeedContainer, {
  Popover: FeedPopover,
  Image: FeedImgBox,
  Content: FeedContent,
  Comments: FeedComments
});

export default Feed;
