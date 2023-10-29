import React, { useState } from 'react';

const initialUsers = [
    {
        id: 1,
        userid: 'user1',
        position: 'Position 1',
        department: 'Department 1',
        major: 'Major 1',
        employeeId: '12345',
        username : 'username1',
        email: 'user1@example.com',
    },
    {
        id: 2,
        userid: 'user2',
        position: 'Position 2',
        department: 'Department 2',
        major: 'Major 2',
        employeeId: '54321',
        username : 'username2',
        email: 'user2@example.com',
    },
    // 추가 사용자 정보를 여기에 추가할 수 있습니다.
];

const UserList = () => {
    // 사용자 정보를 관리하는 상태 변수
    const [users, setUsers] = useState(initialUsers);

    return (
        <div className="bg-white h-screen">
            <div className="container mx-auto h-screen">
                <h1 className="text-2xl font-semibold text-black mb-4">회원 목록</h1>
                <table className="border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">아이디</th>
                            <th className="border px-4 py-2">직책</th>
                            <th className="border px-4 py-2">부서</th>
                            <th className="border px-4 py-2">학과</th>
                            <th className="border px-4 py-2">교번</th>
                            <th className="border px-4 py-2">이름</th>
                            <th className="border px-4 py-2">이메일</th>
                            <th className="border px-4 py-2">자세히 보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.userid}</td>
                                <td className="border px-4 py-2">{user.position}</td>
                                <td className="border px-4 py-2">{user.department}</td>
                                <td className="border px-4 py-2">{user.major}</td>
                                <td className="border px-4 py-2">{user.employeeId}</td>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <a href={`/user/${user.id}`}>자세히 보기</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
