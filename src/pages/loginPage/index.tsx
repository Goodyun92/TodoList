import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom';
import { UserType } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`;

const Title = styled.div`
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    margin-bottom: 40px;
`;
const Input = styled.input`
    width: 350px;
    height: 30px;
    margin: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #eeecec;
    font-size: 15px;
    font-weight: 600;
`;
const LoginButton = styled.button`
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

const SignupButton = styled.button`
    width: 60px;
    height: 30px;
    margin: 10px;
    background-color: #ffffff;
    cursor: pointer;
    border: none;
    border-bottom: 1.5px solid #000000;
    font-size: 13px;
    font-weight: 500;
`;

export const LoginPage = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useRecoilState<UserType>(userState);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        console.log('login try');

        try {
            const response = await axios.get('https://www.mytodo.shop/api/users/log-in', {
                params: {
                    userName: userName,
                    password: password,
                },
            });

            console.log(response.data);

            setUserInfo({
                userId: response.data,
                userName: userName,
                password: password,
            });

            navigate('/schedulePage');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container>
            <Title>Easy Calendar</Title>
            <Input type="text" placeholder="ID" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton onClick={login}>Login</LoginButton>
            <SignupButton onClick={() => navigate('/signup')}>Sign Up</SignupButton>
        </Container>
    );
};
