import { useContext } from 'react';
import BoardContext from './BoardContext';
import boardDummyData from './dummyData';
import { Chat, ThreeDots, PlusCircleFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { charMaxLength } from './Util';

function BoardMainPage() {
  //   const { boardContents } = useContext(BoardContext);
  //   console.log(boardContents);
  console.log(boardDummyData);
  return (
    <>
      <BoardContainer>
        {boardDummyData.map((item) => (
          <ArticleContainer key={item.boardId}>
            <ArcticleHeader>
              <AuthorInformation>
                <div>프로필 이미지</div>
                <div>{item.nickname}</div>
                <div>5분 전</div>
              </AuthorInformation>
              <div>
                <ThreeDots />
              </div>
            </ArcticleHeader>
            <hr />
            <ArcticleTitle>{item.title}</ArcticleTitle>
            <ContentImage>
              <img src='./img/recommend/jungu00.jpg' />
            </ContentImage>
            <hr />
            <LikesAndComments>
              <div>
                <img
                  src='./img/heart-black.png'
                  style={{ width: '20px', height: '20px' }}
                />{' '}
                {item.likes?.length ?? 0}
              </div>
              <div>
                <Chat size={20} /> {item.comments?.length ?? 0}
              </div>
            </LikesAndComments>
            <Content>{charMaxLength(item.content)}</Content>
            <Hashtag>
              {item.hashtag.map((hashtag) => (
                <span>#{hashtag}</span>
              ))}
            </Hashtag>
          </ArticleContainer>
        ))}
      </BoardContainer>
      <PostButton>
        <PlusCircleFill size={60} />
      </PostButton>
    </>
  );
}

const BoardContainer = styled.div`
  /* 보드 전체를 감싸는 Container */
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  place-items: center;
`;

const ArticleContainer = styled.div`
  /* 게시글 전체를 감싸는 Container */
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 380px;
  height: 550px;
  overflow: hidden;
  hr {
    background: #aaa;
    height: 1px;
    border: 0;
  }
`;

const ArcticleHeader = styled.div`
  /* 게시글 Header (프로필 이미지, 닉네임, 시간, 드롭 메뉴 버튼) */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px;
  margin-top: 10px;
  font-size: 13px;
`;

const AuthorInformation = styled.div`
  /* Header 중 프로필 이미지, 닉네임, 시간 */
  display: flex;
  gap: 5px;
`;

const ArcticleTitle = styled.div`
  /* 게시글 제목 */
  font-weight: bold;
  padding: 0 10px 10px 10px;
  font-size: 15px;
`;

const ContentImage = styled.div`
  /* 게시글 이미지 */
  text-align: center;
  img {
    border-radius: 4px;
    width: 364px;
    height: 243px;
  }
`;

const LikesAndComments = styled.div`
  /* 좋아요, 댓글 이미지, 수 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
`;

const Content = styled.div`
  /* 게시글 내용 */
  padding: 10px;
  font-size: 13px;
`;

const Hashtag = styled.div`
  /* 해시태그 */
  span {
    padding: 0 0 0 10px;
    font-size: 12px;
  }
`;

const PostButton = styled.button`
  /* 글 작성 버튼 */
  border: none;
  background: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

export default BoardMainPage;
