import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = ({ users }) => {
    const { id } = useParams();
    const user = users.find((user) => user.id.toString() === id);

    if (!user) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="bg-white h-screen">
            <div className="container mx-auto h-screen">
                <h1 className="text-2xl font-semibold text-black mb-4">사용자 상세 정보</h1>
                <div className="text-black">
                    <p>아이디: {user.userid}</p>
                    <p>직책: {user.position}</p>
                    <p>부서: {user.department}</p>
                    <p>학과: {user.major}</p>
                    <p>교번: {user.employeeId}</p>
                    <p>이름: {user.username}</p>
                    <p>이메일: {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
