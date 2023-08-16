import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SignUpComplete = () => {
    const location = useLocation();
    const userData = location.state.userData;

    return (
        <div className="flex justify-center items-center h-screen bg-white text-black">
            <div className="w-80 p-4 border rounded shadow text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-500">회원가입 신청완료</h1>
                <p>아이디: {userData.username}</p>
                <p>직책: {userData.position}</p>
                <p>부서: {userData.department}</p>
                <p>학과: {userData.major}</p>
                <p>교번: {userData.employeeId}</p>
                <p>이메일: {userData.email}</p>
                <p className="mt-2 mb-4">회원가입 신청이 완료되었습니다.</p>
                <Link
                    to="/"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200 mt-4"
                >
                    돌아가기
                </Link>
            </div>
        </div>
    );
};

export default SignUpComplete;