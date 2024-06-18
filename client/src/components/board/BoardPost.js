import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

function BoardPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasgtag, setHashtag] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(true);

  const handleSubmit = async () => {
    try {
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <Button
          variant='primary'
          title='닫기'
          onClick={() => setIsOpenModal(false)}
        >
          닫기
        </Button>
        <Button
          variant='primary'
          title='제출'
          type='submit'
          form='postBoard'
          onSubmit={handleSubmit}
        >
          작성하기
        </Button>
      </FormHeader>
      <form id='postBoard'>
        <input
          type='text'
          placeholder='제목을 입력해주세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder='내용을 입력해주세요.'
          maxLength={1000}
          required
        />
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 540px;
  input {
    border: none;
    font-size: 32px;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  textarea {
    border: none;
    width: 100%;
    height: 500px;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default BoardPost;
