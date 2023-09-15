import React from 'react';
import logo from './logo.svg';
import './App.css';
import SchedulPage from './pages/schedulePage';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { SignUpPage } from './pages/signupPage';

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/schedulePage" />} />
                    <Route path="/schedulePage" element={<SchedulPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
