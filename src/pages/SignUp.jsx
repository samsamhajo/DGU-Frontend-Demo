import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        confirmPassword: '',
        position: '',
        department: '',
        major: '',
        employeeId: '',
        username: '',
        email: '',
    });

    const [signupError, setSignupError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignUp = () => {
        const { userid, password, confirmPassword, position, department, major, employeeId, username, email } = formData;

        if (!userid || !password || !confirmPassword || !position || !department || !major || !employeeId || !username || !email) {
            console.log('누락된 정보가 있습니다.');
            return;
        }

        if (password === confirmPassword) {
            // 회원 정보를 객체로 저장
            const userData = {
                userid,
                position,
                department,
                major,
                employeeId,
                username,
                email,
            };

            // 기존 사용자 정보 불러오기
            const storedUserData = localStorage.getItem('userList');
            const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];

            // 새로운 사용자 정보 추가
            parsedUserData.push(userData);

            // 사용자 정보를 localStorage에 저장
            localStorage.setItem('userList', JSON.stringify(parsedUserData));

            console.log('회원가입 성공!');
            setSignupSuccess(true);
            setSignupError(false);

            navigate('/signup-complete');
        } else {
            console.log('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
            setSignupSuccess(false);
            setSignupError(true);
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-white text-blue-500">
            <div className="w-80 p-4 border rounded shadow max-w-full">
                <h1 className="text-2xl font-bold mb-4">회원가입</h1>

                <label htmlFor="position" className="font-semibold text-black block mb-1">
                    직책
                </label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    placeholder="직책을 입력해주세요"
                    value={formData.position}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="department" className="font-semibold text-black block mt-2 mb-1">
                    부서
                </label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="부서를 입력해주세요"
                    value={formData.department}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="major" className="font-semibold text-black block mt-2 mb-1">
                    학과
                </label>
                <input
                    type="text"
                    id="major"
                    name="major"
                    placeholder="학과를 입력해주세요"
                    value={formData.major}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="employeeId" className="font-semibold text-black block mt-2 mb-1">
                    교번
                </label>
                <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    placeholder="교번을 입력해주세요"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="username" className="font-semibold text-black block mt-2 mb-1">
                    이름
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="이름을 입력해주세요"
                    value={formData.username}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="email" className="font-semibold text-black block mt-2 mb-1">
                    이메일
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="userid" className="font-semibold text-black block mt-2 mb-1">
                    아이디
                </label>
                <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="아이디를 입력해주세요"
                    value={formData.userid}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="password" className="font-semibold text-black block mt-2 mb-1">
                    비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                    className="py-1 px-4 border rounded w-full"
                />
                <label htmlFor="confirmPassword" className="font-semibold text-black block mt-2 mb-1">
                    비밀번호 확인
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
