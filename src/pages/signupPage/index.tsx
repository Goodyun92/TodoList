import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`;

const Title = styled.div`
    width: 330px;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 40px;
    div {
        margin-top: 10px;
    }
`;
const Input = styled.input`
    width: 330px;
    height: 30px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #eeecec;
    font-size: 15px;
    font-weight: 600;
`;
const SignupButton = styled.button`
    width: 130px;
    height: 35px;
    margin: 10px;
    margin-top: 170px;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 5px;
    background-color: black;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
`;

export const SignUpPage = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        try {
            await axios.post('https://www.mytodo.shop/api/users/sign-up', {
                userName: userName,
                password: password,
            });

            alert('회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (error: any) {
            console.error('Signup failed:', error.response.data);
            alert('입력하신 ID가 이미 존재합니다.');
        }
    };

    return (
        <Container>
            <Title>
                <div>회원가입을 위해</div>
                <div>아이디와 비밀번호를 입력해주세요</div>
            </Title>
            <Input type="text" placeholder="ID" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SignupButton onClick={signUp}>Sign Up</SignupButton>
        </Container>
    );
};
