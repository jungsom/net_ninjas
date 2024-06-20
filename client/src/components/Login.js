import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import baseAxios from './shared/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailEmpty = email === '';
  const isPasswordEmpty = password === '';
  const isFormValid = !isEmailEmpty && !isPasswordEmpty;

  const navigate = useNavigate();

  // handleSubmit 함수 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const bodyData = JSON.stringify(data);
    try {
      const response = await baseAxios.post('/user/login', bodyData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(response);
      navigate('/'); // 회원가입 성공하면 home 페이지로 이동
    } catch (e) {
      // console.error(e.response.data);
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='w-25'>
      <h1>로그인</h1>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type='email'
          placeholder='abc@example.com'
          autoComplete='off'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmailEmpty && (
          <Form.Text className='text-danger'>이메일을 입력하세요.</Form.Text>
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordEmpty && (
          <Form.Text className='text-danger'>비밀번호를 입력하세요.</Form.Text>
        )}
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        className='mt-4'
        disabled={!isFormValid && true}
      >
        로그인
      </Button>
    </Form>
  );
}
