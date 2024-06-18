import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const isEmailEmpty = email === '';
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
      password
    );
  const isPasswordSame = password == confirmPassword;
  const isNameEmpty = name === '';
  const isFormValid =
    !isEmailEmpty &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    !isNameEmpty;

  const navigate = useNavigate();

  // handleSubmit 함수 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password, name: name };
    const bodyData = JSON.stringify(data);
    try {
      const response = await axios.post(
        'http://localhost:8080/user/register',
        bodyData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      navigate('/user/login'); // 회원가입 성공하면 로그인 페이지로 이동
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='w-25'>
      <h1>회원가입</h1>
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
        {!isEmailEmpty && !isEmailValid && (
          <Form.Text className='text-danger'>
            유효한 이메일 형식이 아닙니다.
          </Form.Text>
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
        {!isPasswordValid && (
          <Form.Text className='text-danger'>
            비밀번호는 8자 이상이고 특수문자를 포함해야 합니다.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!isPasswordSame && (
          <Form.Text className='text-danger'>
            비밀번호가 일치하지 않습니다.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicName'>
        <Form.Label>이름</Form.Label>
        <Form.Control
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isNameEmpty && (
          <Form.Text className='text-danger'>이름을 입력하세요.</Form.Text>
        )}
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        className='mt-4'
        disabled={!isFormValid && true}
      >
        회원가입
      </Button>
    </Form>
  );
}
