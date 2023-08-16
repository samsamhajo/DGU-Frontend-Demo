import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleLogin = () => {
        // 간단한 가상의 로그인 검증
        if (username === 'admin' && password === 'admin123') {
            // 로그인 성공 시 처리
            console.log('로그인 성공!');
            setLoginError(false);
        } else {
            // 로그인 실패 시 처리
            console.log('로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.');
            setLoginError(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white text-blue-500 flex-col">
            <h1 className="text-4xl font-bold mb-4">DGU</h1>
            <div className="flex flex-col space-y-4">
                <label htmlFor="username" className="font-semibold text-black">
                    아이디
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="아이디를 입력해주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="py-2 px-4 border rounded w-80 mb-2"
                />
                <label htmlFor="password" className="font-semibold text-black">
                    비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 px-4 border rounded w-80 mb-2"
                />

<button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200 w-80"
                >
                    로그인
                </button>
                {loginError && (
                    <p className="text-red-500 text-sm">사용자 이름 또는 비밀번호가 잘못되었습니다.</p>
                )}
                
                <div className="flex justify-center w-80"> {/* 중앙 정렬 및 넓이 설정을 위한 스타일 추가 */}
                    <Link to="/signup" className="bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200 text-center w-full">
                        회원가입
                    </Link>
                </div>
                
                <Link to="/" className="text-blue-500 hover:underline mt-2">
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
};
export default LoginPage;



