import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            alert('Signup Successful');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
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
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
};
