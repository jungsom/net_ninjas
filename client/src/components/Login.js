import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailEmpty = email === '';
  const isPasswordEmpty = password === '';
  const isFormValid = !isEmailEmpty && !isPasswordEmpty;

  // handleSubmit 함수 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const bodyData = JSON.stringify(data);
    console.log(bodyData);
    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        bodyData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.response.data);
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
