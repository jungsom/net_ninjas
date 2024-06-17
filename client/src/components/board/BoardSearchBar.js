import InputBox from '../InputBox';
import styled from 'styled-components';
import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';

function BoardSearchBar() {
  const [hashtag, setHashtag] = useState('');
  console.log(new Date());
  return (
    <BoardSearchLayout>
      <div>
        <h4>
          <strong>동잇스타그램</strong>
        </h4>
        <div>동네 사진을 올려주세요!</div>
      </div>
      <SearchInputBox>
        <Search />
        <InputBox
          name='boardSearch'
          value={hashtag}
          placeholder='해시태그 검색'
          onChange={(e) => setHashtag(e.target.value)}
        />
      </SearchInputBox>
    </BoardSearchLayout>
  );
}

const BoardSearchLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const SearchInputBox = styled.div``;

export default BoardSearchBar;
