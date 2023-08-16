import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [major, setMajor] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [signupError, setSignupError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (!position || !department || !major || !employeeId || !email || !username || !password || !confirmPassword) {
            console.log('누락된 정보가 있습니다.');
            return;
        }

        if (password === confirmPassword) {
            console.log('회원가입 성공!');
            setSignupSuccess(true);
            setSignupError(false);
    
            navigate('/signup-complete', {
                state: { userData: { username, position, department, major, employeeId, email } }
            });
        } else {
            console.log('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            setSignupSuccess(false);
            setSignupError(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white text-blue-500">
            <div className="w-80 p-4 border rounded shadow">
                <h1 className="text-2xl font-bold mb-4">회원가입</h1>
                <label htmlFor="position" className="font-semibold text-black block mb-1">
                    직책
                </label>
                <input
                    type="text"
                    id="position"
                    placeholder="직책을 입력해주세요"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="department" className="font-semibold text-black block mt-2 mb-1">
                    부서
                </label>
                <input
                    type="text"
                    id="department"
                    placeholder="부서를 입력해주세요"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="major" className="font-semibold text-black block mt-2 mb-1">
                    학과
                </label>
                <input
                    type="text"
                    id="major"
                    placeholder="학과를 입력해주세요"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="employeeId" className="font-semibold text-black block mt-2 mb-1">
                    교번
                </label>
                <input
                    type="text"
                    id="employeeId"
                    placeholder="교번을 입력해주세요"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="email" className="font-semibold text-black block mt-2 mb-1">
                    이메일
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="username" className="font-semibold text-black block mt-2 mb-1">
                    아이디
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="아이디를 입력해주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="password" className="font-semibold text-black block mt-2 mb-1">
                    비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="confirmPassword" className="font-semibold text-black block mt-2 mb-1">
                    비밀번호 확인
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-1 px-4 border rounded w-full"
                />
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSignUp}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                    >
                        회원가입
                    </button>
                </div>
                {signupError && (
                    <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
                )}
                {signupSuccess && (
                    <p className="text-green-500 text-sm mt-1">회원가입이 성공적으로 완료되었습니다.</p>
                )}

                <div className="flex justify-center mt-2">  
                <Link to="/login" className="text-blue-500 hover:underline mt-2 block">
                    로그인 페이지로 돌아가기
                </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
