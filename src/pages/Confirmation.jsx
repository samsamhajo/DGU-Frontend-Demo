import React, { useEffect, useState } from 'react';

const Confirmation = () => {
    const [userList, setUserList] = useState([]);
    const [acceptedUsers, setAcceptedUsers] = useState([]); // 추가된 사용자를 저장하는 상태

    useEffect(() => {
        // localStorage에서 사용자 목록 가져오기
        const storedUserList = localStorage.getItem('userList');
        if (storedUserList) {
            const parsedUserList = JSON.parse(storedUserList);
            setUserList(parsedUserList);
        }
    }, []);

    const handleAccept = (index) => {
        // 선택한 사용자를 가져와서 추가
        const userToAdd = userList[index];

        // 이미 추가된 사용자인지 확인
        if (!acceptedUsers.includes(userToAdd)) {
            setAcceptedUsers([...acceptedUsers, userToAdd]);
        }

        // 사용자를 userList에서 제거
        const updatedUserList = [...userList];
        updatedUserList.splice(index, 1);
        setUserList(updatedUserList);
    };

    const handleReject = (index) => {
        // 선택한 사용자를 삭제
        const userToReject = acceptedUsers[index];

        // 이미 추가된 사용자인지 확인
        if (!userList.includes(userToReject)) {
            setUserList([...userList, userToReject]);
        }

        // 사용자를 acceptedUsers에서 제거
        const updatedAcceptedUsers = [...acceptedUsers];
        updatedAcceptedUsers.splice(index, 1);
        setAcceptedUsers(updatedAcceptedUsers);
    };

    return (
        <div className="bg-white h-screen">
            <div className="container mx-auto p-4">
                <>
                    {/* 첫 번째 도표 */}
                    <br />
                    <h2 className="text-3xl font-bold mb-2">회원 관리 페이지</h2>
                    <br />
                    <h2 className="text-xl font-bold mb-2">회원가입 신청 리스트</h2>
                    <table className="border-collapse w-full mb-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">직책</th>
                                <th className="border px-4 py-2">부서</th>
                                <th className="border px-4 py-2">학과</th>
                                <th className="border px-4 py-2">교번</th>
                                <th className="border px-4 py-2">이름</th>
                                <th className="border px-4 py-2">아이디</th>
                                <th className="border px-4 py-2">이메일</th>
                                <th className="border px-4 py-2">가입수락</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((userData, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{userData.position}</td>
                                    <td className="border px-4 py-2">{userData.department}</td>
                                    <td className="border px-4 py-2">{userData.major}</td>
                                    <td className="border px-4 py-2">{userData.employeeId}</td>
                                    <td className="border px-4 py-2">{userData.username}</td>
                                    <td className="border px-4 py-2">{userData.userid}</td>
                                    <td className="border px-4 py-2">{userData.email}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleAccept(index)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            가입수락
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>

                {/* 첫 번째 도표와 두 번째 도표 사이의 선 */}
                <hr className="border my-4" />

                {/* 두 번째 도표 (첫 번째 도표와 구조 동일) */}
                <h2 className="text-xl font-bold mb-2">회원가입 수락 리스트</h2>
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">직책</th>
                            <th className="border px-4 py-2">부서</th>
                            <th className="border px-4 py-2">학과</th>
                            <th className="border px-4 py-2">교번</th>
                            <th className="border px-4 py-2">이름</th>
                            <th className="border px-4 py-2">아이디</th>
                            <th className="border px-4 py-2">이메일</th>
                            <th className="border px-4 py-2">가입 반려</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedUsers.map((userData, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{userData.position}</td>
                                <td className="border px-4 py-2">{userData.department}</td>
                                <td className="border px-4 py-2">{userData.major}</td>
                                <td className="border px-4 py-2">{userData.employeeId}</td>
                                <td className="border px-4 py-2">{userData.username}</td>
                                <td className="border px-4 py-2">{userData.userid}</td>
                                <td className="border px-4 py-2">{userData.email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleReject(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        가입 반려
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Confirmation;
