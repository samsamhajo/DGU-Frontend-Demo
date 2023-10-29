import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SignUpComplete = () => {
    const location = useLocation();
    const { userData } = location.state || {};

    return (
        <div className="bg-white h-screen">
            <header className="bg-blue-500 py-4">

            </header>
            <div className="container mx-auto p-4 flex flex-col items-center">
                {userData && (
                    <div className="text-center mb-4">
                        <p><strong>아이디:</strong> {userData.userid}</p>
                        <p><strong>직책:</strong> {userData.position}</p>
                        <p><strong>부서:</strong> {userData.department}</p>
                        <p><strong>학과:</strong> {userData.major}</p>
                        <p><strong>교번:</strong> {userData.employeeId}</p>
                        <p><strong>이름:</strong> {userData.username}</p>
                        <p><strong>이메일:</strong> {userData.email}</p>
                    </div>
                )}
                {/* 분리 줄 추가 */}
                <hr className="w-1/2 border-b my-4" />
                <p className="text-4xl font-bold">회원가입 신청 완료</p>
                <br />
                <br />
                <p className="text-xl ">회원가입 신청이 완료되었습니다.</p>
                <p className="text-xl ">가입 승인은 신청일로부터 최대 5일 정도 소요됩니다.</p>
                <br />
                <Link to="/" className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200">
    메인페이지로 돌아가기
</Link>

            </div>
        </div>
    );
};

export default SignUpComplete;
