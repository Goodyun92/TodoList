import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom';
import { UserType } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <input type="text" placeholder="아이디" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
};
